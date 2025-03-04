import { CBadge } from "@coreui/react";
import React from "react";
import noData from "../assets/illustrations/nodata.svg";

function VisualNoData({ color, message, imgSrc, imageHight, imageWidth }) {
  return (
    <div className="text-center fs-4 m-5">
      <div className="mb-2">
        <img
          style={{ objectFit: "contain" }}
          height={imageHight || "20rm"}
          width={imageWidth || "20rm"}
          src={imgSrc || noData}
          alt="no data"
        />
      </div>
      <CBadge color={color || "secondary"}>
        {message || "No data to show"}
      </CBadge>
    </div>
  );
}

export default VisualNoData;
