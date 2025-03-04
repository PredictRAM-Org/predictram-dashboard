import React, { Suspense, lazy } from "react";
import {
  AppSidebar,
  Footer,
  AppHeader,
  AppContent,
  InvestorAppSidebar,
} from "../components/index";
import { CSpinner } from "@coreui/react";
import { useSelector } from "react-redux";
export default function Defaultlayout() {
  const auth = useSelector((state) => state.user.authenticated);
  const investorAuth = useSelector((state) => state.investor.authenticated);
  const profilecomplete = useSelector((state) => state.user.profilecomplete);
  return (
    <>
      {auth && profilecomplete && <AppSidebar />}
      {investorAuth && <InvestorAppSidebar />}
      <div
        className="wrapper d-flex flex-column min-vh-100"
        style={{ backgroundColor: "#fafafa" }}
      >
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <Footer />
      </div>
    </>
  );
}
