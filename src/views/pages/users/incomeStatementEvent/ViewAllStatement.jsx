import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { getIncomeStatementEvent } from "../../../../api/services/IncomeStatementService";
import { useSelector } from "react-redux";
import VisualNoData from "../../../../utils/VisualNoData";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";

function ViewAllStatements() {
  const [currentPage, setCurrentPage] = useState(0);
  const [params, setParams] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [incomeEvent, setIncomeEvent] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  const getStatementEvents = async () => {
    if (isSubmitted) {
      const { data } = await getIncomeStatementEvent(setLoading, {
        ...params,
        userId,
      });
      setIncomeEvent(data ?? []);
    } else {
      const { data } = await getIncomeStatementEvent(setLoading, params);
      setIncomeEvent(data ?? []);
    }
  };

  useEffect(() => {
    getStatementEvents();
  }, [params, isSubmitted]);

  return (
    <CContainer
      fluid
      className="mb-5"
      style={{
        maxWidth: "68.75rem",
      }}
    >
      <div
        className="position-relative mx-auto mb-3 px-2 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">Income Statement Events</h1>
      </div>
      <Filter
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        setParams={setParams}
        setCurrentPage={setCurrentPage}
      />
      {loading && <Loader />}
      {!incomeEvent?.length && <VisualNoData />}
      {!loading && !!incomeEvent?.length && (
        <>
          <table
            className="table customTable w-100"
            style={{ fontSize: "14px" }}
          >
            <colgroup>
              <col span="1" style={{ width: "35%" }} />
              <col span="1" style={{ width: "18%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-truncate">Name</th>
                <th className="text-truncate">Stock</th>
                <th className="text-truncate">Ends in</th>
                <th className="text-truncate"></th>
              </tr>
            </thead>
            {incomeEvent?.length > 0 && (
              <tbody>
                {incomeEvent?.map((incomeEvent, idx) => (
                  <tr key={idx}>
                    <td
                      scope="row"
                      style={{
                        width: "50%",
                      }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{
                          gap: "0.5rem",
                        }}
                      >
                        <p className="text-truncate m-0">{incomeEvent?.name}</p>
                        {incomeEvent?.subscriber.find(
                          (v) => v.userId === userId
                        ) && (
                          <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "rgba(0, 134, 0, 0.11)",
                              color: "#008600",
                              fontSize: "0.625rem",
                              lineHeight: "0.75rem",
                              padding: "0.25rem",
                              borderRadius: "0.375rem",
                              height: "1.25rem",
                            }}
                          >
                            Submitted
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-truncate">
                      {incomeEvent?.stockSymbol}
                    </td>
                    <td
                      className={
                        "text-truncate" +
                        (new Date(incomeEvent?.endDate).getTime() < Date.now()
                          ? " text-danger"
                          : "")
                      }
                    >
                      {new Date(incomeEvent?.endDate).toLocaleDateString()}
                    </td>
                    <td
                      className="text-truncate d-flex align-items-end justify-content-end"
                      style={{
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        onClick={() => {
                          history.push(
                            `/view/incomestatement/event/${incomeEvent?._id}/${incomeEvent?.stockSymbol}`
                          );
                        }}
                        style={{
                          padding: "0.3125rem 0.625rem",
                          borderRadius: "999px",
                          backgroundColor: "#FFF7EE",
                          color: "#F88700",
                          outline: "1px solid #F88700",
                          cursor: "pointer",
                        }}
                      >
                        {"View More ->"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </>
      )}
    </CContainer>
  );
}

export default ViewAllStatements;
