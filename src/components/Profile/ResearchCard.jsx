import React from "react";
import "../../assets/css/horizontalscroll.css";
import { useHistory } from "react-router-dom";

function ResearchCard({ data = [], name }) {
  const history = useHistory();

  return (
    <div id={`slider${name}`}>
      {data?.map((slide, index) => {
        return (
          <div
            className="slider-card my-3"
            key={slide._id}
            onClick={() => history.push(`/viewresearch/${slide._id}`)}
          >
            <div
              className="slider-card-image"
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className="d-flex  justify-content-between align-items-center p-2"
              style={{
                backgroundColor: "rgba(79, 75, 75, 0.12)",
                border: "1px solid rgba(79, 75, 75, 0.12)",
              }}
            >
              <p className="slider-card-title">{slide.text.substr(0, 20)}...</p>
              <p className="ml-3">{slide.rate}⭐</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResearchCard;
