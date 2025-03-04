import { useEffect, useState } from "react";
import { CContainer, CLink, CTooltip } from "@coreui/react";
import { gerAdvisorySessions } from "../../../../api/services/Investors/InvestorEventService";
import VisualNoData from "../../../../utils/VisualNoData";
import { useSelector } from "react-redux";
import Loader from "../../users/Loader";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";

export default function AdvisorySessions() {
  const userId = useSelector((state) => state.user.id);

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  const getSessions = async () => {
    try {
      const { data } = await gerAdvisorySessions(setLoading, {
        bookedFor: userId,
      });
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  function convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "pm" : "am";
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
    return formattedTime;
  }

  return (
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
        <h1 className="text-center m-0">Upcoming Advisory Sessions</h1>
      </div>
      {loading && <Loader />}
      {sessions?.length === 0 && !loading && <VisualNoData />}
      {!loading && sessions?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} justifyItems="center">
            {sessions?.length === 0 && <VisualNoData />}
            {sessions.length > 0 &&
              sessions.map((session) => (
                <Grid item xs={12} sm={6} lg={4}>
                  <Card>
                    <CardContent sx={{ p: 0 }}>
                      <Box style={{ background: "#d9d9d9" }} sx={{ p: 2 }}>
                        <Typography
                          color="#727E8C"
                          fontWeight="fontWeightBold"
                          variant="h6"
                        >
                          Investor name
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "700", color: "#48607c" }}
                        >
                          {session?.bookedBy.firstName}{" "}
                          {session?.bookedBy.lastName}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2 }}>
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
                          {new Date(session.schedule.date).toDateString()}
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
                          {convertTo12HourFormat(session.schedule.time)}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ p: 2 }}
                      >
                        <CLink
                          className="text-decoration-none"
                          href={session.sessionLink}
                          target="_blank"
                        >
                          <Button
                            sx={{ fontWeight: "bold", py: 1 }}
                            size="large"
                            variant="contained"
                          >
                            Join Session
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
  );
}
