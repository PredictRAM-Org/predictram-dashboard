import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function PaymentConfirmation() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  return (
    <>
      <CModal alignment="center" visible={visible} size="lg">
        <CModalHeader>
          <CModalTitle>Congrats</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You are now a premium user. Thanks a lot for believing in us
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => history.go(0)}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
