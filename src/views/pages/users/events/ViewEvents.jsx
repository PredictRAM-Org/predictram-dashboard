import { useEffect, useState } from "react";
import { CContainer, CPagination, CPaginationItem } from "@coreui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import EventFilter from "./EventFilter";
import Loader from "../Loader";
import VisualNoData from "../../../../utils/VisualNoData";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { cancelFreePremiumMembership } from "../../../../api/services/PaymentService";
import { apiGetByParams } from "../../../../api/BaseAPICaller";
import {
  getLocalDate,
  getLocalDateTime,
} from "../../../../utils/DateTimeService";

const ROWS_PER_PAGE = 20;

export default function ViewEvents() {
  const {
    id: userId,
    triedFreePremium: isTriedPremium,
    expiry: expiryDate,
    role,
    premiumUser,
  } = useSelector((state) => state.user);

  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState();
  const [params, setParams] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getEvents = async (params) => {
    try {
      const data = await apiGetByParams(
        setLoading,
        `/api/users/${isSubmitted ? "viewsubmittedevents" : "getevents"}`,
        { ...params, isPublic: role === "USER" }
      );
      setHasData(data.events.length);
      setEvents(data.events);
    } catch (error) {
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents(params);
  }, [params, isSubmitted]);

  const cancelPremiumMembership = async () => {
    await cancelFreePremiumMembership(setLoading, userId);
    history.go(0);
  };

  useEffect(() => {
    const _expiryDate = new Date(expiryDate).valueOf();
    const _currentDate = new Date().valueOf();
    if (_currentDate >= _expiryDate && !isTriedPremium) {
      cancelPremiumMembership();
    }
  }, []);

  const handleRedirect = (url) => {
    history.push(url);
  };

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
        <h1 className="text-center m-0">Events</h1>
      </div>
      <div>
        <EventFilter
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setParams={setParams}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {hasData === 0 && <VisualNoData />}
      {loading && <Loader />}
      {!loading && hasData > 0 && (
        <>
          {/* <table
            className="table customTable w-100"
            style={{ fontSize: "14px" }}
          >
            <colgroup>
              <col span="1" style={{ width: "30%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "10%" }} />
              <col span="1" style={{ width: "12%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-truncate">Name</th>
                <th className="text-truncate">Last value</th>
                <th className="text-truncate">Previous value</th>
                <th className="text-truncate">Ends in</th>
                <th className="text-truncate"></th>
              </tr>
            </thead>
            <tbody>
              {events
                .slice(
                  currentPage * ROWS_PER_PAGE,
                  (currentPage + 1) * ROWS_PER_PAGE
                )
                .map((event, idx) => (
                  <tr key={idx}>
                    <td
                      scope="row"
                      style={{
                        width: "50%",
                      }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{
                          gap: "0.5rem",
                        }}
                      >
                        <p className="text-truncate m-0">{event.name}</p>
                        {event.subscriber.length > 0 && (
                          <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "rgba(0, 134, 0, 0.11)",
                              color: "#008600",
                              fontSize: "0.625rem",
                              lineHeight: "0.75rem",
                              padding: "0.25rem",
                              borderRadius: "0.375rem",
                              height: "1.25rem",
                            }}
                          >
                            Submitted
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-truncate">{event.lastvalue}</td>
                    <td className="text-truncate">{event.previousvalue}</td>
                    <td
                      className={
                        "text-truncate" +
                        (new Date(event.enddate).getTime() < Date.now()
                          ? " text-danger"
                          : "")
                      }
                    >
                      {getLocalDateTime(event.enddate)}
                    </td>
                    <td
                      className="text-truncate d-flex align-items-end justify-content-end"
                      style={{
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        onClick={() =>
                          handleRedirect(`eventdetails/${event._id}`)
                        }
                        style={{
                          padding: "0.3125rem 0.625rem",
                          borderRadius: "999px",
                          backgroundColor: "#FFF7EE",
                          color: "#F88700",
                          outline: "1px solid #F88700",
                          cursor: "pointer",
                        }}
                      >
                        {"View More ->"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table> */}
          <TableContainer sx={{ mt: 1 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Last value</TableCell>
                  <TableCell>Previous value</TableCell>
                  <TableCell>Ends in</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events
                  .slice(
                    currentPage * ROWS_PER_PAGE,
                    (currentPage + 1) * ROWS_PER_PAGE
                  )
                  .map((event, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {event.name}
                        {event.subscriber.length > 0 && (
                          <span
                            style={{
                              backgroundColor: "rgba(0, 134, 0, 0.11)",
                              color: "#008600",
                              fontSize: "0.625rem",
                              lineHeight: "0.75rem",
                              padding: "0.25rem",
                              borderRadius: "0.375rem",
                              height: "1.25rem",
                            }}
                          >
                            Submitted
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{event.lastvalue}</TableCell>
                      <TableCell>{event.previousvalue}</TableCell>
                      <TableCell>{getLocalDate(event.enddate)}</TableCell>
                      <TableCell align="right">
                        <div
                          onClick={() =>
                            handleRedirect(`eventdetails/${event._id}`)
                          }
                          style={{
                            padding: "0.3125rem 0.625rem",
                            borderRadius: "999px",
                            backgroundColor: "#FFF7EE",
                            color: "#F88700",
                            outline: "1px solid #F88700",
                            cursor: "pointer",
                          }}
                        >
                          {"View More ->"}
                        </div>
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
