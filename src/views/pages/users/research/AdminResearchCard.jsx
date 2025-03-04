/* eslint-disable react-hooks/exhaustive-deps */
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  featureResearchPaperAdmin,
  publishResearchPaperAdmin,
} from "../../../../api/services/ResearchPaperService";
import starred from "../../../../assets/illustrations/starred.svg";

function AdminResearchCard({ data, setLoading, refresh }) {
  const history = useHistory();
  const [stars, setStars] = useState(0);

  const handleRedirect = (id) => {
    history.push(`/admin/researchpapers/viewresearch/${id}`);
  };

  const publishPaper = async (id) => {
    await publishResearchPaperAdmin(setLoading, { id });
    setStars(0);
    refresh();
  };

  const featurePaper = async (id) => {
    await featureResearchPaperAdmin(setLoading, { id });
    publishPaper(id);
  };

  const totalLikes = () => {
    if (data.likes.length) {
      let stars = 0;
      data.likes.forEach((el, index) => {
        stars += el.rate;
      });
      console.log("total stars", stars);
      setStars(stars);
    } else {
      setStars(0);
    }
  };

  useEffect(() => {
    totalLikes();
  }, [data]);

  return (
    <CCard className="mt-4" style={{ width: "25vw", cursor: "pointer" }}>
      <div onClick={() => handleRedirect(data._id)}>
        <CCardImage orientation="top" src={data.image} />
        <CCardBody>
          <CCardTitle className="d-flex justify-content-between align-items-center gap-2">
            {data.title}
            <span className="d-flex align-items-center justify-content-end gap-1">
              <div>
                <img
                  alt="..."
                  src={starred}
                  style={{ height: "14px", width: "14px" }}
                />
              </div>
              <div>{stars}</div>
            </span>
          </CCardTitle>
          <CCardSubtitle
            className="text-medium-emphasis"
            style={{
              color: "#252525",
              fontWeight: 500,
            }}
          >
            <span>{data.userId && data.userId.name}</span>
          </CCardSubtitle>
          <CCardText>{data.text.substr(0, 100)}...</CCardText>
        </CCardBody>
      </div>

      {stars > 0 && (
        <CCardFooter>
          <CRow className="text-center my-2">
            <CCol>
              <CButton onClick={() => featurePaper(data._id)}>Feature</CButton>
            </CCol>
            <CCol>
              <CButton onClick={() => publishPaper(data._id)} color="success">
                Publish
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      )}
    </CCard>
  );
}

export default AdminResearchCard;
