import React, { useEffect, useState } from "react";
import {
  getSessions,
  getUserRegisteredSessions,
} from "../../../../api/services/SessionService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { useHistory, useParams } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CRow,
} from "@coreui/react";
import Loader from "../Loader";
import SessionRegisterModel from "../../admin/SessionRegisterModal";
import { get12HrTime, getLocalDate } from "../../../../utils/DateTimeService";
import { useSelector } from "react-redux";
import { Button, Skeleton } from "@mui/material";
const Tags = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Economy", label: "Economy" },
  { value: "General", label: "General" },
  { value: "Analysis", label: "Analysis" },
  { value: "Carrer_Advice", label: "Carrer Advice" },
  { value: "Others", label: "Others" },
];

function SessionDetails() {
  const history = useHistory();
  const { id, context } = useParams();
  const [sessiondata, setSessionData] = useState();
  const [loading, setLoading] = useState();
  const userId = useSelector((state) => state.user.id);
  const [sessionRegistered, setSessionRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getRegisteredSessions = async () => {
    const { data = [] } = await getUserRegisteredSessions(setLoading, userId, {
      sessionId: id,
    });
    if (data.length !== 0) {
      setSessionRegistered(true);
    }
  };

  const fetchSessionData = async () => {
    const {
      data: [session],
    } = await getSessions(setLoading, { id });

    setSessionData(session);
  };

  const onClickRegister = async () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (id) {
      fetchSessionData();
      getRegisteredSessions();
    }
  }, [id, showModal]);
  return (
    <>
      {showModal && (
        <SessionRegisterModel
          visible={showModal}
          setVisible={setShowModal}
          session={sessiondata}
        />
      )}
      {!loading && (
        <CCard
          style={{
            boxShadow: "none",
          }}
        >
          <CCardBody>
            <CRow className="align-items-center">
              <CCol md={6} sm={12}>
                {sessiondata?.image ? (
                  <CCardImage
                    className="mx-auto mb-4"
                    src={
                      sessiondata?.image ||
                      "https://picsum.photos/1000?random=" + Math.random()
                    }
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: "0.75rem",
                    }}
                  />
                ) : (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
              </CCol>
              <CCol md={6} sm={12}>
                <CCardTitle
                  className="p-0 m-0 text-1"
                  style={{
                    fontWeight: 600,
                    color: "#252525",
                    textAlign: "center",
                  }}
                >
                  {sessiondata?.title}
                </CCardTitle>
                <CCardText
                  className="m-0 text-2"
                  style={{
                    fontWeight: 500,
                    color: "#AFAFB6",
                    textAlign: "center",
                  }}
                >
                  {Tags.find((tags) => tags.value === sessiondata?.tags)?.label}
                </CCardText>
                <CCardText
                  className="mx-4 mt-1 mb-3"
                  style={{
                    fontWeight: 200,
                    textAlign: "center",
                  }}
                >
                  {sessiondata?.description}
                </CCardText>
                {sessiondata?.scheduledTimeStamp && (
                  <CCardText
                    className="mx-4 my-1"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div className="bold d-flex align-items-center gap-2 justify-content-center mb-1">
                      <div>
                        <EventIcon />
                      </div>
                      <div>
                        {getLocalDate(sessiondata?.scheduledTimeStamp?.date)}
                      </div>
                    </div>

                    <div className="bold d-flex align-items-center gap-2 justify-content-center mb-4">
                      <div>
                        <AccessTimeIcon />
                      </div>
                      <div>
                        {get12HrTime(sessiondata?.scheduledTimeStamp?.fromTime)}
                        -{get12HrTime(sessiondata?.scheduledTimeStamp?.toTime)}
                      </div>
                    </div>
                  </CCardText>
                )}
                {context === "register" && (
                  <CButton
                    style={{ width: "100%" }}
                    disabled={sessionRegistered}
                    onClick={onClickRegister}
                  >
                    {sessionRegistered ? "Registered" : "Register"}
                  </CButton>
                )}
              </CCol>
            </CRow>

            <hr />
            <CCardText
              className="m-0 text-center text-md-start"
              style={{
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
            >
              About The Instructor :
            </CCardText>
            <CRow className="mt-3 justify-content-center">
              <CCol className="text-center" md={5} sm={12}>
                <CImage
                  className="shadow"
                  rounded
                  src={
                    sessiondata?.instructorDetails?.image ??
                    `https://ui-avatars.com/api/?name=${sessiondata?.instructorDetails?.name.replaceAll(
                      " ",
                      "+"
                    )}`
                  }
                  width={200}
                  height={200}
                />
              </CCol>
              <CCol className="text-center text-md-start" md={7} sm={12}>
                <CCardText
                  className="mb-0 mt-2 mt-md-0 text-1"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {sessiondata?.instructorDetails?.name}
                </CCardText>
                <CCardText
                  className="m-0"
                  style={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "#AFAFB6",
                    maxWidth: "35rem",
                  }}
                >
                  {sessiondata?.instructorBio?.about}
                </CCardText>
                <Button
                  className="mt-4"
                  variant="contained"
                  onClick={() =>
                    history.push(
                      `/profile/${sessiondata?.instructorDetails?._id}`
                    )
                  }
                >
                  View Profile
                </Button>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
      {loading && <Loader />}
    </>
  );
}

export default SessionDetails;
