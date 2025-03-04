import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import React from "react";
import { get12HrTime, getLocalDate } from "../../utils/DateTimeService";
import { Link, useHistory } from "react-router-dom";

const Tags = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Economy", label: "Economy" },
  { value: "General", label: "General" },
  { value: "Analysis", label: "Analysis" },
  { value: "Carrer_Advice", label: "Carrer Advice" },
  { value: "Others", label: "Others" },
];

function SessionActionCards({
  session,
  actionText,
  actionSuccessText,
  onClickAction,
  sessionAssigned = false,
  showSessionSchedule,
}) {
  const history = useHistory();
  return (
    <div>
      <CCol>
        <CCard
          style={{
            padding: "0.3125rem 0.625rem",
            borderRadius: "5px",
            backgroundColor: "#F5F8FF",
            color: "#10398E",
            outline: "1px solid #10398E",
          }}
        >
          <CCardBody>
            <CCardTitle>{session.title}</CCardTitle>

            <CCardSubtitle className="mb-2">
              {Tags.find((tags) => tags.value === session.tags).label}
            </CCardSubtitle>
            <CCardText>{session?.description?.substring(0, 60)}...</CCardText>
            {(showSessionSchedule || sessionAssigned) && (
              <div className="mx-2">
                <CRow className="mb-1">
                  {getLocalDate(session?.scheduledTimeStamp?.date)}
                </CRow>

                <CRow>
                  {get12HrTime(session?.scheduledTimeStamp?.fromTime)}-
                  {get12HrTime(session?.scheduledTimeStamp?.toTime)}
                </CRow>
              </div>
            )}

            {session?.instructorDetails?.name && (
              <div className="mt-3">
                <div className="d-flex gap-2 ">
                  <CAvatar
                    src={
                      session?.instructorDetails?.image ||
                      "https://picsum.photos/200"
                    }
                    size="md"
                  />
                  <p>{session?.instructorDetails?.name}</p>
                </div>
              </div>
            )}

            <hr />
            <CRow className="gap-2">
              <CCol>
                <CButton disabled={sessionAssigned} onClick={onClickAction}>
                  {sessionAssigned
                    ? `${actionSuccessText}`
                    : `${actionText ?? "Assign"}`}
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  color="info"
                  className="text-white"
                  onClick={() =>
                    history.push({
                      pathname:
                        actionText !== "Assign"
                          ? `/sessions/register/details/${session._id}`
                          : `/sessions/assign/details/${session._id}`,
                    })
                  }
                >
                  View Details
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  );
}

export default SessionActionCards;
