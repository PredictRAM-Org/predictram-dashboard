import { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CCardImage,
  CCardSubtitle,
  CButton,
  CAvatar,
  CCardText,
  CHeaderDivider,
  CRow,
  CCol,
  CHeaderBrand,
} from "@coreui/react";
import {
  LinkedinShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { cilCode, cilTag } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import parse from "html-react-parser";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { post } from "axios";
import Loader from "../Loader";
import {
  getLocalDate,
  getLocalDateTime,
  getLocalTime,
} from "../../../../utils/DateTimeService";
import {
  getRecommendedResearchPaper,
  getResearchPaperById,
  publishResearchPaperAdmin,
} from "../../../../api/services/ResearchPaperService";
import HorizontalScroll from "../../../../components/HorizontalScroll";
import ResearchCard from "../../../../components/Profile/ResearchCard";
import NoData from "../../../../utils/NoData";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function ResearchPage() {
  const history = useHistory();
  const admin = useSelector((state) => state.user.admin);
  const userid = useSelector((state) => state.user.id);
  const accessToRate = useSelector((state) => state.user.accessToRate);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [morepostload, setMorePostload] = useState(false);

  async function deletePost() {
    try {
      await post("/api/users/deletepost", { id }, { withCredentials: true });
      toast.success("Paper deleted successfully.");
      history.push("/papers");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Failed");
      }
    }
  }

  const { data: { paper, publishDate, authorPapers } = {}, isLoading } =
    useQuery({
      queryKey: ["research_paper", id],
      queryFn: async () => {
        const paper = await getResearchPaperById(setLoading, { id });
        window.scrollTo(0, 0);
        if (!paper) return {};
        const _publishDate = new Date(paper.createdAt);
        const publishDate = getLocalDateTime(_publishDate, true);
        const authorPapers = await getRecommendedResearchPaper(
          setMorePostload,
          {
            userId: paper?.userId._id,
            postId: paper?._id,
            tags: paper?.tags,
          }
        );
        return { paper, publishDate, authorPapers };
      },
      enabled: !!id,
      staleTime: 60000 * 2,
    });

  const handleRatePaper = () => {
    history.push(`/viewresearch/${id}/feedback`);
  };

  return (
    <>
      <CCard
        style={{
          boxShadow: "none",
        }}
      >
        {!!paper?.image && (
          <CCardImage
            orientation="top"
            src={
              paper?.image ||
              "https://picsum.photos/1000?random=" + Math.random()
            }
            style={{
              maxWidth: "68.75rem",
              maxHeight: "40rem",
              objectFit: "contain",
              borderRadius: "0.75rem",
              margin: "0 auto",
            }}
          />
        )}
        <CCardHeader
          className="d-flex flex-column align-items-center p-0"
          style={{
            background: "none",
            gap: "0.5rem",
            maxWidth: "44rem",
            margin: "0 auto",
            marginTop: "3.5rem",
            border: "none",
          }}
        >
          <CCardTitle
            className="p-0 m-0"
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: "#252525",
              textAlign: "center",
            }}
          >
            {paper?.title}
          </CCardTitle>

          <CCardText
            className="m-0"
            style={{
              fontWeight: 500,
              color: "#AFAFB6",
              textAlign: "center",
              fontSize: "1.75rem",
            }}
          >
            {paper?.subtitle}
          </CCardText>

          <div
            className="d-flex flex-row align-items-center"
            style={{
              gap: "0.5rem",
            }}
          >
            <CAvatar
              src={"https://picsum.photos/200?random=" + Math.random()}
              style={{
                width: "2rem",
                height: "2rem",
              }}
            />
            <CCardSubtitle
              className="text-medium-emphasis"
              style={{
                color: "#252525",
                fontWeight: 500,
                fontSize: "1.125rem",
              }}
            >
              {paper?.userId && (
                <Link
                  className="text-black text-decoration-none"
                  to={`/profile/${paper?.userId?._id}`}
                >
                  {paper?.userId?.name}
                </Link>
              )}
            </CCardSubtitle>
            <span
              style={{
                color: "#252525",
                fontWeight: 500,
                fontSize: "1.125rem",
              }}
            >
              ·
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: "1.125rem",
                color: "#B1B1B1",
              }}
            >
              {publishDate}
            </span>
          </div>
        </CCardHeader>

        <CCardBody
          className="paper_content"
          style={{
            maxWidth: "70vw",
            margin: "0 auto",
            padding: "0 2em",
          }}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {paper?.data ? parse(paper?.data) : null}
              {paper?.report && (
                <Alert
                  color="info"
                  icon={<InsertDriveFileIcon />}
                  action={
                    <Button
                      style={{ textTransform: "none" }}
                      color="primary"
                      variant="outlined"
                      size="small"
                      startIcon={<ArrowOutwardIcon />}
                      onClick={() => window?.open(paper?.report)}
                    >
                      Click here
                    </Button>
                  }
                >
                  Open Research Report
                </Alert>
              )}
              <CHeaderDivider />
              <CRow className="mt-4">
                <CHeaderBrand>Share This Paper</CHeaderBrand>
              </CRow>
              <div className="d-flex gap-3 flex-wrap justify-content-start align-items-start mt-2">
                <LinkedinShareButton
                  title={paper?.title}
                  summary={paper?.subtitle}
                  url={window.location.href}
                >
                  <LinkedinIcon size={50} />
                </LinkedinShareButton>
                <TwitterShareButton
                  title={paper?.title}
                  hashtags={["predictram", "researchpaper"]}
                  url={window.location.href}
                >
                  <TwitterIcon size={50} />
                </TwitterShareButton>
              </div>
              <CRow className="mt-4">
                <CHeaderBrand>Tags:</CHeaderBrand>
              </CRow>
              <div className="d-flex gap-3 flex-wrap justify-content-start align-items-start mt-2">
                {paper?.tags?.map((tag) => {
                  return (
                    <div>
                      <Link
                        to={`/tag/${tag}`}
                        className="text-black text-decoration-none"
                        style={{
                          border: "1px solid",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "15px",
                          cursor: "pointer",
                          // fontSize: "2vw",
                        }}
                      >
                        <CIcon icon={cilTag}></CIcon> {tag}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <CRow className="mt-4">
                <CHeaderBrand>Events: </CHeaderBrand>
              </CRow>
              <div className="d-flex align-items-start">
                <Link
                  to={`/eventdetails/${paper?.event?._id}`}
                  className="text-black text-decoration-none"
                  style={{
                    border: "1px solid",
                    margin: "5px",
                    padding: "5px",
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                >
                  <CIcon icon={cilCode}></CIcon> {paper?.event?.name}
                </Link>
              </div>
              <CHeaderDivider />
              {!isLoading && authorPapers?.length !== 0 && (
                <div>
                  <h4>More Papers from {paper?.userId?.name}</h4>
                  <HorizontalScroll
                    Child={
                      <ResearchCard data={authorPapers} name={"research"} />
                    }
                    name={"research"}
                    noScroll
                  />
                </div>
              )}
              {isLoading && <Loader />}
              <CHeaderDivider />
              <div
                className="d-flex justify-content-between py-2 align-items-center"
                style={{
                  background: "rgba(217, 217, 217, 0.21)",
                  borderRadius: "10px",
                  paddingLeft: "1.3rem",
                  paddingRight: "0.5rem",
                }}
              >
                {accessToRate && (
                  <>
                    <div>Feedback</div>
                    <div>
                      <CButton onClick={handleRatePaper}>
                        Rate the paper
                      </CButton>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </CCardBody>
        <CRow className="text-center">
          <CCol md={12}>
            {(!!admin || userid === paper?.userId?._id) && (
              <CButton
                color="danger"
                className="fs-5 mt-4 mx-auto text-white w-100 mb-5"
                onClick={deletePost}
                style={{
                  maxWidth: "44rem",
                  boxShadow: "none",
                }}
              >
                Delete Paper
              </CButton>
            )}
          </CCol>
        </CRow>
      </CCard>
    </>
  );
}
