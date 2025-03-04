import { CBadge } from "@coreui/react";
import React from "react";
import noAccess from "../assets/illustrations/access_denied.svg";

function NoAccess({ color, message }) {
  return (
    <div className="text-center fs-4 m-5">
      <div className="mb-2">
        <img
          style={{ height: "20rem", width: "20rem", objectFit: "contain" }}
          src={noAccess}
          alt="no data"
        />
      </div>
      <CBadge color={color || "secondary"}>
        You don't have access to this page
      </CBadge>
    </div>
  );
}

export default NoAccess;
