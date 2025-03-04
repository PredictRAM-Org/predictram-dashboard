import { CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InvestorPortfolioWidget from "./InvestorPortfolioWidget";
import InvestorProfileProgress from "./InvestorProfileProgress";
import InvestorRiskView from "./InvestorRiskView";
import InvestorViewETF from "./InvestorViewETF";
import InvestorRecommend from "./InvestorRecommend";
import InvestorViewEventsWidget from "./InvestorViewEventsWidget";

function InvestorDashboard() {
  const investor = useSelector((state) => state.investor);

  return (
    <>
      <div>
        <h1>
          Welcome Back, {investor?.firstName ? investor.firstName : "Investor"}!
        </h1>
      </div>
      {!investor?.profileCompleted && (
        <CRow className="my-5">
          <CCol xs={12} md={12}>
            <InvestorProfileProgress />
          </CCol>
        </CRow>
      )}
      <CRow className="mt-5">
        <CCol xs={12} md={6}>
          <InvestorRiskView />
        </CCol>
        <CCol xs={12} md={6}>
          <InvestorPortfolioWidget />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <InvestorRecommend />
        </CCol>
      </CRow>
      <CRow className="my-5">
        {/* <InvestorViewETF /> */}
        <InvestorViewEventsWidget />
      </CRow>
    </>
  );
}

export default InvestorDashboard;
