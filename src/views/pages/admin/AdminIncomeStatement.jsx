import React, { useEffect, useState } from "react";
import Loader from "../users/Loader";
import VisualNoData from "../../../utils/VisualNoData";
import AdminIncomeCard from "../../../components/AdminIncomeCard";
import {
  getIncomeStatementEvent,
  getIncomeStatementSummary,
} from "../../../api/services/IncomeStatementService";
import { CRow } from "@coreui/react";

function AdminIncomeStatement() {
  const [incomeEvent, setIncomeEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const getStatementEvents = async () => {
    const { data } = await getIncomeStatementEvent(setLoading);
    setIncomeEvent(data ?? []);
  };
  useEffect(() => {
    getStatementEvents();
  }, []);
  return (
    <CRow className="justify-content-center" xs={{ cols: "auto" }}>
      {loading && <Loader />}
      {!incomeEvent?.length && <VisualNoData />}
      {!loading &&
        !!incomeEvent?.length &&
        incomeEvent.map((event, idx) => (
          <AdminIncomeCard
            key={event?._id}
            eventId={event?._id}
            name={event?.name}
            symbol={event?.stockSymbol}
            totalAdvisor={event?.subscriber?.length}
            enddate={event?.endDate}
          />
        ))}
    </CRow>
  );
}

export default AdminIncomeStatement;
