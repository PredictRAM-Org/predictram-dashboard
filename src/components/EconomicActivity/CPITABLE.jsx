import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import "../../assets/css/CPITable.css";
import Loader from "../../views/pages/users/Loader";
import { getCpi } from "../../api/services/EconomicActivityService";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);

  //Fetching CPI Data from Backend:
  const fetchCPIData = async () => {
    const data = await getCpi(
      setLoading,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor",
    );
    console.log(data);
    setRows(data);
  };

  useEffect(() => {
    fetchCPIData();
  }, []);

  return (
    <TableContainer className="maintable">
      {loading && <Loader />}

      {!loading && (
        <Table sx={{ minWidth: 1700 }} aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{
                backgroundImage: "linear-gradient(to right,#7569fa,#c978f5)",
              }}
            >
              <StyledTableCell
                id="commoditydesc"
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Commodity Description
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Month
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Provsional/Final
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Rural(Current Month)
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Rural(Inflation Y-o-Y)
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Urban(Current Month)
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Urban(Inflation Y-o-Y)
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Combined(Current Month)
              </StyledTableCell>
              <StyledTableCell
                id="combined"
                sx={{ minWidth: 50, fontSize: 14 }}
                align="center"
              >
                Combined(Inflation Y-o-Y)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.month}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.month}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.commoditydescription}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.provisional_final}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.rural_current_month}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.rural_inflation_y_o_y}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.urban_current_month}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.urban_inflation_y_o_y}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.combined_current_month}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.combined_inflation_y_o_y}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
