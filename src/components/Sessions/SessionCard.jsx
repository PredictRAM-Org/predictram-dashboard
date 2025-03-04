import { cilClock, cilShare, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
} from "@coreui/react";
import React, { useState } from "react";
import { deleteSession } from "../../api/services/SessionService";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import ShareModal from "../ShareModal";

const Duration = [
  { value: 3600, label: "1 hr" },
  { value: 2700, label: "45 min" },
  { value: 1800, label: "30 min" },
];

const Tags = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Economy", label: "Economy" },
  { value: "General", label: "General" },
  { value: "Analysis", label: "Analysis" },
  { value: "Carrer_Advice", label: "Carrer Advice" },
  { value: "Others", label: "Others" },
];

function SessionCard({ session, setLoading, params, setParams }) {
  const history = useHistory();
  const [showShare, setShowShare] = useState(false);

  const handelDeleteSession = async (id, title) => {
    Swal.fire(`Do You want to delete this session: ${title}?`).then(
      async (res) => {
        if (res.isConfirmed) {
          await deleteSession(setLoading, id);
          setParams({ ...params });
        }
      },
    );
  };

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
            <div className="d-flex justify-content-between">
              <CCardTitle>{session.title}</CCardTitle>
              <div className="d-flex gap-3">
                <CIcon
                  icon={cilTrash}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handelDeleteSession(session._id, session.title)
                  }
                ></CIcon>
                <CIcon
                  icon={cilShare}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowShare(true)}
                ></CIcon>
              </div>
            </div>
            <CCardSubtitle className="mb-2">
              {Tags.find((tags) => tags.value === session.tags).label}
            </CCardSubtitle>
            <CCardText>{session.description}</CCardText>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex gap-2">
                <CIcon className="mt-1" icon={cilClock}></CIcon>
                <p>
                  {Duration.find((d) => d.value === session.duration).label}
                </p>
                <hr />
                <p>{session.fee === 0 ? "free" : `Rs.${session.fee}/-`}</p>
              </div>
              <div>
                <div
                  style={{
                    padding: "0.3125rem 0.625rem",
                    borderRadius: "999px",
                    backgroundColor: "#F5F8FF",
                    color: "#10398E",
                    outline: "1px solid #10398E",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    history.push(`/creator/edit-session/${session._id}`)
                  }
                >
                  Edit
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <ShareModal
          show={showShare}
          setShow={setShowShare}
          linkedin={true}
          link={`${window.origin}/sessions/register`}
        />
      </CCol>
    </div>
  );
}

export default SessionCard;
