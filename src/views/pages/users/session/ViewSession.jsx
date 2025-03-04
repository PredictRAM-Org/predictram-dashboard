import { CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import VisualNoData from "../../../../utils/VisualNoData";
import TabularNav from "../../../../components/TabularNav";
import { getSessions } from "../../../../api/services/SessionService";
import SessionCard from "../../../../components/Sessions/SessionCard";

const options = ["All Sessions", "Unpaid", "Paid"];

function ViewSession() {
  const [sessions, setSessions] = useState([]);
  const [sessionState, setSessionState] = useState(0);
  const [loading, setLoading] = useState(false);
  const instructor = useSelector((state) => state.user.id);
  const [params, setParams] = useState({
    instructor,
  });

  const handleSessionSection = (state) => {
    setSessionState(state);

    if (state === 0) {
      setParams({
        instructor,
      });
    } else if (state === 1) {
      setParams({
        instructor,
        paid: false,
      });
    } else if (state === 2) {
      setParams({
        instructor,
        paid: true,
      });
    }
  };

  const fetchSessions = async () => {
    try {
      setSessions([]);
      setLoading(true);

      const { data = [] } = await getSessions(setLoading, params);
      if (data.length) {
        setSessions(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [params]);

  return (
    <CContainer className="mb-4" fluid>
      <h1 className="text-center m-0">Your Sessions</h1>
      <TabularNav
        options={options}
        state={sessionState}
        handleState={handleSessionSection}
      />
      {loading && <Loader />}
      {!loading && (
        <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
          {sessions?.length > 0 &&
            sessions.map((session) => {
              return (
                <SessionCard
                  session={session}
                  setLoading={setLoading}
                  params={params}
                  setParams={setParams}
                />
              );
            })}
        </CRow>
      )}
      {sessions?.length === 0 && (
        <VisualNoData message="No session published" />
      )}

      {!sessions && <VisualNoData message="No data to show" />}
    </CContainer>
  );
}

export default ViewSession;
