import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CContainer,
  CCardHeader,
  CNav,
  CNavLink,
  CNavItem,
  CCardText,
} from "@coreui/react";
import { getuser } from "../../../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";
import { get } from "axios";
import Scrapper from "./Scrapper";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Portfolio from "./Portfolio";
import NoData from "../../../utils/NoData";
import {
  firstMonthDay,
  getLocalNumericDate,
} from "../../../utils/DateTimeService";
import { cancelFreePremiumMembership } from "../../../api/services/PaymentService";
import {
  getResearchPapers,
  getUserResearchPaper,
} from "../../../api/services/ResearchPaperService";
import Widget from "../../../utils/Widget";
import RiskView from "./RiskView";
import { apiGetByParams } from "../../../api/BaseAPICaller";
import SectorRatio from "./SectorRatio";
import { Alert, AlertTitle, Button } from "@mui/material";
import JoinBetaCard from "../../../components/BetaSystem/JoinBetaCard";

const Dashboard = () => {
  const history = useHistory();
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [participationPercentage, setParticipationPercentage] = useState();
  const [researchPaperCount, setResearchPaperCount] = useState(0);
  const [submittedPapersCount, setSubmittedPapersCount] = useState(0);
  const [nonRatedPaperCount, setNonRatedPaperCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [eventSubmittedCount, setEventSubmittedCount] = useState(0);
  const [eventactiveKey, setEventActiveKey] = useState(1);
  const [researchactiveKey, setResearchActiveKey] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentBatchEventsCount, setCurrentBatchEventsCount] = useState(0);
  const {
    id: userId,
    admin,
    triedFreePremium: isTriedPremium,
    expiry: expiryDate,
    premiumUser,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getEvents = async () => {
    try {
      setLoading(true);
      const { data } = await get(
        `/api/users/${
          eventactiveKey === 2 ? "viewsubmittedevents" : "getevents"
        }`,
        {
          params: {
            isPublic: true,
          },
        }
      );

      setEvents(data.events);
      if (eventactiveKey === 1) {
        setEventCount(data.totalEvent);
      }
    } catch (error) {
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };

  const getResearchpapers = async () => {
    const data =
      researchactiveKey === 2
        ? await getUserResearchPaper(setLoading, { id: userId })
        : await getResearchPapers(setLoading, { isVerified: true });
    setPapers(data.data ?? []);
  };

  const getSubmittedEvents = async () => {
    try {
      setLoading(true);
      const { data } = await get(`/api/users/viewsubmittedevents`);
      setEventSubmittedCount(data.events.length);
    } catch (error) {
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };

  const researchPaperGet = async () => {
    const data = await getResearchPapers(setLoading, { isVerified: true });
    setPapers(data.data);
    setResearchPaperCount(data.totalPaper);
    setNonRatedPaperCount(data.totalNonRatedPaper);
  };

  const userSubmittedPaper = async () => {
    const data = await getUserResearchPaper(setLoading, {
      id: userId,
    });
    setSubmittedPapersCount(data.length);
  };

  const getCurrentBatchEvents = async () => {
    const data = await apiGetByParams(setLoading, "/api/users/getevents", {
      startdate: "2024-11-01T18:30:00.000Z" || new Date(firstMonthDay),
    });
    setCurrentBatchEventsCount(data.events.length);
  };

  useEffect(() => {
    if (!!currentBatchEventsCount && !!submittedPapersCount) {
      setParticipationPercentage(
        ((submittedPapersCount / currentBatchEventsCount) * 100).toFixed(0)
      );
    }
  }, [currentBatchEventsCount, submittedPapersCount]);

  useEffect(() => {
    getEvents();
    getResearchpapers();
  }, [eventactiveKey, researchactiveKey]);

  useEffect(() => {
    getSubmittedEvents();
    getCurrentBatchEvents();
    userSubmittedPaper();
    researchPaperGet();
  }, []);

  useEffect(() => {
    const _expiryDate = new Date(expiryDate).valueOf();
    const _currentDate = new Date().valueOf();
    if (_currentDate >= _expiryDate && !isTriedPremium) {
      cancelPremiumMembership();
    }
  }, []);

  useEffect(() => {
    dispatch(getuser());
  }, []);

  const cancelPremiumMembership = async () => {
    await cancelFreePremiumMembership(setLoading, { userId });
    history.go(0);
  };

  const redirectResearch = () => {
    history.push("/papers");
  };

  const redirectEvent = () => {
    history.push("/viewevents");
  };

  const styledCardProps = {
    className: "pb-0 shadow-none border border-light",
    style: { borderRadius: "0.625rem", padding: "1.25rem" },
  };

  const handleRedirect = (url) => {
    if (!premiumUser)
      return toast.error("You need to pay in order to view the details", {
        toastId: url,
      });
    history.push(url);
  };

  return (
    <>
      <CContainer fluid>
        <CRow>
          <h1 className="text-center m-0 mb-3 pb-3">Dashboard</h1>
        </CRow>
        <CRow className="mb-4">
          <JoinBetaCard />
          <Widget
            title="Total Research Paper"
            value={researchPaperCount}
            show={admin}
            path="/papers"
            md={3}
            loading={loading}
          />

          <Widget
            title="Total Research Paper Submitted"
            value={submittedPapersCount}
            show={!admin}
            md={3}
            loading={loading}
          />

          <Widget
            title="Total Hours spend in dashboard"
            value={`${submittedPapersCount * 1.5} hr`}
            show={!admin}
            md={3}
            loading={loading}
          />

          {/* TODO: change this to current on going events */}
          <Widget
            title="Total Events Published Recently"
            value={currentBatchEventsCount}
            path="/viewevents"
            show={admin}
            md={3}
            loading={loading}
          />

          <Widget
            title="Total Non Rated Paper"
            value={nonRatedPaperCount}
            show={admin}
            md={3}
            loading={loading}
          />

          <Widget
            title="Total Events Submitted"
            value={eventSubmittedCount}
            show={!admin}
            md={3}
            loading={loading}
          />

          <Widget
            title="Participation Percentage"
            value={`${participationPercentage ?? 0}%`}
            show={!admin}
            md={3}
            loading={loading}
          />
        </CRow>
        <CRow>
          <CCol
            md={6}
            className="d-flex flex-column"
            style={{
              gap: "1.25rem",
              padding: "0",
              paddingRight: "1.25rem",
            }}
          >
            <CCard {...styledCardProps}>
              <CCardHeader className="d-flex bg-white justify-content-between align-items-center border-0 p-0 mb-2">
                <h2 className="d-inline m-0">Research Papers</h2>
                <span onClick={redirectResearch}>
                  <Link
                    color="primary"
                    size="sm"
                    className="text-decoration-none"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "blue",
                    }}
                  >
                    {"Explore all ->"}
                  </Link>
                </span>
              </CCardHeader>
              <CNav variant="pills" role="tablist">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={researchactiveKey === 1}
                    onClick={() => setResearchActiveKey(1)}
                  >
                    All
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={researchactiveKey === 2}
                    onClick={() => setResearchActiveKey(2)}
                  >
                    Submitted
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CCardBody className="p-0 pt-2">
                {loading && <Loader />}
                {!papers?.length && !loading && (
                  <div className="my-4">
                    <NoData />
                  </div>
                )}
                {!!papers.length && !loading && (
                  <table
                    className="table customTable"
                    style={{ fontSize: "14px" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-truncate">Name</th>
                        <th className="text-truncate">Date</th>
                        <th className="text-truncate">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {papers.slice(0, 6).map((paper, idx) => (
                        <tr key={idx}>
                          <td className="text-truncate">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleRedirect(`viewresearch/${paper._id}`)
                              }
                            >
                              {paper.title}
                            </div>
                          </td>
                          {/* Should be replaced by actual date */}
                          <td className="text-truncate">
                            {getLocalNumericDate(paper.createdAt)}
                          </td>
                          <td className="text-truncate">
                            {paper.userId?.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6} className="p-0">
            <CCard
              className={
                styledCardProps.className + " d-flex flex-wrap flex-column"
              }
              style={{ ...styledCardProps.style, gap: "0.75rem" }}
            >
              <CCardHeader className="d-flex bg-white justify-content-between align-items-center border-0 p-0">
                <h2 className="d-inline m-0">Events</h2>
                <span onClick={redirectEvent}>
                  <Link
                    color="primary"
                    size="sm"
                    className="text-decoration-none"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "blue",
                    }}
                  >
                    {"Explore all ->"}
                  </Link>
                </span>
              </CCardHeader>
              <CNav variant="pills" role="tablist">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={eventactiveKey === 1}
                    onClick={() => setEventActiveKey(1)}
                  >
                    All
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={eventactiveKey === 2}
                    onClick={() => setEventActiveKey(2)}
                  >
                    Participated
                  </CNavLink>
                </CNavItem>
              </CNav>

              <CCardBody className="p-0">
                {loading && <Loader />}
                {!events?.length && !loading && (
                  <div className="my-4">
                    <NoData />
                  </div>
                )}
                {!!events?.length && !loading && (
                  <>
                    <table
                      className="table customTable"
                      style={{ fontSize: "14px" }}
                    >
                      <thead>
                        <tr>
                          <th className="text-truncate">Name</th>
                          <th className="text-truncate">Last value</th>
                          <th className="text-truncate">Previous value</th>
                          <th className="text-truncate">Ends in</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.slice(0, 6).map((event, idx) => (
                          <tr key={idx}>
                            <td className="text-truncate">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleRedirect(`eventdetails/${event._id}`)
                                }
                              >
                                {event?.name}
                              </div>
                            </td>
                            <td className="text-truncate">{event.lastvalue}</td>
                            <td className="text-truncate">
                              {event.previousvalue}
                            </td>
                            <td
                              className={
                                "text-truncate" +
                                (new Date(event.enddate).getTime() < Date.now()
                                  ? " text-danger"
                                  : "")
                              }
                            >
                              {new Date(event.enddate).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <Portfolio />
        </CRow>
        <CRow className="mt-4">
          {/* <RiskView /> */} <SectorRatio />
        </CRow>
        <CRow className="mt-4">
          <Scrapper />
        </CRow>
      </CContainer>
    </>
  );
};

export default Dashboard;
