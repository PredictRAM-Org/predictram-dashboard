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
import { useEffect } from "react";

export default function CustomScrapperTable({ column, data }) {
  useEffect(() => {}, [data]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {column &&
              Object.keys(column)?.map((headerName, index) => (
                <TableCell sx={{ fontWeight: "bold" }} key={index} align="left">
                  {headerName}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {row &&
                Object.values(row).map((value, index) => (
                  <TableCell key={index} align="left">
                    {value}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
