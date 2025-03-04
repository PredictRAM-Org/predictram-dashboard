import { useState } from "react";
import { CContainer, CLink } from "@coreui/react";
import { gerZohoAdvisorySessions } from "../../../../api/services/Investors/InvestorEventService";
import VisualNoData from "../../../../utils/VisualNoData";
import { useSelector } from "react-redux";
import Loader from "../../users/Loader";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { fetchAppointment } from "../../../../api/services/InvestorService";
import { useQuery } from "@tanstack/react-query";
import TabularNav from "../../../../components/TabularNav";

export default function InvestorAdvisorySessions() {
  const {
    _id: investorId,
    mobileNumber,
    secretToken,
  } = useSelector((state) => state.investor);

  const options = ["Upcoming Sessions", "Past Sessions"];
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState(0);

  const handleViewState = (state) => {
    setViewState(state);
  };

  const { data: appointments, isLoading } = useQuery({
    queryKey: "sessions",
    queryFn: async () => {
      const { data } = await gerZohoAdvisorySessions(
        setLoading,
        { investorId: investorId },
        { secretToken, mobileNumber }
      );
      return data;
    },
    enabled: !!investorId,
    staleTime: 60000 * 2,
  });

  const { data: sessions, isLoading2 } = useQuery({
    queryKey: "sessionData",
    queryFn: async () => {
      return await Promise.all(
        appointments.map(async (session) => {
          const bookingId = session.booking_id;
          const { data } = await fetchAppointment(setLoading, {
            booking_id: bookingId,
          });
          return data;
        })
      );
    },
    enabled: !!appointments?.length,
    staleTime: 60000 * 2,
  });

  const currentDate = new Date();
  const filteredSessions = (() => {
    if (viewState === 0) {
      // Show current and future sessions
      return sessions
        ?.filter((session) => {
          const sessionStartTime = new Date(session.iso_start_time);
          return sessionStartTime >= currentDate;
        })
        .sort((sessionA, sessionB) => {
          const startTimeA = new Date(sessionA.iso_start_time);
          const startTimeB = new Date(sessionB.iso_start_time);
          return startTimeA - startTimeB;
        });
    } else if (viewState === 1) {
      // Show past sessions
      return sessions
        ?.filter((session) => {
          const sessionStartTime = new Date(session.iso_start_time);
          return sessionStartTime < currentDate;
        })
        .sort((sessionA, sessionB) => {
          const startTimeA = new Date(sessionA.iso_start_time);
          const startTimeB = new Date(sessionB.iso_start_time);
          return startTimeB - startTimeA;
        });
    }
    return [];
  })();

  return (
    <>
      <CContainer
        fluid
        className="mb-5"
        style={{
          maxWidth: "90rem",
        }}
      >
        <div
          className="position-relative mx-auto mb-3 px-2 d-flex align-items-center justify-content-center"
          style={{ width: "fit-content" }}
        >
          <h1 className="text-center m-0">Booked Advisory Sessions</h1>
        </div>
        {isLoading || isLoading2 || loading ? <Loader /> : null}
        {filteredSessions?.length === 0 &&
          !isLoading &&
          !isLoading2 &&
          !loading && <VisualNoData />}
        {!isLoading &&
          !isLoading2 &&
          !loading &&
          filteredSessions?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TabularNav
                options={options}
                state={viewState}
                handleState={handleViewState}
              />
              <Grid container spacing={2} justifyItems="center">
                {filteredSessions?.length === 0 && <VisualNoData />}
                {filteredSessions.length > 0 &&
                  filteredSessions.map((session, idx) => (
                    <Grid item xs={12} sm={6} lg={4} key={idx}>
                      <Card>
                        <CardContent sx={{ p: 0 }}>
                          <Box style={{ background: "#d9d9d9" }} sx={{ p: 2 }}>
                            <Typography
                              color="#727E8C"
                              fontWeight="fontWeightBold"
                              variant="h6"
                            >
                              Booking ID
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{ fontWeight: "700", color: "#48607c" }}
                            >
                              {session?.booking_id}
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Typography
                              color="#727E8C"
                              fontWeight="fontWeightBold"
                              variant="h6"
                            >
                              Advisor Name
                            </Typography>
                            <Typography
                              color="#5A8DEE"
                              fontWeight="fontWeightBold"
                              variant="h4"
                            >
                              {session?.staff_name}
                            </Typography>
                            <Typography
                              color="#727E8C"
                              fontWeight="fontWeightBold"
                              variant="h6"
                            >
                              Status
                            </Typography>
                            <Typography
                              color={
                                session?.status === "cancel"
                                  ? "#F10808"
                                  : "#5A8DEE"
                              }
                              fontWeight="fontWeightBold"
                              variant="h4"
                            >
                              {session?.status === "cancel"
                                ? "cancelled"
                                : session?.status === "yet_to_mark"
                                ? "Yet to mark"
                                : session?.status}
                            </Typography>
                            <Typography
                              color="#727E8C"
                              fontWeight="fontWeightBold"
                              variant="h6"
                            >
                              Session Date
                            </Typography>
                            <Typography
                              color="#5A8DEE"
                              fontWeight="fontWeightBold"
                              variant="h4"
                            >
                              {new Date(session?.start_time).toDateString()}
                            </Typography>
                            <Typography
                              color="#727E8C"
                              fontWeight="fontWeightBold"
                              variant="h6"
                            >
                              Session Time
                            </Typography>
                            <Typography
                              color="#5A8DEE"
                              fontWeight="fontWeightBold"
                              variant="h4"
                            >
                              {new Date(session?.start_time).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            sx={{ px: 2 }}
                          >
                            <CLink
                              className="text-decoration-none"
                              href={session?.summary_url}
                              target="_blank"
                            >
                              <Button
                                sx={{ fontWeight: "bold", py: 1 }}
                                size="large"
                                variant="contained"
                              >
                                More Options
                              </Button>
                            </CLink>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
          )}
      </CContainer>
    </>
  );
}
