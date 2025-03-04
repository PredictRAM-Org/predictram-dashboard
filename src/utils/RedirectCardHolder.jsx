import React from "react";
import { Link } from "react-router-dom";

const quickLinkStyles = {
  wrapper: {
    gap: "0.625rem",
    padding: "1.625rem 1.625rem",
    width: "fit-content",
    borderRadius: "0.625rem",
    textDecoration: "none",
  },
  headingLarge: {
    fontSize: "2rem",
    lineHeight: "2rem",
    fontWeight: 600,
    color: "#14151F",
    letterSpacing: "-0.05em",
  },
  headingSmall: {
    fontSize: "1.375rem",
    lineHeight: "2rem",
    fontWeight: 600,
    color: "#14151F",
    letterSpacing: "-0.04em",
  },
};

const accentColors = {
  primary: "#F5F8FF",
  secondary: "#F5FFF6",
  info: "#FFF7EE",
};

function RedirectCardHolder({ path, title, data, color }) {
  return (
    <Link
      to={path}
      className="d-flex flx-col"
      style={{
        ...quickLinkStyles.wrapper,
        backgroundColor: `${accentColors[color]}`,
      }}
    >
      <h4 style={{ ...quickLinkStyles.headingLarge }}>{data ?? 0}</h4>
      <div
        style={{
          color: "#6F6E7A",
          fontSize: "0.875rem",
        }}
      >
        {title}
      </div>
    </Link>
  );
}

export default RedirectCardHolder;
