import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { CCol, CRow } from "@coreui/react-pro";

import fyersIcon from "../assets/images/fyerslogo.svg";
import { useHistory } from "react-router-dom";

function BrokerConnect({ visible, setVisible, setLoading, handelFyersLogin }) {
  const history = useHistory();

  return (
    <CModal
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <CForm>
        <CModalHeader>
          <CModalTitle>Know your portfolio risk</CModalTitle>
        </CModalHeader>
        <CModalBody className="mx-2">
          <CRow>
            <CCol>
              <CCard onClick={handelFyersLogin}>
                <CCardBody style={{ cursor: "pointer" }}>
                  <img alt="..." src={fyersIcon}></img>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="my-2">
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
            <CButton
              onClick={() =>
                history.push("/investor/portfolio/create-portfolio")
              }
            >
              Create your portfolio
            </CButton>
          </CRow>
        </CModalBody>
      </CForm>
    </CModal>
  );
}

export default BrokerConnect;
