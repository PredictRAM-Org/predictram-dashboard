import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import star from "../../../../assets/illustrations/star.svg";
import starred from "../../../../assets/illustrations/starred.svg";
import { post, get } from "axios";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getResearchPaperById } from "../../../../api/services/ResearchPaperService";
import Loader from "../Loader";

function ResearchFeedback() {
  const { id } = useParams();
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const userid = useSelector((state) => state.user.id);

  const fetchResearchPaper = async () => {
    const data = await getResearchPaperById(setLoading, { id });

    if (!!data.likes.length) {
      data.likes.forEach((like) => {
        if (like.id === userid) {
          setRating(like.rate);
        }
      });
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchResearchPaper();
  }, []);

  const handleRating = async (rating) => {
    setRating(rating + 1);
    try {
      const { data } = await post("/api/users/likeresearchpapaer", {
        researchId: id,
        rate: rating + 1,
      });

      toast.success("Paper rated successfully");
      fetchResearchPaper();

      history.push("/admin/researchpapers");
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  return (
    <div className="content text-center align-items-center">
      <h3>Tell us about your thoughts</h3>
      {loading && <Loader />}
      {!loading && (
        <>
          <CRow className="mt-4">
            {Array(10)
              .fill(0)
              .map((el, index) => {
                if (index <= rating - 1) {
                  return (
                    <CCol>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRating(index)}
                        key={index}
                      >
                        <img
                          src={starred}
                          alt="star"
                          style={{ height: "25px", width: "25px" }}
                        />
                      </div>
                    </CCol>
                  );
                } else {
                  return (
                    <CCol>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRating(index)}
                        key={index}
                      >
                        <img
                          src={star}
                          alt="star"
                          style={{ height: "50px", width: "50px" }}
                        />
                      </div>
                    </CCol>
                  );
                }
              })}
          </CRow>
          <div className="d-flex justify-content-between py-2 align-items-center text-center">
            <div style={{ paddingRight: "30px" }}>Hated the paper</div>
            <div style={{ paddingLeft: "30px" }}>Loved the paper</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ResearchFeedback;
