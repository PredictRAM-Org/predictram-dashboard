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

function AdminIncomeCard({ name, symbol, totalAdvisor, enddate, eventId }) {
  const [eventStatus, setEventStatus] = useState({
    active: false,
    ended: null,
  });
  useEffect(() => {
    let date = new Date(enddate);
    let currentDate = new Date();
    setEventStatus({
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
          <CCardTitle className="fw-bold">{name} </CCardTitle>
          <span className="text-danger">
            Income Statement Event end date is {eventStatus.ended}
          </span>
          {eventStatus.active && (
            <>
              <CListGroupItem className="my-2 rounded-3 text-danger fw-bold">
                This Income Statement event had been ended
              </CListGroupItem>
            </>
          )}

          <CListGroup>
            <CListGroupItem className="my-2 rounded-3">
              Stock Symbol {symbol}
            </CListGroupItem>
            <CListGroupItem className="my-2 rounded-3">
              Total Advisor {totalAdvisor}
            </CListGroupItem>
          </CListGroup>
          <CButton
            to={`/admin/incomestatement/${eventId}`}
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

export default AdminIncomeCard;
