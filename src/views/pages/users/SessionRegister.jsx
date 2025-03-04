import React, { useEffect, useState } from "react";
import TabularNav from "../../../components/TabularNav";
import { CContainer, CRow } from "@coreui/react";
import VisualNoData from "../../../utils/VisualNoData";
import {
  getSessionsAvailable,
  getUserRegisteredSessions,
} from "../../../api/services/SessionService";
import { useSelector } from "react-redux";

import Loader from "./Loader";
import SessionRegisterModal from "../admin/SessionRegisterModal";
import SessionActionCards from "../../../components/Sessions/SessionActionCards";

const options = ["Available Sessions", "Registered Sessions"];

function SessionRegister() {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [params, setParams] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState();
  const [sessionState, setSessionState] = useState(0);
  const userId = useSelector((state) => state.user.id);

  const getAvailableSessions = async () => {
    const { data = [] } = await getSessionsAvailable(setLoading);
    if (data.length) {
      setSessions(data);
    }
  };

  const getRegisteredSessions = async () => {
    const { data = [] } = await getUserRegisteredSessions(setLoading, userId);
    if (data.length) {
      data.map((session) => {
        session.sessionDetailsId.instructorDetails = session.instructorDetails;
      });
      setSessions(data.map((session) => session?.sessionDetailsId));
    }
  };

  const handleOnClick = async (session) => {
    setCurrentSession(session);
    setShowModal(true);
  };

  const handleSessionState = (index = 0) => {
    setSessionState(index);
    setSessions([]);
    if (index === 0) {
      getAvailableSessions();
    } else if (index === 1) {
      getRegisteredSessions();
    }
  };

  useEffect(() => {
    handleSessionState();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-2">Register For Sessions</h1>
      {showModal && (
        <SessionRegisterModal
          visible={showModal}
          setVisible={setShowModal}
          session={currentSession}
          handleSessionState={handleSessionState}
        />
      )}
      <TabularNav
        options={options}
        state={sessionState}
        handleState={handleSessionState}
      />
      {loading && <Loader />}
      {!loading && (
        <CContainer className="my-4">
          <CRow className="g-4" xs={{ cols: 1 }} md={{ cols: 3 }}>
            {sessions?.length > 0 &&
              sessions.map((session) => {
                return (
                  <SessionActionCards
                    session={session}
                    setLoading={setLoading}
                    params={params}
                    setParams={setParams}
                    actionText={"Register"}
                    actionSuccessText={"Registered"}
                    sessionAssigned={sessionState === 1}
                    showSessionSchedule={true}
                    onClickAction={() => handleOnClick(session)}
                  />
                );
              })}
          </CRow>
          {(sessions?.length <= 0 || !sessions) && (
            <VisualNoData message="No data to show" />
          )}
        </CContainer>
      )}
    </div>
  );
}

export default SessionRegister;
