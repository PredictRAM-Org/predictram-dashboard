import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Divider,
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const renderKeyValuePairs = (obj) => (
  <Table size="small">
    <TableBody>
      {Object.entries(obj).map(([key, value]) => (
        <TableRow key={key}>
          <TableCell sx={{ padding: "4px" }}>
            {new Date(key).toLocaleDateString()}
          </TableCell>
          <TableCell sx={{ padding: "4px" }}>
            {value?.toLocaleString?.() ?? "N/A"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const renderLine = (label, value) => (
  <Grid item xs={6} sm={4} md={3} key={label}>
    <Typography variant="caption" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body2">
      {typeof value === "number" ? value.toLocaleString() : value ?? "N/A"}
    </Typography>
  </Grid>
);

const StockDividendPrediction = ({ data }) => {
  if (!data) return null;

  return (
    <Box>
      {data?.map((item, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{item?.Ticker}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" sx={{ my: 1, p: 1 }} key={index}>
              <CardContent sx={{ padding: "8px" }}>
                <Typography variant="h5" gutterBottom>
                  {item?.Ticker}
                </Typography>

                <Grid container spacing={1}>
                  {renderLine("Close", item?.["Latest Close Price"])}
                  {renderLine("EPS", item?.EPS)}
                  {renderLine(
                    "Rev Growth",
                    item?.["Revenue Growth"] !== null
                      ? `${(item?.["Revenue Growth"] * 100).toFixed(2)}%`
                      : "N/A"
                  )}
                  {renderLine("D/E", item?.["Debt-to-Equity Ratio"])}
                  {renderLine("Working Cap", item?.["Working Capital"])}
                  {renderLine(
                    "Yield %",
                    item?.["Dividend Yield"]
                      ? (item?.["Dividend Yield"] * 100).toFixed(2)
                      : "N/A"
                  )}
                  {renderLine(
                    "Dividend %",
                    item?.["Dividend Percentage"]?.toFixed(2)
                  )}
                  {renderLine("Next Dividend", item?.["Next Dividend Date"])}
                  {renderLine(
                    "Predicted Dividend",
                    item?.["Predicted Dividend Amount"]
                  )}
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body1">Past Dividends</Typography>

                {item?.["Past Dividends"]?.length > 0 && (
                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                    {item["Past Dividends"].map((d, idx) => (
                      <Chip
                        key={idx}
                        label={`₹${d}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                )}

                {item?.["Net Income"] && (
                  <Box mt={1}>
                    <Typography variant="body1">Net Income</Typography>
                    {renderKeyValuePairs(item["Net Income"])}
                  </Box>
                )}
                {item?.["Operating Income"] && (
                  <Box mt={1}>
                    <Typography variant="body1">Operating Income</Typography>
                    {renderKeyValuePairs(item["Operating Income"])}
                  </Box>
                )}
                {item?.["Free Cash Flow"] && (
                  <Box mt={1}>
                    <Typography variant="body1">Free Cash Flow</Typography>
                    {renderKeyValuePairs(item["Free Cash Flow"])}
                  </Box>
                )}
                {item?.["Retained Earnings"] && (
                  <Box mt={1}>
                    <Typography variant="body1">Retained Earnings</Typography>
                    {renderKeyValuePairs(item["Retained Earnings"])}
                  </Box>
                )}
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default StockDividendPrediction;
