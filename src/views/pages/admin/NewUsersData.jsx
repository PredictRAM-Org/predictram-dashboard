import { useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import LoadingPage from "../../../utils/LoadingPage";
import { CContainer, CPagination, CPaginationItem } from "@coreui/react";
import VisualNoData from "../../../utils/VisualNoData";
import { useEffect } from "react";
import { apiGet, apiGetByParams } from "../../../api/BaseAPICaller";
import { toast } from "react-toastify";
import UserFilter from "./UserFilter";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../users/Loader";
import { getLocalDate } from "../../../utils/DateTimeService";

const ROWS_PER_PAGE = 20;

const date = new Date();
date.setMonth(date.getMonth() - 1);

export default function NewUsersData() {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState();
  const [params, setParams] = useState({
    fromTime: date,
    toTime: new Date(),
  });
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isInvestor, setIsInvestor] = useState(false);

  const getNewUsers = async (params) => {
    try {
      const { data } = await apiGetByParams(
        setLoading,
        `/api/admin/get/registered/${isInvestor ? "investors" : "users"}`,
        { ...params }
      );
      setHasData(data.length ?? 0);
      setUsers(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewUsers(params);
  }, [params, isInvestor, currentPage]);

  return (
    <CContainer
      fluid
      className="mb-5"
      style={{
        maxWidth: "68.75rem",
      }}
    >
      <div
        className="position-relative mx-auto mb-3 px-2 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">New Users</h1>
      </div>
      <div>
        <UserFilter
          isInvestor={isInvestor}
          setIsInvestor={setIsInvestor}
          setParams={setParams}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {hasData === 0 && <VisualNoData />}
      {loading && <Loader />}
      {!loading && hasData > 0 && (
        <>
          <TableContainer sx={{ mb: 2 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(
                    currentPage * ROWS_PER_PAGE,
                    (currentPage + 1) * ROWS_PER_PAGE
                  )
                  .map((user) => (
                    <TableRow
                      key={user?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {isInvestor
                          ? user.firstName + " " + user.lastName
                          : user.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {user?.email}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {isInvestor ? user.mobileNumber : user.phone}
                      </TableCell>
                      <TableCell align="right">
                        {/* {new Date(user?.createdAt).toLocaleDateString()} */}
                        {getLocalDate(user?.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CPagination
            aria-label="Page navigation example"
            style={{
              margin: "0 auto",
              width: "fit-content",
              marginTop: "2rem",
            }}
          >
            <CPaginationItem
              aria-label="Previous"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            {new Array(Math.ceil(hasData / ROWS_PER_PAGE))
              .fill(0)
              .map((_, idx) => (
                <CPaginationItem
                  key={idx}
                  active={idx === currentPage}
                  onClick={() => setCurrentPage(idx)}
                  style={{ cursor: "pointer" }}
                >
                  {idx + 1}
                </CPaginationItem>
              ))}
            <CPaginationItem
              aria-label="Next"
              disabled={currentPage === Math.ceil(hasData / ROWS_PER_PAGE) - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </>
      )}
    </CContainer>
  );
}
