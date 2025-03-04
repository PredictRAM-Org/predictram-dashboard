import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CContainer,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPortfolioCard({
  title,
  portfolioRisk,
  idealRisk,
  enddate,
  portfolioId,
}) {
  const [portfolioStatus, setPortfolioStatus] = useState({
    active: false,
    ended: null,
  });
  useEffect(() => {
    let date = new Date(enddate);
    let currentDate = new Date();
    setPortfolioStatus({
      active: date < currentDate,
      ended: date.toDateString(),
    });
  }, []);
  return (
    <CContainer
      className="justify-content-center m-2"
      style={{ width: "25rem" }}
    >
      <CCard className="rounded-3 p-3">
        <CCardBody className="text-center">
          <CCardTitle className="fw-bold">{title} </CCardTitle>
          <span className="text-danger">
            Portfolio Management Event end date is {portfolioStatus.ended}
          </span>
          {portfolioStatus.active && (
            <>
              <CListGroupItem className="my-2 rounded-3 text-danger fw-bold">
                This Portfolio Management event had been ended
              </CListGroupItem>
            </>
          )}

          <CListGroup>
            <CListGroupItem className="my-2 rounded-3">
              Portfolio Risk {portfolioRisk}
            </CListGroupItem>
            <CListGroupItem className="my-2 rounded-3">
              Ideal Risk {idealRisk}
            </CListGroupItem>
          </CListGroup>
          <CButton
            to={`/admin/portfolio/management/${portfolioId}`}
            component={Link}
            color="success"
            className="m-2 px-3"
            shape="rounded-pill"
          >
            View Opinions
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default AdminPortfolioCard;
