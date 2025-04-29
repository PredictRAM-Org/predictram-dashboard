import React from "react";
import { Paper, Typography, Box, Chip, Stack, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StockTable = ({ title, data }) => {
  const columns = [
    { field: "Stock", headerName: "Stock", width: 150 },
    { field: "Current Price", headerName: "Current Price", width: 150 },
    { field: "Entry Level", headerName: "Entry Level", width: 150 },
    { field: "Exit Level", headerName: "Exit Level", width: 150 },
    { field: "Stop Loss", headerName: "Stop Loss", width: 150 },
    { field: "Target Price", headerName: "Target Price", width: 150 },
    { field: "Score", headerName: "Score", width: 100 },
    { field: "RSI", headerName: "RSI", width: 100 },
    { field: "MACD", headerName: "MACD", width: 100 },
    { field: "MACD_Signal", headerName: "MACD Signal", width: 150 },
    { field: "Upper_BB", headerName: "Upper BB", width: 150 },
    { field: "Lower_BB", headerName: "Lower BB", width: 150 },
    { field: "Volatility", headerName: "Volatility", width: 150 },
    { field: "Beta", headerName: "Beta", width: 100 },
    { field: "Volume", headerName: "Volume", width: 150 },
    { field: "SMA_50", headerName: "SMA 50", width: 150 },
    { field: "SMA_200", headerName: "SMA 200", width: 150 },
    { field: "EMA_12", headerName: "EMA 12", width: 150 },
    { field: "EMA_26", headerName: "EMA 26", width: 150 },
    { field: "Average_Volume", headerName: "Average Volume", width: 150 },
    {
      field: "Average_Volume_10d",
      headerName: "Average Volume 10d",
      width: 180,
    },
    {
      field: "Pattern",
      headerName: "Pattern",
      width: 200,
      height: 300,
      renderCell: (params) => renderPatternChips(params.row.Pattern),
    },
    {
      field: "Strength_Percentage",
      headerName: "Strength Percentage",
      width: 200,
    },
    {
      field: "Bullish_Percentage",
      headerName: "Bullish Percentage",
      width: 200,
    },
    {
      field: "Bearish_Percentage",
      headerName: "Bearish Percentage",
      width: 200,
    },
    { field: "Support_Level", headerName: "Support Level", width: 150 },
    { field: "Resistance_Level", headerName: "Resistance Level", width: 150 },
    { field: "PE_Ratio", headerName: "PE Ratio", width: 150 },
    { field: "PB_Ratio", headerName: "PB Ratio", width: 150 },
    {
      field: "Dividend_Payout_Ratio",
      headerName: "Dividend Payout Ratio",
      width: 200,
    },
    { field: "EPS", headerName: "EPS", width: 100 },
    { field: "Debt_to_Equity", headerName: "Debt to Equity", width: 150 },
    { field: "Promoter_Holding", headerName: "Promoter Holding", width: 150 },
  ];

  const renderPatternChips = (patterns) => {
    if (!Array.isArray(patterns)) return null;

    return (
      <Stack
        direction="row"
        alignItems="center"
        // justifyContent="space-evenly"
        spacing={1}
        gap={1}
        flexWrap="wrap"
      >
        {patterns.map(([name, timeframe], index) => (
          <Chip
            key={index}
            label={`${name} (${timeframe})`}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Paper sx={{ width: 600, my: 3 }}>
        <Divider sx={{ mb: 2 }} />
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          pagination
          getRowId={(row) => row.Stock}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

const StockIndicatorAnalysis = ({ data }) => {
  return (
    <Box p={2}>
      <StockTable title="Long Term" data={data?.["Long Term"]} />
      <StockTable title="Medium Term" data={data?.["Medium Term"]} />
      <StockTable title="Short Term" data={data?.["Short Term"]} />
    </Box>
  );
};

export default StockIndicatorAnalysis;
