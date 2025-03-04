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
import "../../assets/css/GVATable.css";
import Loader from "../../views/pages/users/Loader";
import { getGva } from "../../api/services/EconomicActivityService";
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
  const [gvarows, setGvaRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: investorId } = useSelector((state) => state.investor);

  //Fetching GVA Data from Backend:
  const fetchIOIPTable1Data = async () => {
    const data = await getGva(
      setLoading,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor",
    );
    setGvaRows(data);
  };

  useEffect(() => {
    fetchIOIPTable1Data();
  }, []);

  return (
    <TableContainer className="maintable">
      {loading && <Loader />}

      {!loading && (
        <Table sx={{ minWidth: 2500 }} aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{
                backgroundImage: "linear-gradient(to right,#7569fa,#c978f5)",
              }}
            >
              <StyledTableCell
                id="1950-51"
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                Serial No
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 200, fontSize: 14 }}
                align="center"
              >
                Economic Activity
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1950-51
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1951-52
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1952-53
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1953-54
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1954-55
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1955-56
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1956-57
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1957-58
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1958-59
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1959-60
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1960-61
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1961-62
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1962-63
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1963-64
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1964-65
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1965-66
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1966-67
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1967-68
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1968-69
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1969-70
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1970-71
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1971-72
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1972-73
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1973-74
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1974-75
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1975-76
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1976-77
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1977-78
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1978-79
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1979-80
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1980-81
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1981-82
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1982-83
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1983-84
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1984-85
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1985-86
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1986-87
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1987-88
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1988-89
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1989-90
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1990-91
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1991-92
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1992-93
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1993-94
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1994-95
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1995-96
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1996-97
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1997-98
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1998-99
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                1999-00
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2000-01
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2001-02
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2002-03
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2003-04
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2004-05
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2005-06
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2006-07
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2007-08
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2008-09
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2009-10
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2010-11
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2011-12
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2012-13
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2013-14
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2014-15
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2015-16
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2016-17
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2017-18
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2018-19
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, fontSize: 14 }}
                align="center"
              >
                2019-20
              </StyledTableCell>
              <StyledTableCell
                id="2020-21"
                sx={{ minWidth: 60, fontSize: 14 }}
                align="center"
              >
                2020-21
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gvarows.map((row) => (
              <StyledTableRow key={row.month}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.serial_no}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.economic_activity}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1950_51"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1951_52"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1952_53"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1953_54"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1954_55"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1955_56"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1956_57"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1957_58"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1958_59"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1959_60"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1960_61"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1961_62"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1962_63"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1963_64"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1964_65"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1965_66"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1966_67"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1967_68"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1968_69"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1969_70"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1970_71"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1971_72"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1972_73"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1973_74"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1974_75"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1975_76"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1976_77"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1977_78"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1978_79"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1979_80"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1980_81"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1981_82"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1982_83"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1983_84"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1984_85"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1985_86"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1986_87"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1987_88"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1988_89"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1989_90"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1990_91"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1991_92"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1992_93"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1993_94"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1994_95"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1995_96"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1996_97"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1997_98"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1998_99"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["1999_00"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2000_01"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2001_02"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2002_03"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2003_04"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2004_05"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2005_06"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2006_07"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2007_08"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2008_09"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2009_10"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2010_11"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row["2011_12"]}
                </StyledTableCell>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
