import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CSmartPagination } from "@coreui/react-pro";
import Loader from "../users/Loader";
import { getInvestorEvents } from "../../../api/services/Investors/InvestorEventService";
import { useSelector } from "react-redux";
import VisualNoData from "../../../utils/VisualNoData";
import { useHistory } from "react-router-dom";
import { CCard, CCardBody, CContainer } from "@coreui/react";
import { useQuery } from "@tanstack/react-query";

function InvestorViewEventsWidget() {
  const history = useHistory();
  const { mobileNumber, secretToken } = useSelector((state) => state.investor);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data: { totalEvents, events } = {}, isLoading } = useQuery({
    queryKey: ["investorDashboardViewEvent", activePage],
    queryFn: async () => {
      const {
        data: { investorEvent, totalEvents },
      } = await getInvestorEvents(
        setLoading,
        { count: activePage, ended: false },
        { mobileNumber, secretToken }
      );
      return { totalEvents, events: investorEvent };
    },

    enabled: !!mobileNumber && !!secretToken,
    staleTime: 60000 * 2,
  });

  const handleRedirect = (url) => {
    history.push(url);
  };

  const handleRedirectWebLink = (url) => {
    window.location.href = url;
  };

  return (
    <CContainer fluid>
      <CCard>
        <CCardBody>
          <h3 className="text-center">Event Analysis</h3>
          {isLoading && <Loader />}
          {!isLoading && totalEvents > 0 && (
            <>
              {events?.length === 0 && <VisualNoData />}
              {events?.length > 0 && (
                <TableContainer sx={{ mb: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          Start Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          End Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                          Detailed Report
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          More Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow
                          key={event?.eventId?.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {event?.eventId?.name}
                          </TableCell>
                          <TableCell align="right">
                            {new Date(event?.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell
                            className={
                              "text-truncate" +
                              (new Date(event.endDate).getTime() < Date.now()
                                ? " text-danger"
                                : "")
                            }
                            align="right"
                          >
                            {new Date(event.endDate).toLocaleDateString()}
                          </TableCell>
                          {event?.eventId?.file ? (
                            <TableCell align="center">
                              <button
                                onClick={() =>
                                  handleRedirectWebLink(event?.eventId?.file)
                                }
                                style={{
                                  padding: "0.5rem 1rem",
                                  borderRadius: "0.5rem",
                                  backgroundColor: "#f0f0f0",
                                  color: "#4c94d6",
                                  border: "1px solid #4c94d6",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                View Report
                              </button>
                            </TableCell>
                          ) : (
                            <TableCell align="right">No report found</TableCell>
                          )}
                          <TableCell align="right">
                            <button
                              onClick={() =>
                                handleRedirect(`/investor/events/${event._id}`)
                              }
                              style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.5rem",
                                backgroundColor: "#FFF7EE",
                                color: "#F88700",
                                border: "1px solid #F88700",
                                cursor: "pointer",
                                textAlign: "center",
                                fontWeight: "bold",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              View More
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CSmartPagination
                  size="sm"
                  activePage={activePage}
                  limit={10}
                  pages={Math.ceil(totalEvents / 10) || 1}
                  onActivePageChange={setActivePage}
                />
              </div>
            </>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default InvestorViewEventsWidget;
