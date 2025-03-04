import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import { useEffect } from "react";

import {
  getSessions,
  getSessionsUnAssigned,
} from "../../../api/services/SessionService";
import TabularNav from "../../../components/TabularNav";
import VisualNoData from "../../../utils/VisualNoData";
import Loader from "../users/Loader";
import SessionActionCards from "../../../components/Sessions/SessionActionCards";
import SessionTimeAssignModal from "../../../components/Sessions/SessionTimeAssignModal";
import SessionFilters from "../../../components/Sessions/SessionFilters";

const options = ["Unassigned", "Assigned"];

function AssignSessions() {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [params, setParams] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState();
  const [sessionState, setSessionState] = useState(0);

  const getUnAssignedSessions = async (params = {}) => {
    const { data = [] } = await getSessionsUnAssigned(setLoading, params);
    if (data.length) {
      setSessions(data);
    }
  };

  const getAssignedSessions = async (params = {}) => {
    const { data = [] } = await getSessions(setLoading, params);
    if (data.length) {
      setSessions(data);
    }
  };

  const handleOnClick = async (session) => {
    setCurrentSession(session);
    setShowModal(true);
  };

  const handleSessionState = (index = 0) => {
    setSessionState(index);
    setSessions([]);
    if (params?.date) {
      if (index === 0) {
        getUnAssignedSessions(params);
      } else if (index === 1) {
        getAssignedSessions(params);
      }
    }
  };

  useEffect(() => {
    handleSessionState();
  }, [params]);

  return (
    <div>
      <SessionTimeAssignModal
        visible={showModal}
        setVisible={setShowModal}
        session={currentSession}
        sessionDate={params?.date}
        getData={handleSessionState}
      />
      <CRow>
        <CCol sm={12} md={4}>
          <SessionFilters setParams={setParams} />
        </CCol>
        <CCol className="mb-4" sm={12} md={8}>
          <TabularNav
            options={options}
            state={sessionState}
            handleState={handleSessionState}
          />
          {loading && <Loader />}
          {!loading && (
            <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4 mt-4">
              {sessions?.length > 0 &&
                sessions.map((session) => {
                  return (
                    <SessionActionCards
                      session={session}
                      setLoading={setLoading}
                      params={params}
                      setParams={setParams}
                      actionText={"Assign"}
                      actionSuccessText={"Assigned"}
                      sessionAssigned={sessionState === 1}
                      onClickAction={() => handleOnClick(session)}
                    />
                  );
                })}
              {sessions?.length <= 0 && (
                <VisualNoData message="No data to show. Try with different filters" />
              )}
            </CRow>
          )}
        </CCol>
      </CRow>
    </div>
  );
}

export default AssignSessions;
