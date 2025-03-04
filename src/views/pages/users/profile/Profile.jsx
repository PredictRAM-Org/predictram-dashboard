import { cidPlusCircle, cidTrash, cilPencil } from "@coreui/icons-pro";
import CIcon from "@coreui/icons-react";
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
import { useHistory } from "react-router-dom";
import { getUserSubmittedEvents } from "../../../../api/services/EventService";
import {
  deleteExperience,
  getProfile,
} from "../../../../api/services/ProfileService";
import { getUserResearchPaper } from "../../../../api/services/ResearchPaperService";
import backgroudpic from "../../../../assets/images/icon.png";
import HorizontalScroll from "../../../../components/HorizontalScroll";
import AddExperienceModal from "../../../../components/Profile/AddExperienceModal";
import ContactCard from "../../../../components/Profile/ContactCard";
import EventCard from "../../../../components/Profile/EventCard";
import ProfileUpdateModal from "../../../../components/Profile/ProfileUpdateModal";
import ResearchCard from "../../../../components/Profile/ResearchCard";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import UpdateProfileImage from "../../../../components/Profile/UpdateProfileImage";
import { updateUser } from "../../../../api/services/UserService";
import { fyersQuotes } from "../../../../api/services/FyersService";

function Profile() {
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
      cursor: "pointer",
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
  const [profilemodal, setProfileModal] = useState(false);
  const [experiencemodal, setExperienceModal] = useState(false);
  const [isExperienceUpdate, setIsExperienceUpdate] = useState(false);
  const [expupdatedata, setExperienceData] = useState({});
  const [updateProfileImg, setUpdateProfileImg] = useState(false);
  const [userResearchPaperLoad, setUserResearchPaperLoad] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const history = useHistory();
  const userId = useSelector((state) => state.user.id);
  const userImage = useSelector((state) => state.user.image);

  const fetchProfile = async () => {
    const data = await getProfile(setLoading);
    if (!data?.iscomplete) {
      setUser(data?.user);
    } else {
      setProfile(data?.profile);
      setExperience(data?.profile?.experience);
    }
  };

  const fetchPapers = async () => {
    setUserResearchPaperLoad(true);
    const data = await getUserResearchPaper(setLoading, { id: userId });
    setPapers(data);
    if (!!data) {
      setUserResearchPaperLoad(false);
    }
  };

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  // const calculatePortfolio = async (events, price) => {
  //   events.forEach(async (v) => {
  //     let currentValue = 0;
  //     const userSub = v.subscriber.find((s) => s._id === userId);
  //     userSub.topgainers.forEach((stock) => {
  //        let currentprice = price.find((c) => c.symbol === stock.symbol);
  //        let x = currentprice ? currentprice.value : 20;
  //        currentValue += x;
  //     });
  //     const difference = Number(
  //       userSub.portfolio - Number(currentValue.toFixed(2))
  //     );
  //     const percentage = (Math.abs(difference) / userSub.portfolio) * 100;
  //     v.portfolio_percent = percentage.toFixed(2);
  //     v.difference = difference;
  //     v.createdValue = userSub.portfolio.toFixed(2);
  //     v.currentValue = currentValue.toFixed(2);
  //   });
  // };

  // const fetchEvents = async () => {
  //   const data = await getUserSubmittedEvents(setLoading);
  //   const price = await getStockPrice(setLoading);
  //   await calculatePortfolio(data.events, price);
  //   setEvents(data.events);
  // };

  const calculatePortfolio = async (events, fyersData) => {
    for (const v of events) {
      let currentValue = 0;
      const userSub = v.subscriber.find((s) => s._id === userId);
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
      const data = await getUserSubmittedEvents(setLoading);
      const allSymbols = Array.from(
        new Set(
          data.events.flatMap(
            (v) =>
              v.subscriber
                .find((s) => s._id === userId)
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

  const handelExperienceDelete = async (exp) => {
    Swal.fire({
      title: `Do you want to delete ${exp.title} experience`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteExperience(setPostLoad, { id: exp.id });
      }
    });
  };

  const handelExperienceUpdate = async (exp) => {
    setIsExperienceUpdate(true);
    let params = {};
    !exp?.present
      ? (params = {
          ...exp,
          startdate: new Date(exp?.startdate).toISOString().slice(0, 10),
          enddate: new Date(exp?.enddate).toISOString().slice(0, 10),
        })
      : (params = {
          ...exp,
          startdate: new Date(exp?.startdate).toISOString().slice(0, 10),
        });
    setExperienceData(params);
    setExperienceModal(true);
  };
  const updateProfile = async () => {
    await updateUser(setPostLoad, { image: imgSrc });
    history.go(0);
    setUpdateProfileImg(false);
  };

  useEffect(() => {
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
            onClick={() => setUpdateProfileImg(true)}
            src={
              userImage ||
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
                <CIcon
                  icon={cilPencil}
                  size="xl"
                  onClick={() => setProfileModal(true)}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <h5 style={{ color: "#5C5252" }}>{profile?.about}</h5>
              <p>
                Your Role is {profile?._id?.admin ? "Admin" : "User"} . <br />{" "}
                Age is {profile?.age} , Gender is {profile?.gender} .
              </p>
              <CLink
                className="text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={() => setContactModal(true)}
              >
                Contact Information
              </CLink>
            </CCardBody>
          )}
        </div>
      </CCard>
      <CCard className="mt-3">
        <CCardBody>
          {papers.length !== 0 && <h4>Your submitted papers</h4>}
          {userResearchPaperLoad && papers.length === 0 && <Loader />}
          {!userResearchPaperLoad && papers.length > 0 && (
            <HorizontalScroll
              Child={<ResearchCard data={papers} name={"research"} />}
              name={"research"}
            />
          )}
          {!userResearchPaperLoad && papers.length === 0 && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4>You don't have any Research Paper</h4>
              <CButton onClick={() => history.push("/postresearch")}>
                Publish Now
              </CButton>
            </div>
          )}
        </CCardBody>
      </CCard>
      <CCard className="mt-3">
        <CCardBody>
          {events.length !== 0 && <h4>Your submitted events</h4>}
          {loading && <Loader />}
          {!loading && events.length !== 0 ? (
            <HorizontalScroll
              Child={<EventCard data={events} name={"event"} />}
              name={"event"}
            />
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4>You don't have any Submitted Events</h4>
              <CButton onClick={() => history.push("/viewevents")}>
                Submit Now
              </CButton>
            </div>
          )}
        </CCardBody>
      </CCard>
      <CCard className="my-3">
        <CCardBody>
          {experience.length !== 0 && (
            <div className="d-flex align-items-center justify-content-between">
              <h4>Your Experience</h4>
              <CIcon
                icon={cidPlusCircle}
                size="xl"
                onClick={() => {
                  setIsExperienceUpdate(false);
                  setExperienceData({});
                  setExperienceModal(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
          {!loading && experience.length !== 0 ? (
            <CListGroup className="mt-3">
              {experience.map((exp) => {
                return (
                  <CListGroupItem>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2>{exp?.position}</h2>
                      <div className="d-flex gap-3">
                        <CIcon
                          icon={cilPencil}
                          size="lg"
                          onClick={() => {
                            handelExperienceUpdate(exp);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <CIcon
                          icon={cidTrash}
                          size="lg"
                          onClick={() =>
                            handelExperienceDelete({
                              id: exp?._id,
                              title: exp?.title,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
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
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4>You Didn't Add any experience</h4>
              <CButton onClick={() => setExperienceModal(true)}>
                Add Experience
              </CButton>
            </div>
          )}
          {loading && <Loader />}
        </CCardBody>
      </CCard>
      <ContactCard
        setShowadd={setContactModal}
        showadd={contactmodal}
        email={profile?._id?.email}
      />
      {profilemodal && (
        <ProfileUpdateModal
          visible={profilemodal}
          setVisible={setProfileModal}
          setLoading={setPostLoad}
          data={{
            about: profile?.about,
            age: profile?.age,

            sebiregistration: profile?.sebiregistration,
            wallet: profile?.wallet,
            gender: { value: profile?.gender, label: profile?.gender },
          }}
        />
      )}
      {experiencemodal && (
        <AddExperienceModal
          visible={experiencemodal}
          setVisible={setExperienceModal}
          setLoading={setPostLoad}
          data={expupdatedata}
          isUpdate={isExperienceUpdate}
        />
      )}
      {updateProfileImg && (
        <UpdateProfileImage
          setShow={setUpdateProfileImg}
          show={updateProfileImg}
          name={profile?._id?.name}
          image={userImage}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          updateProfile={updateProfile}
        />
      )}
    </CContainer>
  );
}

export default Profile;
