import { Box, Typography } from "@mui/material";
import React from "react";
import StockAnalysisTable from "./StockAnalysisTable";
import { useStockAnalysis } from "../../../../contexts/StockAnalysisContext";
import InflationEventTable from "./InflationEventTable";

const Result = () => {
  const { analysisResult, formData } = useStockAnalysis();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Typography variant="p" sx={{ fontSize: "24px", fontWeight: "600" }}>
        Details for {formData.stock_symbols}
      </Typography> */}
      <Typography
        variant="p"
        sx={{ fontSize: "24px", fontWeight: "600", my: "16px" }}
      >
        {formData.event_type.label} Event Data
      </Typography>
      <InflationEventTable />
      {/* <Typography
        variant="p"
        sx={{ fontSize: "24px", fontWeight: "600", my: "16px" }}
      >
        Income Statement Data
      </Typography>
      <IncomeStatementTable />
      <Typography
        variant="p"
        sx={{ fontSize: "16px", fontWeight: "600", my: "16px" }}
      >
        Explanation of Calculation Method:{" "}
        {formData.method === "Dynamic"
          ? "Dynamic calculation considers the event coefficient and rate change."
          : "Simple calculation uses the expected rate directly."}
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "24px", fontWeight: "600", my: "16px" }}
      >
        Detailed Income Statement
      </Typography>
      <DetailedStatementTable /> */}
      <Typography
        variant="p"
        sx={{ fontSize: "24px", fontWeight: "600", my: "16px" }}
      >
        Projected Changes Based on Expected {formData.event_type.label}
      </Typography>
      {analysisResult && <StockAnalysisTable />}
      {/* {formData.event_type === "Inflation" ? (
        <>
          <Typography
            variant="p"
            sx={{ fontSize: "24px", fontWeight: "600", my: "6px" }}
          >
            Interpretation of Inflation Event Data
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "16px", fontWeight: "600", my: "6px" }}
          >
            1% Increase in Inflation: {analysisResult.interpretation.Inflation}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="p"
            sx={{ fontSize: "24px", fontWeight: "600", my: "6px" }}
          >
            Interpretation of Interest Rate Event Data
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "16px", fontWeight: "600", my: "6px" }}
          >
            1% Increase in Interest Rate:{" "}
            {analysisResult.interpretation.InterestRate}
          </Typography>
        </>
      )}
      <Typography
        variant="p"
        sx={{ fontSize: "24px", fontWeight: "600", my: "6px" }}
      >
        Interpretation of Income Statement Data
      </Typography> */}
    </Box>
  );
};

export default Result;
