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

const MultiFactorQuantModel = ({ data }) => {
  const top_ranked_stocks_columns = [
    { field: "Symbol", headerName: "Symbol", width: 200 },
    { field: "Final Score", headerName: "Final Score", width: 200 },
  ];
  const portfolio_weights_columns = [
    { field: "Symbol", headerName: "Symbol", width: 200 },
    { field: "Weight", headerName: "Weight", width: 200 },
  ];
  return (
    <Box p={2}>
      <StockTable
        title="Top Ranked Stocks"
        data={data?.["top_ranked_stocks"]}
        columns={top_ranked_stocks_columns}
      />
      <StockTable
        title="Optimized Portfolio Weights"
        data={data?.["portfolio_weights"]}
        columns={portfolio_weights_columns}
      />
    </Box>
  );
};

export default MultiFactorQuantModel;
