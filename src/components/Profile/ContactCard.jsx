import { cibGmail, cilVoicemail } from "@coreui/icons-pro";
import CIcon from "@coreui/icons-react";
import {
  CCardBody,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";

function ContactCard({ showadd, setShowadd, email }) {
  return (
    <CModal visible={showadd} onClose={() => setShowadd(false)}>
      <CModalHeader onClose={() => setShowadd(false)}>
        <CModalTitle>Your Contact Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="d-flex gap-3 justify-contant-center">
          <CIcon icon={cibGmail} size="xl" color="red" />
          <h5>{email}</h5>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default ContactCard;
