import React from "react";

import "../../assets/css/horizontalscroll.css";
import { useHistory } from "react-router-dom";
import { CCol, CHeaderDivider, CRow } from "@coreui/react";

function EventCard({ data, name }) {
  const history = useHistory();

  return (
    <div id={`slider${name}`}>
      {data.map((slide, index) => {
        return (
          <div
            className="slider-card my-3"
            key={slide._id}
            onClick={() => history.push(`/eventdetails/${slide._id}`)}
          >
            <div
              className="slider-card-image"
              style={{
                backgroundImage: `url(${slide.image}`,
                backgroundSize: "cover",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "rgba(79, 75, 75, 0.12)",
                border: "1px solid rgba(79, 75, 75, 0.12)",
                padding: "0.5em 2em",
              }}
            >
              <CRow>
                <CCol md={9} className="slider-card-title">
                  {slide.name.substr(0, 20)}...
                </CCol>
                <CCol
                  md={3}
                  className={
                    +slide.difference <= 0
                      ? "text-success ml-3"
                      : "text-danger ml-3"
                  }
                >
                  {slide.portfolio_percent}%
                </CCol>
              </CRow>
              <CHeaderDivider />
              <CRow>
                <CCol>Portfolio Creation Value: {slide.createdValue}</CCol>
                <CCol>Portfolio Current Value: {slide.currentValue}</CCol>
              </CRow>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EventCard;
