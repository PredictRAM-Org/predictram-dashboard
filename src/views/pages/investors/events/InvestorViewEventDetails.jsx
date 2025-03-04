import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import {
  Alert,
  Button,
  Chip,
  Container,
  InputBase,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import InsightsIcon from "@mui/icons-material/Insights";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getBondsData,
  getInvestorEventAnalysis,
  getInvestorStockImpact,
  getSpecificInvestorEvents,
} from "../../../../api/services/Investors/InvestorEventService";
import TabularNav from "../../../../components/TabularNav";
import CustomTable from "../../../../utils/CustomTable";
import CustomWidget from "../../../../utils/CustomWidget";
import Loader from "../../users/Loader";
import GridResearchCard from "../../users/research/GridResearchCard";
import ConnectWithAdvisorsModal from "./ConnectWithAdvisorModal";
import { completeProfileSteps } from "../../../../api/services/InvestorService";
import { toast } from "react-toastify";
import { fyersQuotes } from "../../../../api/services/FyersService";
import { useMutation, useQuery } from "@tanstack/react-query";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CIcon from "@coreui/icons-react";
import stockDetailsLogo from "../../../../assets/images/stocks.png";
import { cilArrowBottom, cilArrowTop } from "@coreui/icons";
import BBLogo from "../../../../assets/images/BB LOGO.png";
import VisualNoData from "../../../../utils/VisualNoData";
import CustomCards from "../../../../utils/CustomCards";
import { convertXlsxURLToJson } from "../../../../components/FileUploader/xlsxTOJson";
import {
  filterJsonByStrategy,
  findJSON,
} from "../../../../api/services/JsonService";
import { CSmartTable } from "@coreui/react-pro";
import PersonalizedRecommendations from "./PersonalizedRecommendations";
import { eventPortfolioGet } from "../../../../api/services/EventPortfolioService";
import { portfolioResults, stockWithRemarks } from "../../../../data";
import { getRiskScore } from "../../../../api/services/RiskScoreService";
import Progress from "../../../../components/Progress";
import StrategySelect from "../../../inputs/SelectInputs/SelectWrapper/StrategySelect";
import EventStockScoreChart from "../../../../components/Events/EventStockScoreChart";
import { stockAnalysisConfig } from "../../../../config/stockAnalysisConfig";

function InvestorViewEventDetails() {
  const { id } = useParams();
  const {
    _id: userId,
    mobileNumber,
    secretToken,
    profileCompleted,
    premiumUser,
  } = useSelector((state) => state.investor);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [allStocks, setAllStocks] = useState([]);
  const [viewState, setViewState] = useState(0);
  const [options, setOptions] = useState([
    "Trending Research",
    "Trending Stocks",
    "Trending ETF",
    "Trending Bonds",
  ]);
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchStrategy, setSearchStrategy] = useState("");

  const { data: { result } = {} } = useQuery({
    queryKey: ["investorRisk"],
    queryFn: async () => {
      const response = await getRiskScore(
        setLoading,
        { id: userId },
        { secretToken, mobileNumber },
        userId ? "investor" : "advisor"
      );

      if (response?.data?.length) {
        const {
          data: [{ riskScores = {} }],
        } = response;

        if (riskScores?.riskProfile) {
          const result = getResult(riskScores);
          return {
            result: result,
            userRiskScores: riskScores,
          };
        }
      }
    },
    staleTime: 60000 * 2,
  });

  const getResult = (score) => {
    const totalScore = score.riskProfile;
    const algoTotalScore = totalScore / 2;
    if (algoTotalScore < 15) {
      return portfolioResults[0];
    } else if (totalScore >= 15 && totalScore < 20) {
      return portfolioResults[1];
    } else if (totalScore >= 20 && totalScore < 25) {
      return portfolioResults[2];
    } else if (totalScore >= 25 && totalScore < 30) {
      return portfolioResults[3];
    } else {
      return portfolioResults[4];
    }
  };

  function getRandomItems(array) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    const formattedArray = shuffledArray.map((bond) => {
      const coupon =
        typeof bond["Coupon"] === "number"
          ? (bond["Coupon"] * 100).toFixed(2) + "%"
          : bond["Coupon"];
      return {
        ...bond,
        Coupon: coupon,
        "Offer Yield": (bond["Offer Yield"] * 100).toFixed(2) + "%",
      };
    });
    return formattedArray.slice(0, 2);
  }

  // const {
  //   mutate,
  //   isPending,
  //   data: stockInfo,
  // } = useMutation({
  //   mutationKey: ["event-stocks"],
  //   mutationFn: async ({ url, searchSymbol }) => {
  //     const StockSymbol = searchSymbol?.trim();
  //     if (!StockSymbol) {
  //       return [];
  //     }
  //     const response = await getInvestorStockImpact(setLoading, {
  //       symbol: searchSymbol,
  //     });
  //     const stockImpact = response?.data;
  //     if (!allStocks?.length) {
  //       const data = await convertXlsxURLToJson(url);
  //       console.log(data);
  //       const foundData = findJSON(data, "Stock Symbol", searchSymbol);
  //       setAllStocks(data);
  //       return { foundData, stockImpact };
  //     } else {
  //       const foundData = findJSON(allStocks, "Stock Symbol", searchSymbol);
  //       return { foundData, stockImpact };
  //     }
  //   },
  //   // onSuccess: (data) => console.log(data),
  //   onerror: (err) => toast.error(err.message),
  // });

  // const {
  //   mutate: strategyMutate,
  //   isPending: strategyPending,
  //   data: strategyStockInfo,
  // } = useMutation({
  //   mutationKey: ["event-strategy"],
  //   mutationFn: async ({ url, strategy }) => {
  //     if (!strategy) {
  //       return [];
  //     }
  //     if (!allStocks?.length) {
  //       const data = await convertXlsxURLToJson(url);
  //       const foundData = filterJsonByStrategy(data, strategy);
  //       console.log(foundData);
  //       setAllStocks(data);
  //       return { foundData };
  //     } else {
  //       const foundData = filterJsonByStrategy(allStocks, strategy);
  //       return { foundData };
  //     }
  //   },
  //   // onSuccess: (data) => console.log(data),
  //   onerror: (err) => toast.error(err.message),
  // });

  const {
    mutate,
    isPending,
    data: stockInfo,
  } = useMutation({
    mutationKey: ["event-stocks-or-strategy"],
    mutationFn: async ({ url, searchSymbol, strategy }) => {
      if (searchSymbol) {
        setSearchStrategy("");
        const StockSymbol = searchSymbol.trim();
        if (!StockSymbol) {
          return [];
        }
        const response = await getInvestorStockImpact(setLoading, {
          symbol: searchSymbol,
        });
        const stockImpact = response?.data;
        if (!allStocks?.length) {
          const data = await convertXlsxURLToJson(url);
          const foundData = findJSON(data, "Stock Symbol", searchSymbol);
          setAllStocks(data);
          return { foundData, stockImpact };
        } else {
          const foundData = findJSON(allStocks, "Stock Symbol", searchSymbol);
          return { foundData, stockImpact };
        }
      }

      if (strategy) {
        setSearchSymbol(""); // Clear search symbol if searching by strategy
        if (!allStocks?.length) {
          const data = await convertXlsxURLToJson(url);
          const {
            filteredStocks: foundData,
            description,
            benefit,
            disadvantage,
          } = filterJsonByStrategy(data, strategy);
          setAllStocks(data);
          return { foundData, description, benefit, disadvantage };
        } else {
          const {
            filteredStocks: foundData,
            description,
            benefit,
            disadvantage,
          } = filterJsonByStrategy(allStocks, strategy);
          return { foundData, description, benefit, disadvantage };
        }
      }

      return [];
    },
    // onSuccess: (data) => console.log(data),
    onError: (err) => toast.error(err.message),
  });

  const {
    data: {
      event,
      eventAnalysis,
      stocks,
      allSectors,
      monthlyBonds,
      quaterlyBonds,
      annuallyBonds,
      portfolios: portfolioData,
      ria,
    } = {},
    isLoading,
  } = useQuery({
    queryKey: ["investorEvent", id],
    queryFn: async () => {
      const { data: event } = await getSpecificInvestorEvents(setLoading, id, {
        mobileNumber,
        secretToken,
      });
      const { data } = await getInvestorEventAnalysis(
        setLoading,
        event?.eventId?._id
      );

      const stocks = data?.updatedStocks?.map((obj) => obj?.symbol).join(",");

      const { data: BondData } = await getBondsData(setLoading);

      const monthlyBonds = getRandomItems(
        BondData.filter(
          (item) => item["Interest Payment Frequency"] === "Monthly"
        )
      );
      const quaterlyBonds = getRandomItems(
        BondData.filter(
          (item) => item["Interest Payment Frequency"] === "Quarterly"
        )
      );
      const annuallyBonds = getRandomItems(
        BondData.filter(
          (item) => item["Interest Payment Frequency"] === "Annually"
        )
      );

      let newoptions = options,
        allSectors = [];
      if (data?.stockFile && !newoptions?.includes("Stocks Event Analysis")) {
        newoptions?.push("Stocks Event Analysis");
      }

      if (data?.sectorAnalysisFile) {
        allSectors = await convertXlsxURLToJson(data?.sectorAnalysisFile);
        if (!newoptions?.includes("Sector Event Analysis"))
          newoptions?.push("Sector Event Analysis");
      }

      if (data?.ria.length) {
        if (!newoptions?.includes("RIA/RAA")) newoptions?.push("RIA/RAA");
      }

      setOptions(newoptions);

      const { data: portfolios } = await eventPortfolioGet(
        setLoading,
        { ownerId: userId, eventId: event?.eventId?._id },
        { secretToken, mobileNumber }
      );

      return {
        event,
        eventAnalysis: data || [],
        stocks,
        allSectors,
        monthlyBonds,
        quaterlyBonds,
        annuallyBonds,
        portfolios,
        ria: data?.ria,
      };
    },
    enabled: !!mobileNumber && !!secretToken,
  });

  const { data: stockAnalysis = [] } = useQuery({
    queryKey: ["stock-live-price", id],
    queryFn: async () => {
      try {
        if (premiumUser) {
          const { data } = await fyersQuotes({ symbols: stocks });
          const livePrice = data?.data?.d || [];
          const updatedStockPriceData = eventAnalysis?.updatedStocks?.map(
            (obj) => {
              const newPrice = livePrice?.find(
                (d) => d?.n === `NSE:${obj?.symbol}-EQ`
              )?.v?.lp;

              if (newPrice) {
                return { ...obj, currentPrice: newPrice };
              } else {
                return obj;
              }
            }
          );
          return updatedStockPriceData || [];
        } else {
          return eventAnalysis?.updatedStocks || [];
        }
      } catch (err) {
        const updatedStockPriceData = eventAnalysis?.updatedStocks?.map(
          (obj) => {
            return obj;
          }
        );
        return updatedStockPriceData;
      }
    },
    refetchInterval: 15000,
    enabled: stocks?.length > 0 && !!eventAnalysis && viewState === 1,
  });

  function recommendationPercentage(personRisk, stock) {
    const riskLevels = [
      "Very Conservative",
      "Conservative",
      "Moderate",
      "Aggressive",
      "Very Aggressive",
    ];
    const remark = stockWithRemarks?.find((d) => d.Symbol === stock)?.Remarks;
    if (!remark) return "N/A";
    const personRiskIndex = riskLevels.indexOf(personRisk);
    const stockRiskIndex = riskLevels.indexOf(remark);
    const maxDifference = riskLevels.length - 1;
    const difference = Math.abs(personRiskIndex - stockRiskIndex);

    const percentage = ((maxDifference - difference) / maxDifference) * 100;

    return <Progress percentage={percentage} />;
  }

  const updateProfileSteps = async () => {
    const completeStep = await completeProfileSteps(setLoading, {
      id: userId,
      step: 3,
    });
  };

  // completing the profile steps
  useEffect(() => {
    if (userId && !profileCompleted) {
      updateProfileSteps();
    }
  }, [userId]);

  const handleViewState = (state) => {
    setViewState(state);
  };

  const sectorTableConfig = [
    { key: "Stock Symbol", label: "Stock Symbol" },
    { key: "Company Name", label: "Company Name" },
    { key: "Average 12-Month Change", label: "Average 12-Month Change" },
  ];

  const riaTableConfig = [
    { key: "name", label: "Name" },
    { key: "regno", label: "Registration Number" },
  ];

  const etfColumns = [
    {
      header: "SYMBOL",
      accessor: "symbol",
    },
    {
      header: "Trade Value",
      accessor: "trdVal",
    },
    {
      header: "Quantity",
      accessor: "qty",
    },
    {
      header: "Open",
      accessor: "open",
    },
    {
      header: "High",
      accessor: "high",
    },
    {
      header: "Low",
      accessor: "low",
    },
    {
      header: "LTP",
      accessor: "ltP",
    },
  ];

  const bondColumns = [
    {
      header: "Issuer Name",
      accessor: "Issuer Name",
    },
    { header: "Coupon", accessor: "Coupon" },
    {
      header: "Redemption Date",
      accessor: "Redemption Date",
    },
    { header: "Face Value", accessor: "Face Value" },
    {
      header: "Secured / Unsecured",
      accessor: "Secured / Unsecured",
    },
    {
      header: "Offer Yield",
      accessor: "Offer Yield",
    },
  ];

  const columns = [
    {
      header: "Symbol",
      accessor: "symbol",
    },
    premiumUser && {
      header: "Average Price",
      accessor: "average",
    },
    // {
    //   header: "Current Price",
    //   accessor: "currentPrice",
    // },
    {
      header: "Price Change",
      accessor: ({ average, currentPrice }) => {
        const priceChange = currentPrice - average;
        return (
          <>
            {priceChange !== 0 ? (
              <>
                <>{Math.abs(priceChange).toFixed(2)}</>
                {priceChange > 0 ? (
                  <CIcon icon={cilArrowTop} className="text-success" />
                ) : (
                  <CIcon icon={cilArrowBottom} className="text-danger" />
                )}
              </>
            ) : (
              <>{priceChange}</>
            )}
          </>
        );
      },
    },
    {
      header: "Impact",
      accessor: ({ maxImpact }) => {
        return (
          <>
            {maxImpact?.impact ? (
              <Chip
                label={maxImpact?.impact || ""}
                color={
                  maxImpact?.impact === "HIGH"
                    ? "success"
                    : maxImpact?.impact === "MEDIUM"
                    ? "warning"
                    : "error"
                }
              />
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      header: "Risk Profile Match",
      accessor: ({ symbol }) =>
        recommendationPercentage(result?.status, symbol),
    },
    {
      header: "Fundamental Data",
      accessor: ({ symbol }) => (
        <Link to={`/investor/events/${id}/fundamental/${symbol}`}>
          Click Here
        </Link>
      ),
    },
    {
      header: "Technical Data",
      accessor: ({ symbol }) => (
        <Link to={`/investor/events/${id}/technical/hourly/${symbol}`}>
          Click Here
        </Link>
      ),
    },
  ];

  return (
    <>
      <ConnectWithAdvisorsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      {recommendationModalOpen && (
        <PersonalizedRecommendations
          result={result}
          recommendationModalOpen={recommendationModalOpen}
          setRecommendationModalOpen={setRecommendationModalOpen}
        />
      )}

      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        {event && (
          <CCardHeader className="mt-3">
            <CCardTitle
              className="p-0 m-0"
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#252525",
                textAlign: "center",
              }}
            >
              {event?.eventId?.name}
            </CCardTitle>
            <CCardText
              className="m-0 mt-2"
              style={{
                fontWeight: 500,
                color: "#AFAFB6",
                textAlign: "center",
                fontSize: "1.75rem",
              }}
            >
              End date {new Date(event?.endDate).toLocaleDateString()}
            </CCardText>
          </CCardHeader>
        )}
        {isLoading && <Loader />}
        {!isLoading && (
          <div>
            <Stack
              mt={4}
              justifyContent="center"
              alignItems="center"
              direction={isSmallScreen ? "column" : "row"}
              spacing={2}
            >
              <CustomWidget
                data={eventAnalysis?.totalPapers}
                label="Total Submitted Reports For Specific Event"
              />
              <CustomWidget
                // data={eventAnalysis?.stockDetails[0]?.totalStocks}
                data={eventAnalysis?.totalStocks}
                label="Total Stock Analysis"
              />
              <CustomWidget
                // data={eventAnalysis?.totalAnalysis[0]?.totalSubscribers}
                data={eventAnalysis?.totalAnalysis}
                label="Total Analysts"
              />
            </Stack>
            <Box mt={3}>
              {eventAnalysis?.futureStocks && (
                <EventStockScoreChart
                  futureStocks={eventAnalysis?.futureStocks}
                />
              )}
            </Box>
            <Alert
              sx={{ mt: "2em" }}
              icon={<InsightsIcon fontSize="inherit" />}
              color="info"
              action={
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="outlined"
                  onClick={
                    premiumUser
                      ? () => setModalOpen(true)
                      : () => toast.info("you need to pay to use this feature")
                  }
                  color="inherit"
                  size="small"
                >
                  Connect With Our Advisors
                </Button>
              }
            >
              Want to know more about this event?
            </Alert>
            {eventAnalysis?.file && (
              <Alert
                sx={{ mt: "2em" }}
                icon={<AssessmentOutlinedIcon fontSize="inherit" />}
                color="success"
                action={
                  <Button
                    sx={{ fontWeight: "bold" }}
                    variant="outlined"
                    onClick={
                      premiumUser
                        ? () => window.open(eventAnalysis?.file)
                        : () =>
                            toast.info("you need to pay to use this feature")
                    }
                    color="inherit"
                    size="small"
                  >
                    Click Here
                  </Button>
                }
              >
                Want to get a detailed report?
              </Alert>
            )}
            {eventAnalysis?.file && portfolioData.length === 0 && (
              <Alert
                sx={{ mt: "2em" }}
                icon={<AssessmentOutlinedIcon fontSize="inherit" />}
                color="success"
                action={
                  <Button
                    sx={{ fontWeight: "bold" }}
                    variant="outlined"
                    onClick={
                      premiumUser
                        ? () => setRecommendationModalOpen(true)
                        : () =>
                            toast.info("you need to pay to use this feature")
                    }
                    color="inherit"
                    size="small"
                  >
                    Click Here
                  </Button>
                }
              >
                Want to get a personalized recommendation?
              </Alert>
            )}

            <CCardBody
              style={{
                maxWidth: `${isSmallScreen ? "20rem" : "100%"}`,
                margin: "0 auto",
                boxShadow: "none",
                marginTop: "3rem",
              }}
            >
              <TabularNav
                options={options}
                state={viewState}
                handleState={handleViewState}
              />
              {viewState === 0 && (
                <Box component="div" sx={{ width: "100%" }}>
                  {eventAnalysis?.topPapers?.map((item, idx) => {
                    return (
                      <GridResearchCard
                        key={idx}
                        data={item}
                        lastCard={idx + 1 === eventAnalysis?.topPapers?.length}
                      />
                    );
                  })}
                </Box>
              )}
              {viewState === 1 && (
                <>
                  <CustomTable data={stockAnalysis} columns={columns} />
                  {premiumUser && (
                    <Alert sx={{ my: "2em" }} severity="error">
                      Please note that our current price may differ from the
                      actual market price
                    </Alert>
                  )}
                </>
              )}
              {viewState === 2 && !!eventAnalysis?.etfData && (
                <div>
                  <div>
                    <h3>Most Selected ETF</h3>
                    <CustomTable
                      data={[eventAnalysis?.etfData?.mostSelectedETF]}
                      columns={etfColumns}
                    />
                  </div>

                  <div className="mt-4">
                    <h3>Least Selected ETF</h3>
                    <CustomTable
                      data={[eventAnalysis?.etfData?.leastSelectedETF]}
                      columns={etfColumns}
                    />
                  </div>
                </div>
              )}
              {viewState === 3 && !!eventAnalysis?.etfData && (
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img className="BBLogo" src={BBLogo} />
                  </div>
                  <div>
                    <h3>Most Selected Monthly Bonds</h3>
                    <CustomTable data={monthlyBonds} columns={bondColumns} />
                  </div>
                  <div className="mt-4">
                    <h3>Most Selected Quaterly Bonds</h3>
                    <CustomTable data={quaterlyBonds} columns={bondColumns} />
                  </div>
                  <div className="mt-4">
                    <h3>Most Selected Yearly Bonds</h3>
                    <CustomTable data={annuallyBonds} columns={bondColumns} />
                  </div>
                </div>
              )}
              {viewState === options.indexOf("Stocks Event Analysis") && (
                <Container
                  sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InputBase
                      sx={{
                        flex: 1,
                        width: 400,
                        border: "1px solid #777FF3",
                        borderRadius: "4px",
                        padding: "4px 8px",
                      }}
                      value={searchSymbol}
                      placeholder="Write Stock Symbol.."
                      onChange={(e) => setSearchSymbol(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ py: 1, borderRadius: "0px" }}
                      disabled={!searchSymbol}
                      onClick={() =>
                        mutate({
                          url: eventAnalysis?.stockFile,
                          searchSymbol: searchSymbol,
                        })
                      }
                    >
                      Search
                    </Button>
                  </Box>
                  <div>OR</div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 800,
                    }}
                  >
                    <StrategySelect
                      value={searchStrategy}
                      setValue={setSearchStrategy}
                      noLabel={true}
                    />
                    <Button
                      variant="contained"
                      sx={{ py: 1, borderRadius: "0px" }}
                      onClick={() =>
                        mutate({
                          url: eventAnalysis?.stockFile,
                          strategy: searchStrategy.label,
                        })
                      }
                    >
                      Search
                    </Button>
                  </Box>
                  {stockInfo?.stockImpact && (
                    <CCard
                      className={"shadow-none border-0 d-flex flex-row p-0"}
                      style={{
                        borderRadius: "0.625rem",
                        gap: "0.9375rem",
                        marginTop: "1.7rem",
                      }}
                    >
                      <div
                        className="d-flex flex-column rounded-3 shadow-sm"
                        style={{
                          backgroundColor: "#f5f5fa",
                          padding: "1.5rem",
                          border: "1px solid #e0e0e0",
                          maxWidth: "1000px",
                          margin: "auto",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#6c63ff",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Stock Impact Analysis
                        </p>
                        <div style={{ marginBottom: "1rem" }}>
                          <div
                            style={{
                              backgroundColor: "#d1e7dd",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>Stock Symbol:</b>{" "}
                              <span style={{ color: "#333" }}>
                                {stockInfo?.stockImpact.stockSymbol}
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#f8d7da",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>Correlation with Inflation:</b>{" "}
                              <span style={{ color: "#333" }}>
                                {
                                  stockInfo?.stockImpact
                                    .correlationWithInflation
                                }
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#d1e7dd",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>
                                Estimated Change in Stock Price with a 1%
                                increase in inflation:
                              </b>{" "}
                              <span style={{ color: "green" }}>
                                {
                                  stockInfo?.stockImpact
                                    .changeInStockPriceIncrease
                                }
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#f8d7da",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>
                                Estimated Change in Stock Price with a 1%
                                decrease in inflation:
                              </b>{" "}
                              <span style={{ color: "red" }}>
                                {
                                  stockInfo?.stockImpact
                                    .changeInStockPriceDecrease
                                }
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CCard>
                  )}
                  {stockInfo?.description && (
                    <CCard
                      className={"shadow-none border-0 d-flex flex-row p-0"}
                      style={{
                        borderRadius: "0.625rem",
                        gap: "0.9375rem",
                        marginTop: "1.7rem",
                      }}
                    >
                      <div
                        className="d-flex flex-column rounded-3 shadow-sm"
                        style={{
                          backgroundColor: "#f5f5fa",
                          padding: "1.5rem",
                          border: "1px solid #e0e0e0",
                          maxWidth: "1000px",
                          margin: "auto",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#6c63ff",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Strategy Details
                        </p>
                        <div style={{ marginBottom: "1rem" }}>
                          <div
                            style={{
                              // backgroundColor: "#d1e7dd",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>Description:</b>{" "}
                              <span style={{ color: "#333" }}>
                                {stockInfo?.description}
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#d1e7dd",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>Advantage:</b>{" "}
                              <span style={{ color: "#333" }}>
                                {stockInfo?.benefit}
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#f8d7da",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <p style={{ margin: "0" }}>
                              <b>Disadvantage:</b>{" "}
                              <span style={{ color: "red" }}>
                                {stockInfo?.disadvantage}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CCard>
                  )}
                  {/* {!(
                    stockInfo?.foundData ||
                    isPending ||
                    strategyStockInfo?.foundData ||
                    strategyPending
                  ) && (
                    <Stack alignItems="center">
                      <img
                        src={stockDetailsLogo}
                        height={200}
                        width={200}
                        alt="Stock Details Logo"
                      />
                      <Typography fontWeight="bold" fontSize={20}>
                        🔍 Search By Stock Symbol And Get Stocks Event Analysis
                      </Typography>
                    </Stack>
                  )} */}
                  {!stockInfo?.foundData && !isPending && (
                    <Stack alignItems="center">
                      <img
                        src={stockDetailsLogo}
                        height={200}
                        width={200}
                        alt="Stock Details Logo"
                      />
                      <Typography fontWeight="bold" fontSize={20}>
                        🔍 Search By Stock Symbol or Strategy And Get Stocks
                        Event Analysis
                      </Typography>
                    </Stack>
                  )}
                  {stockInfo?.foundData?.length === 0 /*  ||
                    strategyStockInfo?.foundData?.length === 0 */ && (
                    <VisualNoData
                      imageHight={200}
                      imageWidth={200}
                      message="Sorry No Matching Stock Event Analysis"
                    />
                  )}
                  {isPending /*  || strategyPending */ && (
                    <Box>
                      <Loader />
                      <Typography fontWeight="bold" fontSize={20}>
                        Please wait we are finding stock event analysis
                      </Typography>
                    </Box>
                  )}
                  {stockInfo?.foundData.length > 0 && (
                    <CustomCards
                      data={stockInfo.foundData}
                      config={stockAnalysisConfig}
                      mt={2}
                    />
                  )}
                  {/* {strategyStockInfo?.foundData.length > 0 && (
                    <CustomCards
                      data={strategyStockInfo.foundData}
                      config={stockReportConfig}
                      mt={2}
                    />
                  )} */}
                </Container>
              )}
              {viewState === options.indexOf("Sector Event Analysis") && (
                <div style={{ overflow: "auto" }}>
                  <CSmartTable
                    className="shadow-none border border-light flex-wrap"
                    style={{ padding: "10px", backgroundColor: "white" }}
                    activePage={3}
                    cleaner
                    clickableRows
                    columnFilter
                    columnSorter
                    columns={sectorTableConfig?.map((config) => ({
                      ...config,
                      sorter: true,
                      filter: true,
                      _props: {
                        color: "primary",
                        className: "fw-semibold",
                      },
                      _style: { width: "25%" },
                    }))}
                    items={allSectors}
                    itemsPerPageSelect
                    itemsPerPageOptions={[100, 300, 500]}
                    itemsPerPage={100}
                    pagination={{ size: "sm" }}
                    sorterValue={{ column: "name", state: "asc" }}
                    tableFilter
                  />
                </div>
              )}
              {viewState === options.indexOf("RIA/RAA") && (
                <div style={{ overflow: "auto" }}>
                  <CSmartTable
                    className="shadow-none border border-light flex-wrap"
                    style={{ padding: "10px", backgroundColor: "white" }}
                    activePage={3}
                    cleaner
                    clickableRows
                    columnFilter
                    columnSorter
                    columns={riaTableConfig?.map((config) => ({
                      ...config,
                      sorter: true,
                      filter: true,
                      _props: {
                        color: "primary",
                        className: "fw-semibold",
                      },
                      _style: { width: "25%" },
                    }))}
                    items={ria}
                    itemsPerPageSelect
                    itemsPerPageOptions={[10, 30, 50]}
                    itemsPerPage={10}
                    pagination={{ size: "sm" }}
                    sorterValue={{ column: "name", state: "asc" }}
                    tableFilter
                  />
                </div>
              )}
            </CCardBody>
          </div>
        )}
      </div>
    </>
  );
}

export default InvestorViewEventDetails;
