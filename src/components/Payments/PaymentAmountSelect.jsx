/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  CModalBody,
  CCard,
  CCardBody,
  CButton,
  CCardFooter,
  CCardHeader,
} from "@coreui/react";
import displayRazorpay from "../../utils/PaymentGateway";
import { useSelector } from "react-redux";
import { getFutureDate } from "../../utils/DateTimeService";

function PaymentAmountSelect({ confirmState }) {
  const userId = useSelector((state) => state.user.id);
  const investorId = useSelector((state) => state.investor._id);
  const [loading, setLoading] = useState(false);

  const paymentOptions = [
    {
      amount: "Rs. 249",
      features: [
        "Reports and Research",
        "Live Events",
        "Options Analyzer",
        "Portfolio Management",
        "Live Sessions",
        "Chance to be a mentor",
        "Valid for 2 months",
      ],
      action: () => displayRazorpay(userId, setLoading, confirmState, false, 0),
    },
    {
      amount: "Rs. 5000",
      features: [
        "NISM Coaching assistance",
        "Reports and Research",
        "Live Events",
        "Options Analyzer",
        "Portfolio Management",
        "Live Sessions",
        "Valid for a year",
      ],
      action: () => displayRazorpay(userId, setLoading, confirmState, false, 1),
    },
  ];

  const investorPaymentOptions = [
    {
      amount: "Rs. 299",
      features: [
        "One day Access to connect with Advisor and Analyst",
        "One day Full Access to the Investor Dashboard",
      ],
      action: () =>
        displayRazorpay(
          investorId,
          setLoading,
          confirmState,
          true,
          0,
          getFutureDate(1)
        ),
    },
    {
      amount: "Rs. 549",
      features: ["4 active sessions/month"],
      action: () =>
        displayRazorpay(investorId, setLoading, confirmState, true, 1),
    },
  ];

  return (
    <CModalBody>
      <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
        {(userId ? paymentOptions : investorPaymentOptions).map((option) => (
          <CCard
            className="mb-4 mx-2"
            style={{ width: "300px", height: "400px" }}
            key={option.amount}
          >
            <CCardHeader className="text-center">
              <h4 style={{ fontWeight: "bold" }}>{option.amount}</h4>
            </CCardHeader>
            <CCardBody>
              <ul style={{ padding: 1, marginLeft: "1em" }}>
                {option.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CCardBody>
            <CCardFooter className="text-center">
              <CButton color="primary" onClick={option.action}>
                Pay Now
              </CButton>
            </CCardFooter>
          </CCard>
        ))}
      </div>
    </CModalBody>
  );
}

export default PaymentAmountSelect;
