import { Box, Typography } from "@mui/material";
import React from "react";
// import { useThemeContext } from "../contexts/ThemeProvider";
import { useStockAnalysis } from "../../../../contexts/StockAnalysisContext";

import Result from "./Result";
import LoadingOverlay from "./LoadingScreen";

const ResultInterface = () => {
  // const { mode } = useThemeContext();
  const { analysisResult, loading } = useStockAnalysis();
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "palette.background.default",
        left: {
          xs: 0,
          md: 0,
          lg: 0,
          xl: "80px",
        },
        display: "flex",
        flexDirection: "column",
        pr: {
          xs: 6,
          md: 6,
          lg: 12,
          xl: 12,
        },
        pl: {
          xs: 6,
          md: 6,
          lg: "360px",
          xl: "360px",
        },
        pt: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: "48px",
          fontFamily: "Poppins",
          // color: mode === "dark" ? "white" : "#9b82e1",
          color: "#9b82e1",
          mb: 2,
        }}
      >
        Stock Analysis Based on Economic Events
      </Typography>
      {loading && <LoadingOverlay isLoading={loading} />}
      {analysisResult && <Result />}
      {!analysisResult && (
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            fontFamily: "Poppins",
            // color: mode === "dark" ? "white" : "#9b82e1",
            color: "#9b82e1",
            mb: 2,
          }}
        >
          Use the sidebar to analyze stock!
        </Typography>
      )}
    </Box>
  );
};

export default ResultInterface;
