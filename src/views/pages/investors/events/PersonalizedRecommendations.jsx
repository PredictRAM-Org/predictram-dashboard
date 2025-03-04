import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { VAR, portfolioResults } from "../../../../data";
import { getRiskScore } from "../../../../api/services/RiskScoreService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getBondsData,
  getEtfData,
  getStocksByCategory,
} from "../../../../api/services/Investors/InvestorEventService";

import CustomTable from "../../../../utils/CustomTable";
import { getInvestorEvents } from "../../../../api/services/Investors/InvestorEventService";
import { Alert, Button, Typography } from "@mui/material";
import { getStockPrice } from "../../../../api/services/EventService";
import { toast } from "react-toastify";
import { mutualFundGet } from "../../../../api/services/MutualFundService";
import { getCagr, getCategorizedStocks } from "../../../../data/cagrData";
import TabularNav from "../../../../components/TabularNav";
import { AccountBalance, AccountBox } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fyersQuotes } from "../../../../api/services/FyersService";
import Loader from "../../users/Loader";
import { eventPortfolioCreate } from "../../../../api/services/EventPortfolioService";
import { completeProfileSteps } from "../../../../api/services/InvestorService";

export default function PersonalizedRecommendations({
  result,
  recommendationModalOpen,
  setRecommendationModalOpen,
}) {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [categoryFound, setCategoryFound] = useState(false);
  const [mutualFundFound, setMutualFundFound] = useState(false);
  const investorId = useSelector((state) => state.investor._id);
  const { secretToken, mobileNumber, profileCompleted } = useSelector(
    (state) => state.investor
  );
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState("");
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

  const { data: stocks } = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
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
      return tempstocks;
    },
    staleTime: 60000 * 2,
  });

  useEffect(() => {
    getActiveEvents();
    stockDataFetch();
    //getMutualFundsData();
  }, []);

  const handelSubmitRiskScore = async (e) => {
    e.preventDefault();

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
      eventId: event,
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
  };

  const stockDataFetch = async () => {
    const jsonData = await getCategorizedStocks();
    setCategorizedStocks(jsonData);
  };

  const { data: EtfData, isEtfLoading } = useQuery({
    queryKey: ["etfData"],
    queryFn: async () => {
      const { data: etfData } = await getEtfData(setLoading, {
        category: result?.status,
      });
      const filteredEtfs = etfData.sort((a, b) => b["30DCHNG"] - a["30DCHNG"]);
      return filteredEtfs.slice(0, 10);
    },
    enabled: !!result,
    staleTime: 60000 * 2,
  });

  const { data: BondData, isBondLoading } = useQuery({
    queryKey: ["bondsData"],
    queryFn: async () => {
      const { data: BondData } = await getBondsData(setLoading, {
        category: result?.status,
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
    enabled: !!result,
    staleTime: 60000 * 2,
  });

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const chooseStock = async (id) => {
    try {
      setCategoryFound(false);
      setMutualFundFound(false);

      if (id && result) {
        const investorEvent = events?.filter((event) => event._id === id);

        if (!investorEvent || investorEvent.length === 0) {
          return;
        }

        setEvent(investorEvent[0]?.eventId?._id);

        const { data } = await getStocksByCategory(
          setLoading,
          investorEvent[0]?.eventId._id,
          {
            mobileNumber,
            secretToken,
          }
        );

        const { data: mutualFundData } = await mutualFundGet(
          setLoading,
          { Riskometer_Benchmark: result?.status },
          { secretToken, mobileNumber }
        );

        const chooseRandomMutualFunds = (mutualFundDataNo) => {
          const data = [];
          for (let i = 0; i < mutualFundDataNo; i++) {
            const j = Math.floor(Math.random() * mutualFundData?.length);
            data.push(mutualFundData[j]);
          }
          return data;
        };

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
            let foundStock = stocks?.find(
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

        const matchingStocks = data?.result?.find(
          (item) => item._id === result?.status
        );

        if (!matchingStocks && (!mutualFundData || !mutualFundData.length)) {
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

        if (mutualFundData && mutualFundData.length) {
          setMutualFundFound(true);
          setPortfolioMutualFunds(chooseRandomMutualFunds(6));
        }
      }
    } catch (error) {
      console.error("Error in chooseStock function:", error);
      toast.error("An error occurred while choosing stocks. Please try again.");
    }
  };

  useEffect(() => {
    chooseStock(id);
  }, [id, result, events, stocks]);

  const options = ["Stocks", "Mutual Funds", "ETFs", "Bonds"];
  const [activePage, setActivePage] = useState(1);

  const handleViewState = (state) => {
    setViewState(state);
    setActivePage(1);
  };

  return (
    <CForm>
      <CModal
        visible={recommendationModalOpen}
        onClose={() => {
          setRecommendationModalOpen(false);
        }}
      >
        <CModalHeader>
          <CModalTitle>Personalized Assets</CModalTitle>
        </CModalHeader>
        <CModalBody className="mx-2">
          <form onSubmit={handelSubmitRiskScore}>
            <h4 className="mt-2 fw-bold">Create Portfolio</h4>
            {!loading && (
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
              </div>
            )}
            {(loading || isEtfLoading || isBondLoading) && <Loader />}
          </form>
        </CModalBody>
      </CModal>
    </CForm>
  );
}
