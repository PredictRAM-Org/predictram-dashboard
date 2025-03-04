import { CCard, CCardBody, CCardHeader, CListGroup } from "@coreui/react";
import React from "react";
import NoData from "./NoData";

function CardHolder({ data, title, loading, children }) {
  return (
    <CCard>
      <CCardHeader>
        <span className="fs-5">{title}</span>
      </CCardHeader>
      <CCardBody>
        {data.length && !loading ? (
          <CListGroup flush>{children}</CListGroup>
        ) : (
          <NoData />
        )}
      </CCardBody>
    </CCard>
  );
}

export default CardHolder;
