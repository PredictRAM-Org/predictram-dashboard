import { cilArrowBottom } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CProgress,
  CProgressBar,
} from "@coreui/react";
import { CSmartTable } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import { VAR, portfolioResults } from "../../../../data";
import imgUrl from "../../../../assets/images/quizpic4.png";
import resultimg from "../../../../assets/images/result.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cilArrowLeft } from "@coreui/icons-pro";
import { createRiskScore } from "../../../../api/services/RiskScoreService";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { completeProfileSteps } from "../../../../api/services/InvestorService";
import { getRiskScoreQuestions } from "../../../../api/services/RiskScoreService";
import {
  getBondsData,
  getEtfData,
  getStocksByCategory,
} from "../../../../api/services/Investors/InvestorEventService";

import img1 from "../../../../assets/images/quizpic1.png";
import img2 from "../../../../assets/images/quizpic2.png";
import img3 from "../../../../assets/images/quizpic3.png";
import CustomTable from "../../../../utils/CustomTable";
import { getInvestorEvents } from "../../../../api/services/Investors/InvestorEventService";
import Select from "react-select";
import { Alert, Button, Typography } from "@mui/material";
import { getStockPrice } from "../../../../api/services/EventService";
import { saveBulkPortfolioStock } from "../../../../api/services/PortfolioService";
import { toast } from "react-toastify";
import { mutualFundGet } from "../../../../api/services/MutualFundService";
import { eventPortfolioCreate } from "../../../../api/services/EventPortfolioService";
import { getCagr, getCategorizedStocks } from "../../../../data/cagrData";
import TabularNav from "../../../../components/TabularNav";
import { AccountBalance, AccountBox } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fyersQuotes } from "../../../../api/services/FyersService";

const instructions = [
  {
    instruction:
      "We are digital platforms that provide automated, algorithm-driven financial planning services with little to no human supervision. A typicaly we collects information from clients about their financial situation and future goals through an online survey and then uses the data to offer advice and automatically suggest best investment assets.",
    imgurl: img1,
  },
  {
    instruction:
      "This questionnaire was developed to help you understand yourself. This Questionnaire has 10 questions that are divided in two sections: Understanding your Risk Capacity and Understanding your own Tolerance to Risk",
    imgurl: img2,
  },
  {
    instruction:
      "After we gauge these two elements, we will be able to measure the results and cross-reference what your true Risk Profile is. This will not only help us get a better understanding of your financial goals but what road to take to get there.",
    imgurl: img3,
  },
];

const customStyles = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};
const nextarrowStyle = {
  cursor: "pointer",
  backgroundColor: "white",
  padding: "5px",
  borderRadius: "50%",
  boxShadow: customStyles.boxShadow,
};

let riskResult = { questions: [] };

export default function KnowYourRisk() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [capacityScore, setCapacityScore] = useState(0);
  const [toleranceScore, setToleranceScore] = useState(0);
  const [capacityresult, setCapacityResult] = useState(false);
  const [toleranceresult, setToleranceResult] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryFound, setCategoryFound] = useState(false);
  const [mutualFundFound, setMutualFundFound] = useState(false);
  const history = useHistory();
  const userId = useSelector((state) => state.user.id);
  const investorId = useSelector((state) => state.investor._id);
  const { secretToken, mobileNumber, profileCompleted } = useSelector(
    (state) => state.investor
  );
  const [riskQuestions, setRiskQuestions] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState("");
  const [stocks, setStocks] = useState([]);
  const [portfolioStock, setPortfolioStock] = useState([]);
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioMutualFunds, setPortfolioMutualFunds] = useState([]);
  const [categorizedStocks, setCategorizedStocks] = useState([]);
  const [viewState, setViewState] = useState(0);

  const getActiveEvents = async () => {
    const {
      data: { investorEvent },
    } = await getInvestorEvents(
      setLoading,
      { ended: false },
      { mobileNumber, secretToken }
    );
    setEvents(investorEvent);
  };

  const getStockData = async () => {
    const price = await getStockPrice(setLoading, "investor", {
      secretToken,
      mobileNumber,
    });

    let tempstocks = price.map((stock) => {
      if (stock.remarks === "Very Aggrresive") {
        return { ...stock, remarks: "Very Aggressive" };
      } else {
        return stock;
      }
    });
    setStocks(tempstocks);
  };

  const getRiskQuestions = async () => {
    const questions = await getRiskScoreQuestions(
      setLoading,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );
    const q = [...instructions, ...questions?.data];
    setRiskQuestions(q);
    setResult(false);
  };

  const handelNext = (option) => {
    riskResult?.questions?.push({
      questionID: riskQuestions[currentIndex]._id,
      selectedOptionValue: option,
    });
    if (riskQuestions[currentIndex].type === "risk-tolerance") {
      setToleranceScore(toleranceScore + option * 1.2);
    } else {
      setCapacityScore(capacityScore + option * 1.2);
    }
    riskQuestions[currentIndex].number = option * 1.2;
    riskQuestions[currentIndex].ans = option;
    setCurrentIndex(currentIndex + 1);
  };

  const handelPrev = () => {
    const prevnum = riskQuestions[currentIndex - 1]?.number || 0;
    riskQuestions[currentIndex - 1].number = 0;
    if (riskQuestions[currentIndex - 1].type === "risk-tolerance") {
      setToleranceScore(toleranceScore - prevnum);
    } else {
      setCapacityScore(capacityScore - prevnum);
    }
    setCurrentIndex(currentIndex - 1);
  };

  const calculateResult = (score, setResult) => {
    if (score < 15) {
      setResult(portfolioResults[0]);
    } else if (score >= 15 && score < 20) {
      setResult(portfolioResults[1]);
    } else if (score >= 20 && score < 25) {
      setResult(portfolioResults[2]);
    } else if (score >= 25 && score < 30) {
      setResult(portfolioResults[3]);
    } else {
      setResult(portfolioResults[4]);
    }
  };

  useEffect(() => {
    getRiskQuestions();
    getActiveEvents();
    getStockData();
    stockDataFetch();
    //getMutualFundsData();
  }, []);

  useEffect(() => {
    if (currentIndex === riskQuestions.length) {
      const totalScore = capacityScore + toleranceScore;
      const algoTotalScore = totalScore / 2;
      calculateResult(capacityScore, setCapacityResult);
      calculateResult(toleranceScore, setToleranceResult);
      calculateResult(algoTotalScore, setResult);
    }
  }, [currentIndex]);

  function cleardata() {
    riskQuestions.forEach((r) => {
      delete r?.ans;
      delete r?.number;
    });
    riskResult = { questions: [] };
  }

  const handelSubmitRiskScore = async (e) => {
    e.preventDefault();
    const totalScore = capacityScore + toleranceScore;
    riskResult = {
      ...riskResult,
      riskTolerance: toleranceScore,
      riskCapacity: capacityScore,
      riskProfile: totalScore,
      userId: userId || investorId,
    };

    const { data } = await createRiskScore(
      setLoading,
      riskResult,
      { secretToken, mobileNumber },
      investorId ? "investor" : "advisor"
    );

    const stocks = portfolioStock.map(
      ({ companyName, value, symbol, isin }) => ({
        totalquantity: 1,
        perstockprice: value,
        totalinvested: value,
        companyName,
        symbol,
        var: VAR[isin] || 20,
      })
    );

    const etfsPayload = EtfData?.map(
      ({
        SYMBOL,
        "UNDERLYING ASSET": UNDERLYING_ASSET,
        NAV,
        VOLUME,
        "30DCHNG": ThirtyDayPercentChange,
      }) => ({
        SYMBOL,
        UNDERLYING_ASSET,
        NAV,
        VOLUME,
        ThirtyDayPercentChange,
      })
    );

    const bondsPayload = BondData?.map(
      ({
        "Issuer Name": Issuer_Name,
        "Redemption Date": Redemption_Date,
        "Face Value": Face_Value,
        Coupon,
        "Secured / Unsecured": Secured_Unsecured,
        "Offer Yield": Offer_Yield,
      }) => ({
        Issuer_Name,
        Redemption_Date,
        Face_Value,
        Coupon,
        Secured_Unsecured,
        Offer_Yield,
      })
    );

    const mutualFunds = portfolioMutualFunds.map(({ _id }) => _id);

    const payload = {
      eventId: event?.value,
      ownerId: investorId,
      stocks: stocks,
      portfolioName: portfolioName,
      mutualFunds: mutualFunds,
      etfs: etfsPayload,
      bonds: bondsPayload,
    };

    await eventPortfolioCreate(setLoading, payload, {
      mobileNumber,
      secretToken,
    });

    // updating the profile of the investor
    if (investorId && !profileCompleted) {
      await completeProfileSteps(setLoading, { id: investorId, step: 1 });
    }

    cleardata();
    history.push("/");
  };

  const stockDataFetch = async () => {
    const jsonData = await getCategorizedStocks();
    setCategorizedStocks(jsonData);
  };

  const { data: EtfData, isEtfLoading } = useQuery({
    queryKey: "etfData",
    queryFn: async () => {
      const { data: etfData } = await getEtfData(setLoading, {
        category: result.status,
      });
      const filteredEtfs = etfData.sort((a, b) => b["30DCHNG"] - a["30DCHNG"]);
      return filteredEtfs.slice(0, 10);
    },
    enabled: !!event,
    staleTime: 60000 * 2,
  });

  const { data: BondData, isBondLoading } = useQuery({
    queryKey: "bondsData",
    queryFn: async () => {
      const { data: BondData } = await getBondsData(setLoading, {
        category: result.status,
      });
      const filteredBonds = BondData.sort(
        (a, b) => b["Offer Yield"] - a["Offer Yield"]
      );

      // Convert decimal Offer Yield to percentage format
      const formattedBonds = filteredBonds.map((bond) => {
        const coupon =
          typeof bond["Coupon"] === "number"
            ? (bond["Coupon"] * 100).toFixed(2) + "%"
            : bond["Coupon"];
        return {
          ...bond,
          "Offer Yield": (bond["Offer Yield"] * 100).toFixed(2) + "%",
          Coupon: coupon,
          "Redemption Date": bond["Redemption Date"],
        };
      });

      return formattedBonds.slice(0, 5);
    },
    enabled: !!event,
    staleTime: 60000 * 2,
  });

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const chooseStock = async (event) => {
    setCategoryFound(false);
    setMutualFundFound(false);
    if (event) {
      const { data } = await getStocksByCategory(setLoading, event.value, {
        mobileNumber,
        secretToken,
      });

      const { data: mutualFundData } = await mutualFundGet(
        setLoading,
        { Riskometer_Benchmark: result?.status },
        { secretToken, mobileNumber }
      );

      const mapStocksToNames = async (stocksArray) => {
        let symbols = stocksArray.map((stock) => stock.symbol);
        const fyersdata = await getFyersData(symbols.join(","));

        const updatedStocks = stocksArray.map((stock) => {
          const fyersStock = fyersdata.find((data) =>
            data.n.includes(stock.symbol)
          );
          if (fyersStock) {
            const value = fyersStock.v.lp;
            return {
              ...stock,
              value,
            };
          }
          return stock;
        });
        return updatedStocks.map((selectedStock) => {
          let foundStock = stocks.find(
            (stock) => stock.symbol === selectedStock.symbol
          );
          let cagr = getCagr(selectedStock, categorizedStocks);
          return foundStock
            ? {
                companyName: foundStock.companyName,
                symbol: foundStock.symbol,
                value: selectedStock.value,
                cagr: cagr,
              }
            : {
                companyName: "Unknown",
                symbol: selectedStock.symbol,
                value: selectedStock.value,
                cagr: cagr,
              };
        });
      };

      const chooseRandomMutualFunds = (mutualFundDataNo) => {
        const data = [];
        for (let i = 0; i < mutualFundDataNo; i++) {
          const j = Math.floor(Math.random() * mutualFundData?.length);
          data.push(mutualFundData[j]);
        }
        return data;
      };

      const matchingStocks = data.result.find(
        (item) => item._id === result.status
      );

      if (!matchingStocks && !mutualFundData.length) {
        toast.error(
          "Event analysis for this event is yet complete. Please try again later!"
        );
        return;
      }
      if (matchingStocks) {
        const portfolioStocksData = await mapStocksToNames(
          matchingStocks.stocks
        );
        setCategoryFound(true);
        setPortfolioStock(portfolioStocksData.slice(0, 6));
      }

      if (mutualFundData.length) {
        setMutualFundFound(true);
        setPortfolioMutualFunds(chooseRandomMutualFunds(6));
      }
    }
  };

  const options = ["Stocks", "Mutual Funds", "ETFs", "Bonds"];
  const [activePage, setActivePage] = useState(1);

  const handleViewState = (state) => {
    setViewState(state);
    setActivePage(1);
  };

  return (
    <CContainer className="d-flex">
      {!result && (
        <img
          width="400"
          height="300"
          src={riskQuestions[currentIndex]?.imgurl || imgUrl}
          alt="..."
        />
      )}
      {result && <img width="400" height="300" src={resultimg} alt="..." />}
      <CContainer>
        {riskQuestions[currentIndex]?.instruction && (
          <CContainer>
            <CCard
              style={{
                boxShadow: customStyles.boxShadow,
              }}
            >
              <CCardBody>
                <div>{riskQuestions[currentIndex]?.instruction}</div>
              </CCardBody>
            </CCard>
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
              <CIcon
                size="3xl"
                style={nextarrowStyle}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                icon={cilArrowBottom}
              ></CIcon>
              <h5>Next</h5>
            </div>
          </CContainer>
        )}
        {riskQuestions[currentIndex]?.question && (
          <div>
            <CCard
              style={{
                boxShadow: customStyles.boxShadow,
              }}
            >
              <CProgress className="m-3">
                <CProgressBar color="info" value={(currentIndex - 3) * 10} />
              </CProgress>
              <CCardBody>
                <h5>{riskQuestions[currentIndex]?.question}</h5>
                {!!riskQuestions[currentIndex].tabledata && (
                  <div>
                    <p className="mt-3">{riskQuestions[currentIndex].info}</p>
                    <CSmartTable
                      items={riskQuestions[currentIndex].tabledata}
                      tableProps={{
                        hover: true,
                        responsive: true,
                      }}
                    />
                  </div>
                )}
                <CForm className="d-flex flex-column gap-3">
                  {riskQuestions[currentIndex].options.map((option, index) => {
                    return (
                      <CFormCheck
                        key={index}
                        button={{ color: "success", variant: "outline" }}
                        type="radio"
                        id={option._id}
                        autoComplete="off"
                        label={option.text}
                        checked={
                          riskQuestions[currentIndex]?.ans === option.value
                        }
                        onClick={() => {
                          handelNext(option.value);
                        }}
                      />
                    );
                  })}
                </CForm>
              </CCardBody>
            </CCard>
            {currentIndex > 3 && (
              <div className="d-flex flex-column  mt-3">
                <CIcon
                  size="3xl"
                  style={nextarrowStyle}
                  onClick={handelPrev}
                  icon={cilArrowLeft}
                ></CIcon>
                <h5>Previous</h5>
              </div>
            )}
          </div>
        )}
        {!!result && (
          <CCard
            style={{
              boxShadow: customStyles.boxShadow,
              marginBottom: "2rem",
            }}
          >
            <CCardBody>
              <h1>Result</h1>

              <CustomTable
                showHead={false}
                tableCellAlign={"left"}
                data={[
                  {
                    name: "Risk Profile",
                    status: result.status,
                    color: result.color,
                  },
                  {
                    name: "Risk Capacity",
                    status: capacityresult.status,
                    color: capacityresult.color,
                  },
                  {
                    name: "Risk Tolerance",
                    status: toleranceresult.status,
                    color: toleranceresult.color,
                  },
                ]}
                columns={[
                  {
                    header: "Risk Category",
                    accessor: ({ name }) => <h5 className="w-3">{name}</h5>,
                  },
                  {
                    header: "Staus",
                    accessor: ({ status, color }) => (
                      <h3 style={{ color: color }}>{status}</h3>
                    ),
                  },
                ]}
              />

              <form onSubmit={handelSubmitRiskScore}>
                <h4 className="mt-2 fw-bold">
                  Choose an Event and Create Portfolio
                </h4>
                <Select
                  value={event}
                  className="mt-2"
                  required
                  name="Event"
                  onChange={(e) => {
                    setEvent(e);
                    chooseStock(e);
                    // chooseRandomStock(result.status, 2);
                    // chooseRandomStock(capacityresult.status, 2);
                    // chooseRandomStock(toleranceresult.status, 2);
                  }}
                  options={events.map(({ eventId }) => ({
                    label: eventId?.name,
                    value: eventId?._id,
                  }))}
                />

                {!loading && event && (
                  <div className="mt-2">
                    <CFormInput
                      className="my-2"
                      type="text"
                      value={portfolioName}
                      onChange={(e) => setPortfolioName(e.target.value)}
                      required
                      placeholder="Enter Your Portfolio Name"
                    />

                    <div>
                      <Alert
                        sx={{ mt: "1em" }}
                        icon={<AccountBox fontSize="inherit" />}
                        color="success"
                        action={
                          <a
                            href="https://open-account.fyers.in/?utm-source=AP-Leads&utm-medium=AP1701"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "green" }}
                          >
                            <Button
                              sx={{ fontWeight: "bold" }}
                              variant="outlined"
                              color="inherit"
                              size="small"
                            >
                              Create account
                            </Button>
                          </a>
                        }
                      >
                        Want to create a trading account?
                      </Alert>
                      <Alert
                        sx={{ mt: "1em" }}
                        icon={<AccountBalance fontSize="inherit" />}
                        color="warning"
                        action={
                          <a
                            href="https://www.bondbazaar.com/open-trading-account/?param=UEFSMDU="
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "orange" }}
                          >
                            <Button
                              sx={{ fontWeight: "bold" }}
                              variant="outlined"
                              color="inherit"
                              size="small"
                            >
                              Create account
                            </Button>
                          </a>
                        }
                      >
                        Want to create a bond account?
                      </Alert>
                    </div>
                    <TabularNav
                      options={options}
                      state={viewState}
                      handleState={handleViewState}
                    />

                    {viewState === 0 && (
                      <div className="mt-2">
                        {categoryFound ? (
                          <CustomTable
                            data={portfolioStock}
                            columns={[
                              { header: "Stock Name", accessor: "companyName" },
                              { header: "Stock Symbol", accessor: "symbol" },
                              { header: "Value", accessor: "value" },
                              { header: "CAGR", accessor: "cagr" },
                            ]}
                          />
                        ) : (
                          <Typography>Stocks not found!</Typography>
                        )}
                      </div>
                    )}

                    {viewState === 1 && (
                      <div className="mt-2">
                        {mutualFundFound ? (
                          <CustomTable
                            data={portfolioMutualFunds}
                            columns={[
                              { header: "Mutual Fund Name", accessor: "name" },
                              { header: "Benchmark", accessor: "Benchmark" },
                            ]}
                          />
                        ) : (
                          <Typography>Mutual Fund not found!</Typography>
                        )}
                      </div>
                    )}

                    {viewState === 2 && (
                      <div className="mt-2">
                        {EtfData ? (
                          <CustomTable
                            data={EtfData}
                            columns={[
                              { header: "SYMBOL", accessor: "SYMBOL" },
                              {
                                header: "UNDERLYING ASSET",
                                accessor: "UNDERLYING ASSET",
                              },
                              { header: "NAV", accessor: "NAV" },
                              { header: "VOLUME", accessor: "VOLUME" },
                              { header: "30D % CHANGE", accessor: "30DCHNG" },
                            ]}
                          />
                        ) : (
                          <Typography>ETFs not found!</Typography>
                        )}
                      </div>
                    )}

                    {viewState === 3 && (
                      <div className="mt-2">
                        {BondData ? (
                          <CustomTable
                            data={BondData}
                            columns={[
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
                            ]}
                          />
                        ) : (
                          <Typography>Bonds not found!</Typography>
                        )}
                      </div>
                    )}

                    {/* <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>Stocks</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {categoryFound && (
                          <CustomTable
                            data={portfolioStock}
                            columns={[
                              { header: "Stock Name", accessor: "companyName" },
                              { header: "Stock Symbol", accessor: "symbol" },
                              { header: "Value", accessor: "value" },
                              { header: "CAGR", accessor: "cagr" },
                            ]}
                          />
                        )}
                        {!categoryFound && (
                          <Typography>Stocks not found!</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>Mutual Funds</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {mutualFundFound && (
                          <CustomTable
                            data={portfolioMutualFunds}
                            columns={[
                              { header: "Mutual Fund Name", accessor: "name" },
                              { header: "Benchmark", accessor: "Benchmark" },
                            ]}
                          />
                        )}
                        {!mutualFundFound && (
                          <Typography>Mutual Fund not found!</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion> */}
                  </div>
                )}

                {!loading && (
                  <div className="mt-3 d-flex justify-content-evenly">
                    <CButton
                      color="success"
                      className="text-white"
                      disabled={!mutualFundFound && !categoryFound}
                      type="submit"
                    >
                      Submit
                    </CButton>
                    <CButton
                      onClick={() => {
                        setResult(false);
                        setCurrentIndex(3);
                        setCapacityScore(0);
                        setToleranceScore(0);
                        cleardata();
                        setEvent("");
                      }}
                    >
                      Reset
                    </CButton>
                  </div>
                )}
                {(loading || isEtfLoading || isBondLoading) && <Loader />}
              </form>
            </CCardBody>
          </CCard>
        )}
      </CContainer>
    </CContainer>
  );
}
