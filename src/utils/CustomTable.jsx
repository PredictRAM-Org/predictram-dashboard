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

export default function CustomTable({
  columns,
  data,
  showHead = true,
  tableCellAlign,
  tableHeadAlign,
  maxHeight = 600,
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          {showHead && (
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    key={column?.header}
                    align={tableHeadAlign || "center"}
                  >
                    {column?.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row?.startDate}>
                {columns?.map((column) => {
                  return (
                    <TableCell
                      key={column?.header}
                      align={tableCellAlign || "center"}
                    >
                      {typeof column?.accessor === "function"
                        ? column?.accessor(row)
                        : typeof column?.accessor === "number"
                        ? row[column?.accessor].toFixed(2)
                        : row[column?.accessor]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
