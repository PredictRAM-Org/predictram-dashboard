import { CContainer } from "@coreui/react";
import React, { useState } from "react";
import Filter from "./Filter";
import { getIncomeStatementEvent } from "../../../../api/services/IncomeStatementService";
import { useSelector } from "react-redux";
import VisualNoData from "../../../../utils/VisualNoData";
import { useHistory } from "react-router-dom";
import Loader from "../../users/Loader";
import { useQuery } from "@tanstack/react-query";

function ViewAllInvestorStatements() {
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const [currentPage, setCurrentPage] = useState(0);
  const [params, setParams] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { _id: investorId } = useSelector((state) => state.investor);
  const history = useHistory();

  const { data: incomeEvent = [], isLoading } = useQuery({
    queryKey: ["incomeSatementEvent", params],
    queryFn: async () => {
      const { data } = await getIncomeStatementEvent(
        setLoading,
        params,
        {
          secretToken,
          mobileNumber,
        },
        "investor"
      );
      return data;
    },
    staleTime: 60000 * 2,
  });

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
      {isLoading && <Loader />}
      {!incomeEvent?.length && <VisualNoData />}
      {!isLoading && !!incomeEvent?.length && (
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
                            `/investor/view/incomestatement/event/${incomeEvent?._id}/${incomeEvent?.stockSymbol}`
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

export default ViewAllInvestorStatements;
