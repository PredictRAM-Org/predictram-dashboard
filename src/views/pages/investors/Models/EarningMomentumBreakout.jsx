import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StockTable = ({ title, data, columns }) => {
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
          getRowId={(row) => row.Symbol}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

const EarningMomentumBreakout = ({ data }) => {
  const pre_earnings_picks_columns = [
    { field: "Symbol", headerName: "Symbol", width: 150 },
    {
      field: "Next Earnings Date",
      headerName: "Next Earnings Date",
      width: 150,
    },
    {
      field: "Breakout Probability %",
      headerName: "Breakout Probability %",
      width: 150,
    },
    {
      field: "Position Size",
      headerName: "Position Size",
      width: 150,
    },
  ];
  const entry_exit_plan_columns = [
    { field: "Symbol", headerName: "Symbol", width: 150 },
    {
      field: "Breakout Probability %",
      headerName: "Breakout Probability %",
      width: 150,
    },
    {
      field: "Entry Point",
      headerName: "Entry Point",
      width: 150,
    },
    {
      field: "Exit Point",
      headerName: "Exit Point",
      width: 150,
    },
  ];
  return (
    <Box p={2}>
      <StockTable
        title="Pre-Earnings Stock Picks"
        data={data?.["pre_earnings_picks"]}
        columns={pre_earnings_picks_columns}
      />
      <StockTable
        title="Entry/Exit Points"
        data={data?.["entry_exit_plan"]}
        columns={entry_exit_plan_columns}
      />
    </Box>
  );
};

export default EarningMomentumBreakout;
