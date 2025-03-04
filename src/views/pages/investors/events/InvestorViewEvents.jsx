import { useEffect, useState } from "react";
import { CContainer } from "@coreui/react";
import VisualNoData from "../../../../utils/VisualNoData";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { cancelFreePremiumMembership } from "../../../../api/services/PaymentService";
import { CSmartPagination } from "@coreui/react-pro";
import {
  getInvestorEvents,
  getInvestorEventSummary,
} from "../../../../api/services/Investors/InvestorEventService";
import Loader from "../../users/Loader";
import TabularNav from "../../../../components/TabularNav";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import DigitRoll from "digit-roll-react";
import "../../../../assets/css/Digitroll.css";
import { useQuery } from "@tanstack/react-query";

const options = ["Active Events", "Past Events"];

export default function InvestorViewEvents() {
  const {
    _id: investorId,
    expiry,
    mobileNumber,
    secretToken,
    triedFreePremium,
  } = useSelector((state) => state.investor);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [viewState, setViewState] = useState(0);

  const handleViewState = (state) => {
    setViewState(state);
    setActivePage(1);
  };

  const {
    data: { investorEvent, totalEvents } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventAnalysis", viewState, activePage],
    queryFn: async () => {
      const { data } = await getInvestorEvents(
        setLoading,
        {
          count: activePage,
          ended: viewState === 1,
        },
        { mobileNumber, secretToken }
      );

      const eventAnalysisPromises = data?.investorEvent?.map(async (event) => {
        const { data } = await getInvestorEventSummary(
          setLoading,
          event?.eventId?._id
        );
        return {
          ...event,
          totalPapers: data?.totalPapers,
          totalStockAnalysis: data?.totalStocks,
          totalAnalysts: data?.totalAnalysis,
        };
      });

      const analyzedEvents = await Promise.all(eventAnalysisPromises);

      return {
        investorEvent: analyzedEvents,
        totalEvents: data.totalEvents,
      };
    },

    enabled: !!mobileNumber,
    refetchInterval: viewState === 0 ? 15000 : false,
    staleTime: viewState === 0 ? 0 : 60000 * 2,
  });

  const cancelPremiumMembership = async () => {
    if (secretToken && mobileNumber) {
      await cancelFreePremiumMembership(
        setLoading,
        null,
        { secretToken, mobileNumber },
        "investor"
      );
      // history.go(0);
    }
  };

  useEffect(() => {
    const _expiryDate = new Date(expiry).valueOf();
    const _currentDate = new Date().valueOf();
    if (_currentDate >= _expiryDate && !triedFreePremium) {
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
        maxWidth: "90rem",
        // maxWidth: "68.75rem",
      }}
    >
      <div
        className="position-relative mx-auto mb-3 px-2 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center m-0">Upcoming Event Analysis</h1>
      </div>
      <TabularNav
        options={options}
        state={viewState}
        handleState={handleViewState}
      />
      {!isLoading && totalEvents === 0 && <VisualNoData />}
      {isLoading && <Loader />}
      {!isLoading && totalEvents > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} justifyItems="center">
            {investorEvent?.length === 0 && <VisualNoData />}
            {investorEvent?.length > 0 &&
              investorEvent?.map((event) => (
                <Grid item xs={12} md={6} lg={4}>
                  <Card>
                    <CardContent sx={{ p: 0 }}>
                      <Box style={{ background: "#d9d9d9" }} sx={{ p: 2 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "700", color: "#48607c" }}
                        >
                          {event?.eventId?.name}
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            sx={{
                              fontWeight: "fontWeightBold",
                              color: "#727e8c",
                            }}
                          >
                            Event End Date:{" "}
                            {new Date(event?.endDate)?.toDateString()}
                          </Typography>
                          <Button
                            disabled
                            size="small"
                            style={{
                              backgroundColor:
                                new Date(event?.endDate)?.getTime() > Date.now()
                                  ? "#F10808"
                                  : "#808080",
                              fontWeight: "700",
                              color: "#eeeeee",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            }}
                          >
                            Live
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Typography
                          color="#727E8C"
                          fontWeight="fontWeightBold"
                          variant="h6"
                        >
                          Total Reports Submitted
                        </Typography>
                        <Typography
                          color="#5A8DEE"
                          fontWeight="fontWeightBold"
                          variant="h4"
                        >
                          <DigitRoll
                            num={event?.totalPapers || 0}
                            divider=","
                          />
                        </Typography>
                        <Typography
                          color="#727E8C"
                          fontWeight="fontWeightBold"
                          variant="h6"
                        >
                          Total Stocks Analyzed
                        </Typography>
                        <Typography
                          color="#5A8DEE"
                          fontWeight="fontWeightBold"
                          variant="h4"
                        >
                          <DigitRoll
                            num={event?.totalStockAnalysis || 0}
                            divider=","
                          />
                        </Typography>
                        <Typography
                          color="#727E8C"
                          fontWeight="fontWeightBold"
                          variant="h6"
                        >
                          Total Analysts
                        </Typography>
                        <Typography
                          color="#5A8DEE"
                          fontWeight="fontWeightBold"
                          variant="h4"
                        >
                          <DigitRoll
                            num={event?.totalAnalysts || 0}
                            divider=","
                          />
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ p: 2 }}
                      >
                        <Button
                          onClick={() =>
                            handleRedirect(`/investor/events/${event?._id}`)
                          }
                          size="large"
                          style={{
                            backgroundColor: "#5A8DEE",
                            fontWeight: "700",
                            color: "#fff",
                            fontSize: "20px",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                          }}
                          sx={{ px: 2, py: 0.5 }}
                        >
                          {"View More"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>

          <CSmartPagination
            size="sm"
            activePage={activePage}
            limit={10}
            pages={Math.ceil(totalEvents / 10) || 1}
            onActivePageChange={setActivePage}
            style={{ margin: "10px" }}
          />
        </div>
      )}
    </CContainer>
  );
}
