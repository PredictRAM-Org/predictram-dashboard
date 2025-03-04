import {
  CButton,
  CCardBody,
  CContainer,
  CLink,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import Swal from "sweetalert2";
import { CCard } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserSubmittedEvents } from "../../../../api/services/EventService";
import { getProfile } from "../../../../api/services/ProfileService";
import { getUserResearchPaper } from "../../../../api/services/ResearchPaperService";
import backgroudpic from "../../../../assets/images/icon.png";
import profilepic from "../../../../assets/images/profilepic.png";
import HorizontalScroll from "../../../../components/HorizontalScroll";
import ContactCard from "../../../../components/Profile/ContactCard";
import EventCard from "../../../../components/Profile/EventCard";
import ResearchCard from "../../../../components/Profile/ResearchCard";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { fyersQuotes } from "../../../../api/services/FyersService";

function Otherprofile() {
  const customStyles = {
    backgroundPic: {
      objectFit: "contain",
      borderBottom: "1px solid",
    },
    profileImg: {
      objectFit: "cover",
      border: "1px solid",
      borderRadius: "50%",
      backgroundColor: "#808080",
      position: "absolute",
      zIndex: 9,
      top: 100,
      left: 20,
    },
  };

  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoad, setPostLoad] = useState(false);
  const [contactmodal, setContactModal] = useState(false);

  const history = useHistory();
  const uid = useParams().id;
  const id = useSelector((state) => state.user.id);

  const fetchProfile = async () => {
    const data = await getProfile(setLoading, { id: uid });
    if (!data?.iscomplete) {
      setUser(data?.user);
    } else {
      setProfile(data?.profile);
      setExperience(data?.profile?.experience);
    }
  };

  const fetchPapers = async () => {
    const data = await getUserResearchPaper(setLoading, {
      isVerified: true,
      id: uid,
    });
    setPapers(data);
  };

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const calculatePortfolio = async (events, fyersData) => {
    for (const v of events) {
      let currentValue = 0;
      const userSub = v.subscriber.find((s) => s._id === uid);
      if (userSub) {
        userSub.topgainers.forEach((stock) => {
          const fyersStock = fyersData.find((data) =>
            data.n.includes(stock.symbol)
          );
          if (fyersStock) {
            const value = fyersStock.v.lp;
            currentValue += value;
          }
        });
        const difference = Number(
          userSub.portfolio - Number(currentValue.toFixed(2))
        );
        const percentage = (Math.abs(difference) / userSub.portfolio) * 100;
        v.portfolio_percent = percentage.toFixed(2);
        v.difference = difference;
        v.createdValue = userSub.portfolio.toFixed(2);
        v.currentValue = currentValue.toFixed(2);
      }
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getUserSubmittedEvents(setLoading, { id: uid });
      const allSymbols = Array.from(
        new Set(
          data.events.flatMap(
            (v) =>
              v.subscriber
                .find((s) => s._id === uid)
                ?.topgainers.map((stock) => stock.symbol) || []
          )
        )
      );
      if (allSymbols.length > 0) {
        const fyersData = await getFyersData(allSymbols.join(","));
        await calculatePortfolio(data.events, fyersData);
      }
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events or calculating portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id === uid) {
      history.replace("/profile");
    }
    fetchProfile();
    fetchPapers();
    fetchEvents();
  }, [postLoad]);
  return (
    <CContainer>
      <CCard>
        <div style={{ position: "relative" }}>
          <img
            width="100%"
            height="200"
            alt="..."
            src={backgroudpic}
            style={customStyles.backgroundPic}
          />
          <img
            width="160"
            height="160"
            alt="..."
            src={
              profile?._id?.image ||
              `https://ui-avatars.com/api/?name=${profile?._id?.name.replaceAll(
                " ",
                "+"
              )}`
            }
            style={customStyles.profileImg}
          />
          {loading && <Loader />}
          {!loading && user && (
            <CCardBody style={{ marginTop: 60, marginLeft: 15 }}>
              <h1>{user?.name}</h1>
              <p>
                Role is {user?.admin ? "Admin" : "User"} . <br /> Email is{" "}
                {user?.email} .
              </p>
            </CCardBody>
          )}
          {!loading && profile && (
            <CCardBody style={{ marginTop: 60, marginLeft: 15 }}>
              <div className="d-flex align-items-center justify-content-between">
                <h1>{profile?._id?.name}</h1>
              </div>

              <h5 style={{ color: "#5C5252" }}>{profile?.about}</h5>

              <CLink
                className="text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={() => setContactModal(true)}
              >
                Contact Info.
              </CLink>
            </CCardBody>
          )}
        </div>
      </CCard>
      {loading && <Loader />}
      {papers.length !== 0 && (
        <CCard className="my-3">
          <CCardBody>
            <h4>
              Most Rated <br />
              Papers
            </h4>
            {loading && <Loader />}
            {!loading && papers.length !== 0 && (
              <HorizontalScroll
                Child={<ResearchCard data={papers} name={"research"} />}
                name={"research"}
              />
            )}
          </CCardBody>
        </CCard>
      )}
      {events.length !== 0 && (
        <CCard className="mb-3">
          <CCardBody>
            <h4>Events Submitted</h4>
            {loading && <Loader />}
            {!loading && events.length !== 0 && (
              <HorizontalScroll
                Child={<EventCard data={events} name={"event"} />}
                name={"event"}
              />
            )}
          </CCardBody>
        </CCard>
      )}
      {experience.length !== 0 && (
        <CCard className="mb-3">
          <CCardBody>
            <h4>Your Experience</h4>
            {!loading && experience.length !== 0 && (
              <CListGroup className="mt-3">
                {experience.map((exp) => {
                  return (
                    <CListGroupItem>
                      <div className="d-flex align-items-center justify-content-between">
                        <h2>{exp?.position}</h2>
                      </div>
                      <h5 style={{ margin: 0 }}>{exp?.title}</h5>
                      <p>{exp?.description}</p>
                      <p>
                        {new Date(exp?.startdate).toLocaleDateString()} -{" "}
                        {!exp?.present
                          ? new Date(exp?.enddate).toLocaleDateString()
                          : "Present"}
                      </p>
                    </CListGroupItem>
                  );
                })}
              </CListGroup>
            )}
            {loading && <Loader />}
          </CCardBody>
        </CCard>
      )}
      <ContactCard
        setShowadd={setContactModal}
        showadd={contactmodal}
        email={profile?._id?.email}
      />
    </CContainer>
  );
}

export default Otherprofile;
