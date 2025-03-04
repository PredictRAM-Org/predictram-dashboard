import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CCol, CRow } from "@coreui/react-pro";
import React from "react";
import { useHistory } from "react-router-dom";
import "../../../../assets/css/Cards.css";

function AccessRoles() {
  const history = useHistory();
  const path = window.location.pathname;
  const authenticationMethod = path.substring(path.indexOf("/") + 1);

  const handleRedirectForInvestor = () => {
    if (authenticationMethod === "register") {
      history.push("/register/investor");
    } else {
      history.push("/login/investor");
    }
  };

  const handleRedirectForAdvisor = () => {
    if (authenticationMethod === "register") {
      history.push("/register/advisor/USER");
    } else {
      history.push("/login/advisor");
    }
  };

  return (
    <div className="card-container">
      <CCard className="text-center">
        <CCardHeader className="card-options-title">
          Signup/Signin As A
        </CCardHeader>
        <CCardBody className="card-options-container">
          <CRow className="g-3">
            <CCol md={6} sm={12}>
              <CButton
                style={{ backgroundColor: "#9b80e6" }}
                className="card-options"
                onClick={handleRedirectForInvestor}
              >
                Investor
              </CButton>
            </CCol>
            <CCol md={6} sm={12}>
              <CButton
                className="card-options"
                onClick={handleRedirectForAdvisor}
              >
                Advisor
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default AccessRoles;
