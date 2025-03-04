import { CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  getIncomeStatementEvent,
  getIncomeStatementSummary,
} from "../../../../api/services/IncomeStatementService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../users/Loader";
import { getFundamentalData } from "../../../../api/services/ScrapperService";
import CustomScrapperTable from "../../../../utils/CustomScrapperTable";
import { Box, Typography } from "@mui/material";
import CustomTable from "../../../../utils/CustomTable";
import { CChart } from "@coreui/react-chartjs";
import IncomeStatementChart from "./IncomeStatementChart";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    header: "Total Revenue/Income (Cr)",
    accessor: ({ avg_total_revenue_income }) =>
      avg_total_revenue_income.toFixed(2),
  },
  {
    header: "Total Operating Expense (Cr)",
    accessor: ({ avg_total_operating_expense }) =>
      avg_total_operating_expense.toFixed(2),
  },
  {
    header: "EBITDA (Cr)",
    accessor: ({ avg_EBITDA }) => avg_EBITDA.toFixed(2),
  },
  {
    header: "Net Income (Cr)",
    accessor: ({ avg_net_income }) => avg_net_income.toFixed(2),
  },
  {
    header: "Total Advisor",
    accessor: "totalAdvisor",
  },
];

function InvestorIncomeStatement() {
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const [loading, setLoading] = useState(false);
  const { _id: investorId } = useSelector((state) => state.investor);

  const { id, stock } = useParams();

  const getOwnIncomeStatement = async () => {
    const {
      data: [incomeEventData],
    } = await getIncomeStatementEvent(
      setLoading,
      {
        investorId,
        eventId: id,
      },
      {
        secretToken,
        mobileNumber,
      },
      "investor"
    );
    if (incomeEventData.subscriber) {
      return incomeEventData;
    } else {
      return false;
    }
  };

  const getIncomeStatement = async () => {
    const {
      data: [incomeEventData],
    } = await getIncomeStatementEvent(
      setLoading,
      { eventId: id },
      {
        secretToken,
        mobileNumber,
      },
      "investor"
    );
    if (!incomeEventData) {
      toast.error("Event data not found");
      return false;
    }
    return incomeEvent ?? {};
  };

  const getStockData = async () => {
    const {
      data: [data],
    } = await getFundamentalData(
      setLoading,
      { symbols: stock },
      {
        secretToken,
        mobileNumber,
      },
      "investor"
    );
    return data;
  };

  const getResult = async () => {
    const { data } = await getIncomeStatementSummary(
      setLoading,
      {
        eventId: id,
      },
      {
        secretToken,
        mobileNumber,
      },
      "investor"
    );

    return data;
  };

  const { data: { incomeEvent, stockData, result } = {}, isLoading } = useQuery(
    {
      queryKey: ["incomeSatementEvent", id],
      queryFn: async () => {
        const ownIncomeStatement = await getOwnIncomeStatement();
        let incomeEvent = {};
        if (ownIncomeStatement) {
          incomeEvent = ownIncomeStatement;
        } else {
          incomeEvent = await getIncomeStatement();
          if (incomeEvent === false) return {};
        }

        const stockData = await getStockData();
        const result = await getResult();
        return { incomeEvent, stockData, result };
      },
      staleTime: 60000 * 2,
    }
  );

  return (
    <div
      style={{
        marginBottom: "3rem",
      }}
    >
      {isLoading && <Loader />}

      {!isLoading && (
        <CCardHeader className="mt-3">
          <CCardTitle
            className="p-0 m-0"
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: "#252525",
              textAlign: "center",
            }}
          >
            {incomeEvent?.name}
          </CCardTitle>

          <CCardText
            className="m-0 mt-2"
            style={{
              fontWeight: 500,
              color: "#AFAFB6",
              textAlign: "center",
              fontSize: "1.75rem",
            }}
          >
            {incomeEvent?.stockSymbol}
          </CCardText>
        </CCardHeader>
      )}

      {!isLoading &&
        stockData?.IncomeStatement?.length > 0 &&
        result.length !== 0 && (
          <Box component="div" sx={{ mb: "2em", pl: "1em" }}>
            <IncomeStatementChart
              stockData={stockData}
              predictedValues={result[0]}
            />
            <Typography
              sx={{ fontWeight: "bold", mt: "1em", mb: "0.5em" }}
              variant="h4"
            >
              Predicted Values
            </Typography>
            <CustomTable data={result} columns={columns} />
          </Box>
        )}

      {!isLoading && (
        <>
          <Typography
            sx={{ fontWeight: "bold", mt: "1em", mb: "0.5em" }}
            variant="h4"
          >
            Past Income Statement
          </Typography>
          <CustomScrapperTable
            column={
              stockData?.IncomeStatement?.length > 0 &&
              stockData?.IncomeStatement[0]
            }
            data={stockData?.IncomeStatement}
          />
        </>
      )}
    </div>
  );
}

export default InvestorIncomeStatement;
