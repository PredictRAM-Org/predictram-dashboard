import { CCol, CWidgetStatsA } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../views/pages/users/Loader";
import CustomWidget from "./CustomWidget";

function Widget({
  title,
  value,
  color,
  show = false,
  path,
  md,
  loading = false,
}) {
  return (
    <>
      {!show && <></>}
      {show && (
        <CCol className="mb-sm-2" md={md}>
          {loading && <Loader />}
          {!loading && (
            <Link style={{ textDecoration: "none" }} to={path}>
              <CustomWidget data={value ?? 0} label={title} />
            </Link>
          )}
        </CCol>
      )}
    </>
  );
}

export default Widget;
