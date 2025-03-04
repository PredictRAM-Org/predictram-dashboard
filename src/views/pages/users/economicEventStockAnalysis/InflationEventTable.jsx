import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useStockAnalysis } from "../../../../contexts/StockAnalysisContext";
import { formatKey, formatValue } from "../../../../utils/utils";

export default function InflationEventTable() {
  const { stockData } = useStockAnalysis();

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400, overflowX: "auto" }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {/* Assuming all stocks have the same structure, we use the keys from the first object */}
            {stockData?.length > 0 &&
              Object.keys(stockData[0]).map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    whiteSpace: "nowrap",
                    backgroundColor: "background.paper",
                  }}
                >
                  {formatKey(key)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stockData?.map((stock, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(stock).map((value, colIndex) => (
                <TableCell key={colIndex}>{formatValue(value)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
