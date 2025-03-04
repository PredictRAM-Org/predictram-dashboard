import { CBadge } from "@coreui/react";
import React from "react";

function NoData({ color, message }) {
  return (
    <div className="text-center fs-5">
      <CBadge color={color || "secondary"}>
        {message || "No data to show"}
      </CBadge>
    </div>
  );
}

export default NoData;
