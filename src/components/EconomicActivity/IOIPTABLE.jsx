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
import "../../assets/css/IOIPTable.css";
import Loader from "../../views/pages/users/Loader";
import { useSelector } from "react-redux";
import { getIOIP1 } from "../../api/services/EconomicActivityService";

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
  const [ioiprows, setIoipRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);

  //Fetching IOIP Data from Backend:
  const fetchIOIPTable1Data = async () => {
    const data = await getIOIP1(
      setLoading,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
    setIoipRows(data);
  };

  useEffect(() => {
    fetchIOIPTable1Data();
  }, []);

  return (
    <TableContainer className="maintable">
      {loading && <Loader />}
      {!loading && (
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{
                backgroundImage: "linear-gradient(to right,#7569fa,#c978f5)",
              }}
            >
              <StyledTableCell
                sx={{ minWidth: 10, fontSize: 13 }}
                align="center"
              >
                Use Based Category
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                Weight
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2012-13
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2013-14
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2014-15
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2015-16
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2016-17
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2017-18
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2018-19
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2019-20
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2020-21
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 35, fontSize: 13 }}
                align="center"
              >
                2021-22
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ioiprows.map((row) => (
              <StyledTableRow key={row.month}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.use_basd_category}
                </StyledTableCell>
                <StyledTableCell align="center">{row.weight}</StyledTableCell>
                <StyledTableCell align="center">
                  {row["2012_13"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2013_14"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2014_15"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2015_16"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2016_17"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2017_18"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2018_19"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2019_20"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2020_21"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2021_22"]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
