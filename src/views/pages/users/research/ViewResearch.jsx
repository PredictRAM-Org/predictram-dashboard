import { useEffect, useState } from "react";
import {
  CContainer,
  CFormSwitch,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useHistory, useParams } from "react-router-dom";
import GridResearchCard from "./GridResearchCard";
import { toast } from "react-toastify";
import Loader from "../Loader";
import VisualNoData from "../../../../utils/VisualNoData";
import { useSelector } from "react-redux";
import {
  getFeaturedResearchPaper,
  getPersonalizeResearchPaper,
  getResearchPapers,
  getUserResearchPaper,
} from "../../../../api/services/ResearchPaperService";
import { CSmartPagination } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilHighlighter } from "@coreui/icons-pro";
import { cilClock, cilStar } from "@coreui/icons";
import { useQuery } from "@tanstack/react-query";

const TOAST_ID = "PUBLISH_PAPER";

export default function ViewResearch() {
  const history = useHistory();
  const userPremiumUser = useSelector((state) => state.user.premiumUser);
  const id = useSelector((state) => state.user.id);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);
  const tabs = ["personalized", "featured", "recent"];
  const { tab } = useParams();
  if (!tabs.includes(tab)) {
    if (!!investorId) {
      history.push("/papers/featured");
    } else {
      history.push("/papers/personalized");
    }
  }

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUserOnly, setIsUserOnly] = useState(false);

  const { data: { papers, total } = {}, isLoading } = useQuery({
    queryKey: ["research_paper", isUserOnly, tab, count],
    queryFn: async () => {
      const data = getreasearch();
      return data;
    },
    staleTime: 60000 * 2,
  });

  const navItems = [
    {
      active: "personalized",
      icon: cilHighlighter,
      name: "Personalized",
    },
    {
      active: "featured",
      icon: cilStar,
      name: "Featured",
    },
    {
      active: "recent",
      icon: cilClock,
      name: "Recent",
    },
  ];

  const handelApicall = async (api, setLoading, params) => {
    const data = await api(
      setLoading,
      params,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
    if (!data?.data) {
      return { papers: data, total: 1 };
    }
    return { papers: data?.data, total: Math.ceil(data?.totalPaper / 20) };
  };

  async function getreasearch() {
    if (isUserOnly) {
      return await handelApicall(getUserResearchPaper, setLoading, {
        id,
        count,
        isVerified: true,
      });
    } else if (tab === "featured") {
      return await handelApicall(getFeaturedResearchPaper, setLoading, {
        count,
      });
    } else if (tab === "recent") {
      return await handelApicall(getResearchPapers, setLoading, {
        count,
        isVerified: true,
      });
    } else if (tab === "personalized") {
      return await handelApicall(getPersonalizeResearchPaper, setLoading, {
        count,
        isVerified: true,
      });
    }
  }

  const handleRedirect = () => {
    if (!userPremiumUser)
      return toast.error(
        "You need to pay in order to post your research paper",
        { toastId: TOAST_ID }
      );

    history.push("/postresearch");
  };

  return (
    <CContainer fluid>
      <div
        className="position-relative mx-auto mb-2 px-2 d-flex align-items-center justify-content-center flex-column flex-md-row"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">Research Papers</h1>

        {!investorId && (
          <div
            size="sm"
            className="position-absolute secondaryButton"
            style={{
              left: "100%",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleRedirect}
          >
            Publish
          </div>
        )}
      </div>
      {!investorId && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "fit-content",
            margin: "0 auto",
            gap: "0.5rem",
            marginBottom: "1.125rem",
          }}
        >
          All
          <CFormSwitch
            shape="pill"
            size="lg"
            style={{
              width: "2rem",
              cursor: "pointer",
            }}
            checked={isUserOnly}
            onChange={(e) => setIsUserOnly(e.target.checked)}
          />
          Yours
        </div>
      )}
      {!isUserOnly && (
        <CNav variant="underline">
          {navItems.map((el) => {
            if (el.name === "Personalized" && investorId) {
              return;
            }
            return (
              <CNavItem>
                <CNavLink
                  active={tab === el.active}
                  onClick={() => {
                    history.push(`/papers/${el.active}`);
                    setCount(1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ paddingRight: "0.24em" }}>
                    <CIcon icon={el.icon} size="lg" />
                  </span>
                  <span>{el.name}</span>
                </CNavLink>
              </CNavItem>
            );
          })}
        </CNav>
      )}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="d-flex text-center flex-column mb-5">
          {papers?.length === 0 && <VisualNoData />}
          {papers?.map((item, idx) => {
            return (
              <GridResearchCard
                key={idx}
                data={item}
                lastCard={idx + 1 === papers?.length}
              />
            );
          })}
          {!isUserOnly && (
            <CSmartPagination
              align="center"
              activePage={count}
              pages={total}
              onActivePageChange={setCount}
            />
          )}
        </div>
      )}
    </CContainer>
  );
}
