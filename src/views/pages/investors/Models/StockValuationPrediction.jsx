import React from "react";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StockValuationPrediction = ({ data }) => {
  if (!data) return null;

  const {
    symbol,
    financials,
    valuation_analysis,
    valuation_prediction,
    price_history,
  } = data;

  // Convert financials to array
  const financialMetrics = Object.entries(financials || {});

  // Prepare chart data from price_history.Close
  const chartData = Object.entries(price_history?.Close || {})?.map(
    ([date, close]) => ({
      date: date?.split("T")[0],
      close,
    })
  );

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Financial Metrics for {symbol}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financialMetrics?.map(([metric, value]) => (
                  <TableRow key={metric}>
                    <TableCell>{metric}</TableCell>
                    <TableCell align="right">{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Historical Stock Data
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="close" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Valuation Analysis for {symbol}
        </Typography>
        {(valuation_analysis || []).map((line, index) => (
          <Alert key={index} severity="info" sx={{ mb: 1 }}>
            {line}
          </Alert>
        ))}
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Predicting Valuation Shift for {symbol}
        </Typography>
        {(valuation_prediction || []).length > 0 ? (
          valuation_prediction?.map((line, index) => (
            <Alert key={index} severity="success" sx={{ mb: 1 }}>
              {line}
            </Alert>
          ))
        ) : (
          <Typography>No prediction data available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StockValuationPrediction;
