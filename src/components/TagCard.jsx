import React from "react";
import CIcon from "@coreui/icons-react";
import { cilTag } from "@coreui/icons-pro";
import { Link } from "react-router-dom";

function TagCard({ name, status, clickevent }) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <Link
        to={`/tag/${name}`}
        className="d-flex align-items-center gap-3 text-black text-decoration-none"
        style={{ cursor: "pointer" }}
      >
        <CIcon icon={cilTag} className="mb-3" size="xl"></CIcon>
        <p className="fw-semibold">{name}</p>
      </Link>
      <div onClick={() => clickevent(name)}>
        <p
          style={{
            padding: "0 1rem 0 1rem",
            borderRadius: "999px",
            backgroundColor: "white",
            color: "blue",
            outline: "1px solid #F88700",
            cursor: "pointer",
          }}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

export default TagCard;
