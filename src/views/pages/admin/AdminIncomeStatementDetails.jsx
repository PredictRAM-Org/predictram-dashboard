import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getIncomeStatementEvent,
  getIncomeStatementSummary,
} from "../../../api/services/IncomeStatementService";
import { toast } from "react-toastify";
import Loader from "../users/Loader";
import VisualNoData from "../../../utils/VisualNoData";
import CustomTable from "../../../utils/CustomTable";
import { CSmartTable } from "@coreui/react-pro";

const columns = [
  {
    header: "Total Revenue/Income (Cr)",
    accessor: "avg_total_revenue_income",
  },
  {
    header: "Total Operating Expense (Cr)",
    accessor: "avg_total_operating_expense",
  },
  {
    header: "EBITDA (Cr)",
    accessor: "avg_EBITDA",
  },
  {
    header: "Net Income (Cr)",
    accessor: "avg_net_income",
  },
  {
    header: "Total Advisor",
    accessor: "totalAdvisor",
  },
];

function AdminIncomeStatementDetails() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incomeEvent, setIncomeEvent] = useState({});
  const [subscriber, setSubscriber] = useState([]);
  const { id } = useParams();

  const getResult = async () => {
    const { data } = await getIncomeStatementSummary(setLoading, {
      eventId: id,
    });
    setResult(data);
  };

  const getIncomeStatement = async () => {
    const {
      data: [incomeEventData],
    } = await getIncomeStatementEvent(setLoading, { eventId: id });
    if (!incomeEventData) {
      return toast.error("Event data not found");
    }
    setIncomeEvent(incomeEventData ?? {});
    setSubscriber(incomeEventData?.subscriber ?? []);
  };

  useEffect(() => {
    getResult();
    getIncomeStatement();
  }, []);
  console.log(subscriber);
  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div>
          <h1>{incomeEvent?.name}</h1>
          <h3>{incomeEvent?.stockSymbol}</h3>
          {result.length != 0 && (
            <CustomTable data={result} columns={columns} />
          )}
          <h3 className="my-4">Details of Event</h3>
          {!subscriber.length && <VisualNoData />}
          {subscriber.length != 0 && (
            <CSmartTable
              cleaner
              clickableRows
              columns={[
                {
                  key: "userName",
                  label: "Name",
                  _props: { color: "primary", className: "fw-semibold" },
                },
                {
                  key: "userEmail",
                  label: "Email",
                  _props: { color: "primary", className: "fw-semibold" },
                },
                {
                  key: "total_revenue_income",
                  filter: false,
                  sorter: false,
                  label: "Total Operating Expense (Cr)",
                  _props: { color: "primary", className: "fw-semibold" },
                },
                {
                  key: "total_operating_expense",
                  label: "Total Operating Expense (Cr)",
                  filter: false,
                  sorter: false,
                  _props: { color: "primary", className: "fw-semibold" },
                },
                {
                  key: "EBITDA",
                  label: "EBITDA (Cr)",
                  filter: false,
                  sorter: false,
                  _props: { color: "primary", className: "fw-semibold" },
                },
                {
                  key: "net_income",
                  label: "Net Income (Cr)",
                  filter: false,
                  sorter: false,
                  _props: { color: "primary", className: "fw-semibold" },
                },
              ]}
              columnFilter
              columnSorter
              items={subscriber.map((obj) => ({
                userName: obj.userId.name,
                userEmail: obj.userId.email,
                ...obj,
              }))}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              sorterValue={{ column: "name", state: "asc" }}
              tableFilter
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AdminIncomeStatementDetails;
