import { useState, useEffect } from "react";
import {
  CSmartTable,
  CAvatar,
  CSmartPagination,
  CCol,
} from "@coreui/react-pro";
import { CContainer, CNav, CNavItem, CNavLink, CRow } from "@coreui/react";
import VisualNoData from "../../../utils/VisualNoData";
import leaderboard from "../../../assets/illustrations/leaderboard.svg";
import Loader from "./Loader";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCurrentDate,
  getPriorDate,
  startOfWeek,
  endOfWeek,
} from "../../../utils/DateTimeService";
import {
  getCustomLeaderboard,
  getLeaderboard,
  getLeaderboardByDate,
} from "../../../api/services/LeaderboardService";
import LeaderboardFilters from "./LeaderboardFilters";

const options = ["All Time", "Monthly", "Weekly", "Custom"];

export default function LeaderBoard() {
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const history = useHistory();
  const itemsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(374);
  const [leaders, setLeaders] = useState([]);
  const [leaderBoardState, setLeaderBoardState] = useState(0);
  const [params, setParams] = useState({});
  const [userFilters, setUserFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: "name",
      _style: { width: "30%", paddingLeft: "15px" },
      _props: { color: "primary" },
    },
    {
      key: "likes",
      _style: { width: "20%", paddingLeft: "15px" },
      _props: { color: "primary" },
    },
    {
      key: "portfolioScore",
      _style: { width: "20%", paddingLeft: "15px" },
      _props: { color: "primary" },
    },
    {
      key: "totalPaperSubmitted",
      _style: { width: "20%", paddingLeft: "15px" },
      _props: { color: "primary" },
    },
    // {
    //   key: "sharePoints",
    //   _style: { width: "15%", paddingLeft: "15px" },
    //   _props: { color: "primary" },
    // },
    {
      key: "totalScore",
      _style: { width: "25%", paddingLeft: "15px" },
      _props: { color: "primary" },
    },
  ];

  const fetchLeaderBoard = async () => {
    try {
      setLeaders([]);
      setLoading(true);
      if (leaderBoardState === 3) {
        const {
          data: {
            data,
            totalUsers: { count },
          },
        } = await getCustomLeaderboard(setLoading, {
          ...params,
          ...userFilters,
          count: activePage,
        });
        setLeaders(data);
        setTotalUsers(count);
      } else if (leaderBoardState === 0) {
        const {
          data: {
            data,
            totalUsers: { count },
          },
        } = await getLeaderboard(setLoading, {
          ...userFilters,
          count: activePage,
        });

        setLeaders(data);
        setTotalUsers(count);
      } else {
        const {
          data: {
            data,
            totalUsers: { count },
          },
        } = await getLeaderboardByDate(setLoading, {
          ...params,
          ...userFilters,
          count: activePage,
        });

        setLeaders(data);
        setTotalUsers(count);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, [params, activePage, userFilters]);

  const handleLeaderboard = (state) => {
    setLeaderBoardState(state);

    if (state === 0) {
      setParams({});
    } else if (state === 1) {
      setParams({
        fromDate: getPriorDate(30),
        toDate: getCurrentDate(),
      });
    } else if (state === 2) {
      setParams({
        fromDate: startOfWeek,
        toDate: endOfWeek,
      });
    }
  };

  const handleRedirect = (url) => {
    if (!premiumUser)
      return toast.error("You need to pay in order to view other profiles", {
        toastId: url,
      });
    history.push(url);
  };

  return (
    <CContainer fluid>
      <h1 className="text-center m-0">Leader Board</h1>
      <CNav
        className="mx-auto my-4 justify-content-center"
        variant="pills"
        role="tablist"
      >
        {options.map((el, index) => {
          return (
            <CNavItem>
              <CNavLink
                className="fw-bold"
                style={{ cursor: "pointer" }}
                active={leaderBoardState === index}
                onClick={() => handleLeaderboard(index)}
              >
                {el}
              </CNavLink>
            </CNavItem>
          );
        })}
      </CNav>

      {loading && <Loader />}

      <CRow>
        <CCol sm={12} md={3}>
          <LeaderboardFilters
            state={leaderBoardState}
            params={userFilters}
            setParams={setUserFilters}
          />
        </CCol>
        {!loading && (
          <CCol sm={12} md={9}>
            {leaders?.length > 0 && (
              <>
                <CSmartTable
                  items={leaders}
                  // columnFilter
                  columnSorter
                  pagination
                  columns={columns}
                  tableProps={{
                    hover: true,
                    bordered: true,
                  }}
                  scopedColumns={{
                    name: (item) => (
                      <td>
                        <div
                          className="text-black text-decoration-none"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRedirect(`/profile/${item?.id}`)}
                        >
                          <span className="px-2">
                            <CAvatar
                              src={
                                item.image ||
                                `https://ui-avatars.com/api/?name=${item?.name?.replaceAll(
                                  " ",
                                  "+"
                                )}`
                              }
                            />
                          </span>
                          <span>{item?.name}</span>
                        </div>
                      </td>
                    ),
                    portfolioScore: (item) => (
                      <td>{Number(item?.portfolioScore).toFixed(2)}</td>
                    ),
                    totalScore: (item) => (
                      <td>{Number(item?.totalScore).toFixed(2)}</td>
                    ),
                  }}
                />
                <CSmartPagination
                  size="sm"
                  activePage={activePage}
                  limit={10}
                  pages={Math.ceil(totalUsers / itemsPerPage) || 1}
                  onActivePageChange={setActivePage}
                />
              </>
            )}
          </CCol>
        )}
      </CRow>
      {leaders?.length === 0 && (
        <VisualNoData message="No one published paper" imgSrc={leaderboard} />
      )}

      {!leaders && (
        <VisualNoData message="No data to show" imgSrc={leaderboard} />
      )}
    </CContainer>
  );
}
