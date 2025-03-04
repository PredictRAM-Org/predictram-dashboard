import {
  CButton,
  CCardText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sessionRegister } from "../../../api/services/SessionService";

function SessionRegisterModal({
  visible,
  setVisible,
  session,
  handleSessionState,
}) {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sessionRegister(setLoading, { sessionId: session._id, userId });
    if (handleSessionState) handleSessionState(1);

    setVisible(false);
  };

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Register for the Session</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardText>Do you want to register for {session?.title} ?</CCardText>
        <CCardText>
          {session.fee === 0
            ? `Its a free session`
            : `You need to pay RS.${session?.fee} + gst`}
        </CCardText>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton onClick={handleSubmit} color="primary">
          Register
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default SessionRegisterModal;
