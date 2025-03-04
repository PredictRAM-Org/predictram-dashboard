import { cilArrowCircleRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CListGroupItem } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";
import star from "../assets/illustrations/star.svg";

const totalLikes = (data) => {
    if (!data.likes.length) return 0;
    let stars = 0;
    data.likes.forEach((el, index) => {
      stars += el.rate;
    });
    return stars;
  };

function Researchcard({paper,idx}) {
  return (
    <CListGroupItem
      component={Link}
      key={idx}
      to={`/viewresearch/${paper._id}`}
      className="  justify-content-between align-items-center groupItem"
    >
      <p className="fs-5">
        <div>
          {paper.title}
          <div className="d-flex gap-2 align-items-center">
            {totalLikes(paper)}
            <img
              alt="..."
              src={star}
              style={{ height: "20px", width: "20px" }}
            />
          </div>
        </div>
        <span className="float-end">
          <CIcon role="button" icon={cilArrowCircleRight} size="lg" />
        </span>
      </p>
      {paper.text.substr(0, 200)}...
    </CListGroupItem>
  );
}

export default Researchcard;
