import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  assignDatesToSession,
  sessionNotifyEveryone,
} from "../../api/services/SessionService";
import { addSecondsToTime } from "../../utils/DateTimeService";

function SessionTimeAssignModal({
  visible,
  setVisible,
  session,
  sessionDate,
  getData,
}) {
  const [sessionStartTime, setSessionStartTime] = useState();
  const [loading, setLoading] = useState(false);

  const notifyEveryoneAboutSession = async () => {
    await sessionNotifyEveryone(setLoading, { id: session._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionDate) return toast.error("Session Date not assigned");
    const assigningSessions = toast.loading("Assigning Session....");

    const { statusCode } = await assignDatesToSession(setLoading, {
      id: session._id,
      date: sessionDate,
      fromTime: sessionStartTime,
      toTime: addSecondsToTime(sessionStartTime, session.duration),
    });
    toast.dismiss(assigningSessions);

    if (statusCode === 200) {
      console.log("Notifying everyone");
      notifyEveryoneAboutSession();
    }
    setVisible(false);
    getData();
  };

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Assign time for the session</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          name="sessionStartTime"
          placeholder="Enter Time"
          type="time"
          value={sessionStartTime}
          onChange={(event) => setSessionStartTime(event.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton onClick={handleSubmit} color="primary">
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default SessionTimeAssignModal;
