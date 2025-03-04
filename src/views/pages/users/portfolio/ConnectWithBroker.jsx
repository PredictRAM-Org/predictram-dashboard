import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import { handelFyersLogin } from "../../../../utils/custom/fyersLogin";
import fyersIcon from "../../../../assets/images/fyerslogo.svg";
import paytmMoneyIcon from "../../../../assets/images/paytmMoney.svg";
import { useHistory } from "react-router-dom";
import { handelPaytmMoneyLogin } from "../../../../utils/custom/paytmMoneyLogin";

function ConnectWithBroker() {
  const history = useHistory();

  return (
    <div>
      <CRow>
        <h1 className="text-center m-0">Connect with your favorite broker</h1>
        <CCard
          className="mt-3"
          onClick={() => handelFyersLogin(window.location.origin)}
        >
          <CCardBody style={{ cursor: "pointer" }}>
            <img alt="..." src={fyersIcon}></img>
          </CCardBody>
        </CCard>
        <CCard className="mt-3" onClick={handelPaytmMoneyLogin}>
          <CCardBody style={{ cursor: "pointer" }}>
            <img alt="..." src={paytmMoneyIcon}></img>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="my-4">
        <CCol>
          <hr />
        </CCol>
        <CCol>
          <div className="text-2 text-center">OR</div>
        </CCol>
        <CCol>
          <hr />
        </CCol>
      </CRow>
      <CRow>
        <CCard
          className="mt-3"
          onClick={() => history.push("/investor/portfolio/create-portfolio")}
        >
          <CCardBody style={{ cursor: "pointer" }}>
            <div className="text-2 bold">Create your portfolio</div>
          </CCardBody>
        </CCard>
      </CRow>
    </div>
  );
}

export default ConnectWithBroker;
