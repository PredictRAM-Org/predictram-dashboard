import { useEffect, useState } from "react";
import { post, get, put } from "axios";
import { FixedSizeList as List } from "react-window";
import { Component } from "react";
import Loader from "./Loader";
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCollapse,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CCardText,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CWidgetStatsF,
  CLink,
  CFormCheck,
  CHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowRight, cilDollar, cilSwapVertical } from "@coreui/icons";
import { company, VAR } from "../../../data";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomSelect from "../../../utils/custom/CustomSelect";
import { DataObject } from "@mui/icons-material";
import { getStockPrice } from "../../../api/services/EventService";
import {
  deletePortfoliostock,
  getPortfoliostock,
  savePortfoliostock,
  updatePortfoliostock,
} from "../../../api/services/PortfolioService";
import { completeProfileSteps } from "../../../api/services/InvestorService";
import { eventPortfolioGet } from "../../../api/services/EventPortfolioService";
import { useQuery } from "@tanstack/react-query";
import VisualNoData from "../../../utils/VisualNoData";
import { getCagr, getCategorizedStocks } from "../../../data/cagrData";
import { fyersQuotes } from "../../../api/services/FyersService";

export default function Portfolio() {
  const uid = useSelector((state) => state.user.id);
  const [scrapper, setScrapper] = useState([]);
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [userstocks, setUserstocks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentstock, setCurrentStock] = useState({});
  const [removequantity, setRemoveQuantity] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  // const [portfolioOptions, setPortfolioOptions] = useState([]);
  const [viewPortfolio, setViewPortfolio] = useState(true);
  const [addToPortfolio, setAddToPortfolio] = useState(false);
  const [categorizedStocks, setCategorizedStocks] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [stocks, setStocks] = useState([]);

  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: userId, profileCompleted } = useSelector(
    (state) => state.investor
  );
  const [priceloading, setPriceLoading] = useState(false);

  async function handleChange(e) {
    setStock(scrapper.find((c) => c.symbol === e.label));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (stock === null) {
        toast.error("Please choose a stock");
      } else if (quantity < 1) {
        toast.error("Please enter a quantity greater than 0");
      } else {
        const data = {
          symbol: stock.symbol,
          ownerid: uid || userId,
          companyName: stock.symbol,
          var: parseFloat(VAR[stock.isin] || 20),
          totalquantity: parseFloat(quantity),
          totalinvested: parseFloat(quantity * stock.value),
          perstockprice: parseFloat(stock.value),
        };
        if (userId && !profileCompleted) {
          data.id = userId;
          await completeProfileSteps(setLoading, { id: userId, step: 2 });
        }
        await savePortfoliostock(
          setLoading,
          data,
          {
            secretToken,
            mobileNumber,
          },
          userId ? "investor" : "advisor"
        );
        setQuantity(0);
        setStock(null);
      }
    } catch (e) {}
  }

  async function removeStock(e) {
    const data = {
      symbol: currentstock.symbol,
      ownerid: uid || userId,
      totalquantity: currentstock.totalquantity - removequantity,
      totalinvested:
        currentstock.totalinvested -
        removequantity * currentstock.perstockprice,
    };
    if (userId) data.id = userId;
    if (removequantity <= 0) {
      toast.error("Please enter a quantity greater than 0");
    } else if (removequantity > currentstock.totalquantity) {
      toast.error(
        "Please enter a quantity less than or equal to your stock number"
      );
    } else if (removequantity === currentstock.totalquantity) {
      setVisible(false);
      await deletePortfoliostock(
        setLoading,
        data,

        {
          secretToken,
          mobileNumber,
        },

        userId ? "investor" : "advisor"
      );
      setRemoveQuantity(null);
    } else {
      setVisible(false);
      await updatePortfoliostock(
        setLoading,
        data,
        {
          secretToken,
          mobileNumber,
        },
        userId ? "investor" : "advisor"
      );
      setRemoveQuantity(null);
    }
  }

  const getPrice = (symbol) => {
    const s = scrapper && scrapper.find((c) => c?.symbol === symbol);
    return s.value;
  };

  const calprofitloss = (currentvalue, investedvalue) => {
    if (scrapper) {
      const ans = (currentvalue - investedvalue) / investedvalue;
      return (ans * 100).toFixed(2);
    }
  };

  const getTotalinvested = (stocks) => {
    let totalinvested = 0;
    stocks?.forEach((stock) => {
      totalinvested += stock?.totalinvested;
    });
    return totalinvested;
  };

  const getCurrentFyersTotal = async (stocks) => {
    setLoading(true);
    let symbols = stocks.map((stock) => stock.symbol);
    const fyersdata = await getFyersData(symbols.join(","));
    let total = 0;

    const updatedStocks = stocks.map((stock) => {
      const fyersStock = fyersdata.find((data) =>
        data.n.includes(stock.symbol)
      );
      if (fyersStock) {
        const currentPrice = fyersStock.v.lp;
        const totalValue = currentPrice * stock.totalquantity;
        total += totalValue;

        return {
          ...stock,
          currentPrice,
          totalValue,
        };
      }
      return stock;
    });

    setStocks(updatedStocks);
    setLoading(false);
    return total;
  };

  const getCurrenttotal = (stocks) => {
    let currenttotal = 0;
    if (scrapper) {
      stocks?.forEach((stock) => {
        let currentprice = scrapper?.find(
          (c) => c?.symbol === stock?.symbol
        ).value;
        currenttotal += currentprice * stock.totalquantity;
      });
    }
    return currenttotal || 0;
  };

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const totalprofitloss = (stocks) => {
    const ans =
      (currentTotal - getTotalinvested(stocks)) / getTotalinvested(stocks);
    return (ans * 100).toFixed(2);
  };

  const gettotalvar = (stocks) => {
    let totalvar = 0;
    let totalinvested = 0;
    if (scrapper) {
      stocks?.forEach((stock) => {
        let varvalue = (stock?.totalinvested * stock?.var) / 100;
        totalvar += varvalue;
        totalinvested += stock?.totalinvested;
      });
    }
    return (totalvar / totalinvested) * 100;
  };

  const calvarvalue = (VAR, invested) => {
    return ((invested * VAR) / 100).toFixed(2);
  };

  const getcurrentvaluerisk = (stocks) => {
    let totalvar = 0;
    if (scrapper) {
      stocks?.forEach((stock) => {
        let varvalue = (stock?.totalinvested * stock?.var) / 100;
        totalvar += varvalue;
      });
    }
    return totalvar;
  };

  const { data: portfolioOptions } = useQuery({
    queryKey: ["getPortfolios"],
    queryFn: async () => {
      const { data: portfolios } = await eventPortfolioGet(
        setPriceLoading,
        { ownerId: userId },
        { secretToken, mobileNumber }
      );
      const _options = portfolios?.map((p) => {
        return {
          label: p.portfolioName,
          value: p._id,
        };
      });
      return _options;
    },
    enabled: !loading,
    staleTime: 60000 * 2,
  });

  async function handlePortfolioSelect(e) {
    try {
      const { data } = await eventPortfolioGet(
        setPriceLoading,
        { _id: e.value },
        { secretToken, mobileNumber }
      );
      setPortfolio(data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const resetStates = () => {
    setPortfolio(null);
    setStock(null);
    setQuantity(0);
  };

  const handleViewPortfolioClick = () => {
    resetStates();
    setViewPortfolio(true);
    setAddToPortfolio(false);
  };

  const handleAddToPortfolioClick = () => {
    resetStates();
    setAddToPortfolio(true);
    setViewPortfolio(false);
  };

  const handleQuantityChange = (e) => {
    const enteredValue = e.target.value;
    if (enteredValue >= 0) {
      setQuantity(enteredValue);
    }
  };

  useEffect(() => {
    stockDataFetch();
  }, []);

  const stockDataFetch = async () => {
    const jsonData = await getCategorizedStocks();
    setCategorizedStocks(jsonData);
  };

  useEffect(() => {
    const userStock = async () => {
      try {
        const price = await getStockPrice(
          setPriceLoading,
          userId ? "investor" : "advisor",
          { secretToken, mobileNumber }
        );
        const result = await getPortfoliostock(
          setPriceLoading,
          userId ? { id: userId } : {},
          {
            secretToken,
            mobileNumber,
          },
          userId ? "investor" : "advisor"
        );
        setUserstocks(result);
        setScrapper(price);
        const _options = price.map((el) => {
          return {
            label: el.symbol,
            value: el.symbol,
          };
        });
        setOptions(_options);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    userStock();
  }, [loading]);

  useEffect(() => {
    const fetchCurrentTotal = async () => {
      if (!portfolio?.stocks.length) return;

      const total = await getCurrentFyersTotal(portfolio.stocks);
      setCurrentTotal(total);
    };

    fetchCurrentTotal();
  }, [portfolio]);

  return (
    <>
      <CCard
        className={"shadow-none border border-light"}
        style={{
          borderRadius: "0.625rem",
          padding: "1.25rem",
          margin: "0.5rem 0rem 0.5rem 0rem",
        }}
      >
        <CCardTitle>Portfolio actions</CCardTitle>
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          label="View portfolio"
          checked={viewPortfolio}
          onChange={handleViewPortfolioClick}
          defaultChecked
        />
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          label="Add to portfolio"
          checked={addToPortfolio}
          onChange={handleAddToPortfolioClick}
        />
      </CCard>
      {viewPortfolio && (
        <CCard
          className={"pb-0 shadow-none border border-light"}
          style={{
            borderRadius: "0.625rem",
            padding: "1.25rem",
            margin: "0.5rem 0rem 0.5rem 0rem",
          }}
        >
          <CCardBody className="">
            <CCardTitle className="d-flex justify-content-between align-items-center">
              <div>View Portfolio</div>
            </CCardTitle>

            <CRow
              className="align-items-center"
              xs={{ cols: 1 }}
              md={{ cols: 2 }}
            >
              <CCol className="">
                <p className="">Choose a portfolio</p>
                <CCollapse visible>
                  {!loading && portfolioOptions?.length > 0 && (
                    <CustomSelect
                      data={portfolioOptions}
                      handleChange={handlePortfolioSelect}
                    />
                  )}
                  {portfolioOptions?.length <= 0 && (
                    <div style={{ fontStyle: "italic" }}>
                      No portfolios found!
                    </div>
                  )}
                </CCollapse>
              </CCol>
            </CRow>

            {!loading ? (
              portfolio ? (
                portfolio && portfolio?.stocks?.length > 0 ? (
                  <div className="mt-3">
                    <CCardTitle className="d-flex my-2 justify-content-between align-items-center">
                      <div>Details of stocks:</div>
                    </CCardTitle>
                    <CRow xs={{ cols: 1 }} md={{ cols: 4 }}>
                      <CCol>
                        <CWidgetStatsF
                          className="mb-3"
                          color="primary"
                          icon={<div>TI</div>}
                          title="Total invested"
                          value={getTotalinvested(portfolio?.stocks).toFixed(2)}
                        />
                      </CCol>
                      <CCol>
                        <CWidgetStatsF
                          className="mb-3"
                          color="primary"
                          icon={<div>CT</div>}
                          title="Current Total Value"
                          // value={getCurrenttotal(portfolio?.stocks).toFixed(2)}
                          value={currentTotal.toFixed(2)}
                        />
                      </CCol>
                      <CCol>
                        <CWidgetStatsF
                          className="mb-3"
                          color="primary"
                          icon={<CIcon icon={cilSwapVertical} height={24} />}
                          title="Porfit/loss"
                          value={
                            totalprofitloss(portfolio?.stocks) >= 0 ? (
                              <span className="text-success">
                                +{totalprofitloss(portfolio?.stocks)}%
                              </span>
                            ) : (
                              <span className="text-danger">
                                {totalprofitloss(portfolio?.stocks)}%
                              </span>
                            )
                          }
                        />
                      </CCol>
                    </CRow>

                    {portfolio && !loading && (
                      <CTable responsive striped>
                        <CTableHead>
                          <CTableRow className="text-center">
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              COMAPNY NAME
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              CURRENT STOCK PRICE
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              QUANTITY
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              INVESTED
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              CURRENT VALUE
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="text-primary"
                            >
                              PROFIT/LOSS %
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {stocks?.map((stock, idx) => {
                            return (
                              <CTableRow key={idx}>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {stock?.symbol}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {stock?.currentPrice}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {stock?.totalquantity}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {stock?.totalinvested.toFixed(2)}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {stock?.totalValue}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                >
                                  {calprofitloss(
                                    stock.totalValue,
                                    stock?.totalinvested
                                  ) >= 0 ? (
                                    <span className="text-success">
                                      +
                                      {calprofitloss(
                                        stock.totalValue,
                                        stock?.totalinvested
                                      )}
                                      %
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      {calprofitloss(
                                        stock.totalValue,
                                        stock?.totalinvested
                                      )}
                                      %
                                    </span>
                                  )}
                                </CTableHeaderCell>
                              </CTableRow>
                            );
                          })}
                        </CTableBody>
                      </CTable>
                    )}
                    {visible && (
                      <CModal
                        visible={visible}
                        onClose={() => setVisible(false)}
                      >
                        <CModalHeader onClose={() => setVisible(false)}>
                          <CModalTitle>Remove Stock</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <h2>{currentstock.companyName}</h2>
                          <p className="fw-semibold">
                            You have {currentstock?.totalquantity} stocks
                          </p>
                          <CFormInput
                            onChange={(e) => setRemoveQuantity(e.target.value)}
                            value={removequantity}
                            id="inputQuantity"
                            type="number"
                            placeholder="Enter how many stock you want to remove"
                          />
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="secondary"
                            onClick={() => setVisible(false)}
                          >
                            Close
                          </CButton>
                          <CButton color="danger" onClick={removeStock}>
                            Remove
                          </CButton>
                        </CModalFooter>
                      </CModal>
                    )}
                  </div>
                ) : (
                  <div>No stocks data!</div>
                )
              ) : (
                <div>Please select a portfolio to continue!</div>
              )
            ) : (
              <Loader />
            )}

            {portfolio && portfolio?.mutualFunds?.length && (
              <>
                <CCardTitle className="d-flex my-2 justify-content-between align-items-center">
                  <div>Details of mutual funds:</div>
                </CCardTitle>
                <CTable responsive striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col" className="text-primary">
                        MF NAME
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-primary">
                        NAV REGULAR
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-primary">
                        NAV DIRECT
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-primary">
                        RISKOMETER BENCHMARK
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-primary">
                        RISKOMETER SCHEME
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {portfolio?.mutualFunds?.map((mf, idx) => {
                      return (
                        <CTableRow key={idx}>
                          <CTableHeaderCell scope="col">
                            {mf?.name}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {mf?.NAV_Regular}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {mf?.NAV_Direct}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {mf?.Riskometer_Benchmark}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {mf?.Riskometer_Scheme}
                          </CTableHeaderCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </>
            )}
          </CCardBody>
        </CCard>
      )}

      {addToPortfolio && (
        <CCard
          className={"pb-0 shadow-none border border-light"}
          style={{
            borderRadius: "0.625rem",
            padding: "1.25rem",
            margin: "0.5rem 0rem 0.5rem 0rem",
          }}
        >
          <CCardBody className="p-0">
            <CCardTitle className="d-flex  justify-content-between align-items-center">
              <div>Your Portfolio</div>
            </CCardTitle>

            <CForm onSubmit={handleSubmit}>
              <CRow
                className="align-items-center"
                xs={{ cols: 1 }}
                md={{ cols: 2 }}
              >
                <CCol>
                  <p className="ml-3">Choose stock</p>
                  <CCollapse visible>
                    <CustomSelect data={options} handleChange={handleChange} />
                  </CCollapse>
                </CCol>
                <CCol>
                  <p>Choose Stock Quantity</p>
                  <CFormInput
                    onChange={handleQuantityChange}
                    value={quantity}
                    id="inputQuantity"
                    type="number"
                    placeholder="Enter stock quantity"
                  />
                </CCol>
              </CRow>
              <CButton
                type="submit"
                color="primary"
                variant="outline"
                className="m-2"
              >
                ADD to portfolio
              </CButton>
            </CForm>

            {stock && (
              <CCard style={{ width: "18rem" }} className="m-2">
                <CCardBody>
                  <CCardTitle>{stock?.companyName}</CCardTitle>
                  <p>{stock?.symbol}</p>
                  <CCardText>
                    Stock Price: {stock?.value}
                    <br />
                    Stock VAR: {VAR[stock?.isin] || 20}
                    <br />
                    You choose {quantity > 0 ? quantity : 0} stocks
                    <br />
                    Total Stock Price:{" "}
                    {quantity > 0 ? (stock?.value * quantity).toFixed(2) : 0}
                  </CCardText>
                </CCardBody>
              </CCard>
            )}

            {!loading ? (
              userstocks?.length > 0 && (
                <div className="mt-3">
                  <CRow>
                    <CCol>
                      <CWidgetStatsF
                        className="mb-3"
                        color="primary"
                        footer={
                          <CLink
                            className="font-weight-bold font-xs text-medium-emphasis"
                            href="/viewetokens"
                          >
                            Buy Token
                            <CIcon
                              icon={cilArrowRight}
                              className="float-end"
                              width={16}
                            />
                          </CLink>
                        }
                        icon={<div>VAR</div>}
                        title="Value At Risk"
                        value={getcurrentvaluerisk(userstocks).toFixed(2)}
                      />
                    </CCol>
                  </CRow>
                  <CRow xs={{ cols: 1 }} md={{ cols: 4 }}>
                    <CCol>
                      <CWidgetStatsF
                        className="mb-3"
                        color="primary"
                        icon={<div>TI</div>}
                        title="Total invested"
                        value={getTotalinvested(userstocks).toFixed(2)}
                      />
                    </CCol>
                    <CCol>
                      <CWidgetStatsF
                        className="mb-3"
                        color="primary"
                        icon={<div>CT</div>}
                        title="Current Total Value"
                        value={getCurrenttotal(userstocks).toFixed(2)}
                      />
                    </CCol>
                    <CCol>
                      <CWidgetStatsF
                        className="mb-3"
                        color="primary"
                        icon={<div>PV</div>}
                        title="Portfolio Var"
                        value={gettotalvar(userstocks).toFixed(2)}
                      />
                    </CCol>
                    <CCol>
                      <CWidgetStatsF
                        className="mb-3"
                        color="primary"
                        icon={<CIcon icon={cilSwapVertical} height={24} />}
                        title="Porfit/loss"
                        value={
                          totalprofitloss(userstocks) >= 0 ? (
                            <span className="text-success">
                              +{totalprofitloss(userstocks)}%
                            </span>
                          ) : (
                            <span className="text-danger">
                              {totalprofitloss(userstocks)}%
                            </span>
                          )
                        }
                      />
                    </CCol>
                  </CRow>
                  <CTable responsive striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col" className="text-primary">
                          COMAPNY NAME
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          CURRENT STOCK PRICE
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          QUANTITY
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          INVESTED
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          CURRENT VALUE
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          VAR
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          VAR value
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          PROFIT/LOSS %
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          CAGR
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-primary">
                          REMOVE STOCK
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {userstocks.map((stock, idx) => {
                        return (
                          <CTableRow key={idx}>
                            <CTableHeaderCell scope="col">
                              {stock?.symbol}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {getPrice(stock?.symbol)}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {stock?.totalquantity}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {stock?.totalinvested.toFixed(2)}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {(
                                getPrice(stock?.symbol) * stock?.totalquantity
                              ).toFixed(2)}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {stock?.var}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {calvarvalue(stock?.var, stock?.totalinvested)}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {calprofitloss(
                                getPrice(stock?.symbol) * stock?.totalquantity,
                                stock?.totalinvested
                              ) >= 0 ? (
                                <span className="text-success">
                                  +
                                  {calprofitloss(
                                    getPrice(stock?.symbol) *
                                      stock?.totalquantity,
                                    stock?.totalinvested
                                  )}
                                  %
                                </span>
                              ) : (
                                <span className="text-danger">
                                  {calprofitloss(
                                    getPrice(stock?.symbol) *
                                      stock?.totalquantity,
                                    stock?.totalinvested
                                  )}
                                  %
                                </span>
                              )}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              {getCagr(stock, categorizedStocks)}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              <CButton
                                color="danger"
                                variant="outline"
                                onClick={() => {
                                  setVisible(!visible);
                                  setCurrentStock(stock);
                                }}
                              >
                                Remove
                              </CButton>
                            </CTableHeaderCell>
                          </CTableRow>
                        );
                      })}
                    </CTableBody>
                  </CTable>
                  {visible && (
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Remove Stock</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <h2>{currentstock.companyName}</h2>
                        <p className="fw-semibold">
                          You have {currentstock?.totalquantity} stocks
                        </p>
                        <CFormInput
                          onChange={(e) => setRemoveQuantity(e.target.value)}
                          value={removequantity}
                          id="inputQuantity"
                          type="number"
                          placeholder="Enter how many stock you want to remove"
                        />
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="secondary"
                          onClick={() => setVisible(false)}
                        >
                          Close
                        </CButton>
                        <CButton color="danger" onClick={removeStock}>
                          Remove
                        </CButton>
                      </CModalFooter>
                    </CModal>
                  )}
                </div>
              )
            ) : (
              <Loader />
            )}
          </CCardBody>
        </CCard>
      )}
    </>
  );
}
