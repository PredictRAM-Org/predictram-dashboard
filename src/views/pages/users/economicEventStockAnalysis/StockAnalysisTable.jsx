import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { useStockAnalysis } from "../../../../contexts/StockAnalysisContext";
import { formatNumber } from "../../../../utils/utils";

export default function StockAnalysisTable() {
  const { analysisResult } = useStockAnalysis();

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {analysisResult.results.map((stock) => (
        <>
          <Typography
            variant="p"
            sx={{ fontSize: "20px", fontWeight: "600", my: "50" }}
          >
            {stock.stock_symbol}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {Object.keys(stock.projections[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        whiteSpace: "nowrap",
                        backgroundColor: "background.paper",
                        fontWeight: "bold",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.projections.map((row) => (
                  <TableRow key={row.SlNo}>
                    {Object.entries(row).map(([key, value]) => (
                      <TableCell key={key} sx={{ whiteSpace: "nowrap" }}>
                        {key === "SlNo" || key === "Date"
                          ? value
                          : formatNumber(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </Box>
  );
}
