import { cilSwapVertical } from "@coreui/icons-pro";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCloseButton,
  CCol,
  CCollapse,
  CForm,
  CFormInput,
  CImage,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsF,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChart } from "@coreui/react-chartjs";
import {
  Alert,
  Box,
  Chip,
  Container,
  Modal,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import InfoIcon from "@mui/icons-material/Info";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getStockPrice } from "../../../api/services/EventService";
import {
  getPortfolioManagementReport,
  getSpecificPortfolioManagementEvent,
  getUserPortfolioManagement,
  submitPortfolioManagementEvent,
} from "../../../api/services/PortfolioMangementService";
import { VAR } from "../../../data";
import CustomSelect from "../../../utils/custom/CustomSelect";
import Loader from "../users/Loader";
import RiskInsightImage from "../../../assets/images/risk_insights.jpeg";
import { CModal } from "@coreui/react-pro";
import CustomTable from "../../../utils/CustomTable";
import stockVolume from "../../../data/stockVolume";
import { fyersQuotes } from "../../../api/services/FyersService";

function PortfolioManagementEventSubmit() {
  const { id } = useParams();
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stockInfoVisible, setStockInfoVisible] = useState(false);
  const [stockName, setStockName] = useState("");
  const [portfolioEvent, setPortfolioEvent] = useState();
  const [stockOptions, setStockOptions] = useState();
  const [stock, setStock] = useState();
  const [scrapper, setScrapper] = useState([]);
  const [userStocks, setUserStocks] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [portfolioReportSubmitted, setPortfolioReportSubmitted] =
    useState(false);
  const [portfolioStopSubmission, setPortfolioStopSubmission] = useState(false);
  const [
    amountRemainingForPortfolioCreation,
    setAmountRemainingForPortfolioCreation,
  ] = useState();
  const [currentStockTotalPrice, setCurrentStockTotalPrice] = useState();
  const [stocks, setStocks] = useState([]);

  const actions = [
    {
      icon: <HistoryEduIcon />,
      name: "Write Report",
      onClick: () => {
        history.push(`/portfolio/management/report/create/${id}`);
      },
    },
    {
      icon: <WysiwygIcon />,
      name: "View Report",
      onClick: () => {
        history.push(`/portfolio/management/report/view/${id}`);
      },
      disabled: !portfolioReportSubmitted,
    },
  ];

  const stopSubmission = () => {
    setPortfolioStopSubmission(true);
  };

  useEffect(() => {
    if (portfolioEvent) {
      const _expiryDate = new Date(portfolioEvent.endDate).valueOf();
      const _currentDate = new Date().valueOf();
      if (_currentDate >= _expiryDate) {
        stopSubmission();
      }
    }
  }, [portfolioEvent]);

  const getPortfolioEvent = async () => {
    const {
      data: [portfolioEventData],
    } = await getSpecificPortfolioManagementEvent(setLoading, id);
    setPortfolioEvent(portfolioEventData);
  };

  const getUserPortfolioReport = async () => {
    const params = { event: id, userId };
    const { data = {} } = await getPortfolioManagementReport(
      setLoading,
      params
    );

    if (Object.keys(data).length > 0) {
      setPortfolioReportSubmitted(true);
    }
  };

  useEffect(() => {
    getPortfolioEvent();
    getUserPortfolioReport();
  }, [id]);

  const getRemainingAmountForPortfolioCreation = (
    currentPortfolioAmount = 0
  ) => {
    const remainingAmount =
      portfolioEvent?.totalPortfolioPrice - currentPortfolioAmount;
    setAmountRemainingForPortfolioCreation(remainingAmount);
  };

  useEffect(() => {
    getRemainingAmountForPortfolioCreation(getTotalInvested().toFixed(2));
  }, [userStocks, portfolioEvent]);

  const getAllStocks = async () => {
    const price = await getStockPrice(setLoading, "advisor", {});
    setScrapper(price);
    const _options = price.map((el) => {
      return {
        label: el.symbol,
        value: el.symbol,
      };
    });
    setStockOptions(_options);
  };

  useEffect(() => {
    getAllStocks();
  }, []);

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

  useEffect(() => {
    const fetchCurrentTotal = async () => {
      if (!userStocks.length) return;

      await getCurrentFyersTotal(userStocks);
    };

    fetchCurrentTotal();
  }, [userStocks]);

  const getUserPortfolioStock = async () => {
    const params = { id, userId };
    const { data } = await getUserPortfolioManagement(setLoading, params);
    setUserStocks(data);
  };

  useEffect(() => {
    getUserPortfolioStock();
  }, []);

  // const getPrice = (symbol) => {
  //   const s = scrapper && scrapper.find((c) => c?.symbol === symbol);
  //   return s?.value;
  // };

  const calprofitloss = (currentvalue, investedvalue) => {
    if (scrapper) {
      const ans = (currentvalue - investedvalue) / investedvalue;
      return (ans * 100)?.toFixed(2);
    }
  };

  const getTotalInvested = () => {
    let totalinvested = 0;
    userStocks?.forEach((stock) => {
      totalinvested += stock?.totalinvested;
    });
    return totalinvested;
  };

  const getCurrenttotal = () => {
    let currenttotal = 0;
    if (scrapper) {
      // userStocks.forEach((stock) => {
      //   let currentprice = scrapper?.find(
      //     (c) => c?.symbol === stock?.symbol
      //   )?.value;
      //   currenttotal += currentprice * stock.totalquantity;
      // });
      stocks.forEach((stock) => {
        currenttotal += stock.currentPrice * stock.totalquantity;
      });
    }
    return currenttotal;
  };

  const totalprofitloss = () => {
    const ans = (getCurrenttotal() - getTotalInvested()) / getTotalInvested();
    return (ans * 100)?.toFixed(2);
  };

  const gettotalvar = () => {
    let totalvar = 0;
    let totalinvested = 0;
    if (scrapper) {
      userStocks?.forEach((stock) => {
        let varvalue = (stock?.totalinvested * stock?.var) / 100;
        totalvar += varvalue;
        totalinvested += stock?.totalinvested;
      });
    }
    return (totalvar / totalinvested) * 100;
  };

  const calvarvalue = (VAR, invested) => {
    return ((invested * VAR) / 100)?.toFixed(2);
  };

  const getcurrentvaluerisk = () => {
    let totalvar = 0;
    if (scrapper) {
      userStocks.forEach((stock) => {
        let varvalue = (stock?.totalinvested * stock?.var) / 100;
        totalvar += varvalue;
      });
    }
    return totalvar;
  };

  const getFyersData = async (stocks) => {
    const { data } = await fyersQuotes({ symbols: stocks });
    return data.data.d;
  };

  const handleChange = async (e) => {
    let symbols = [e.label];
    const fyersdata = await getFyersData(symbols.join(","));
    const stock = scrapper.find((c) => c.symbol === e.label);

    if (stock) {
      const updatedStock = { ...stock, value: fyersdata[0].v.lp };
      setStock(updatedStock);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (currentStockTotalPrice > amountRemainingForPortfolioCreation) {
      //   throw new Error(
      //     "Your portfolio value should not exceed the total portfolio price"
      //   );
      // }
      if (stock === null) {
        throw new Error("Please choose a stock");
      } else if (quantity < 1) {
        throw new Error("Please enter a quantity greater than 0");
      } else {
        if (!userId)
          throw new Error("Some error occured, please refresh your page");
        const data = {
          id,
          userId,
          newPortfolio: {
            symbol: stock.symbol,
            ownerid: userId,
            companyName: stock.symbol,
            var: parseFloat(VAR[stock.isin] || 20),
            totalquantity: parseFloat(quantity),
            totalinvested: parseFloat(quantity * stock.value),
            perstockprice: parseFloat(stock.value),
          },
        };
        await submitPortfolioManagementEvent(setLoading, data);
        setQuantity(0);
        setStock(null);
        getUserPortfolioStock();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleModalOpen = () => {
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const calculateTotalStockPrice = () => {
    const _totalStockPrice = (stock?.value * quantity)?.toFixed(2);
    setCurrentStockTotalPrice(_totalStockPrice);
  };

  useEffect(() => {
    calculateTotalStockPrice();
  }, [stock, quantity]);

  return (
    <Container sx={{ position: "relative" }} fluid>
      {loading && <Loader />}
      {!loading && (
        <>
          {portfolioStopSubmission && (
            <Alert sx={{ mb: "2em" }} severity="error">
              This event has already ended and you can no longer submit report
              and portfolio
            </Alert>
          )}
          <CModal
            backdrop={true}
            alignment="center"
            visible={visible}
            onClose={handleModalClose}
          >
            <CModalHeader closeButton={false} onClose={handleModalClose}>
              <CModalTitle>Risk Insights</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CImage
                className="shadow"
                rounded
                src={RiskInsightImage}
                width="100%"
                height={200}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={handleModalClose}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
          <CModal
            backdrop={true}
            alignment="center"
            visible={stockInfoVisible}
            onClose={() => setStockInfoVisible(false)}
            style={{ padding: 10 }}
          >
            <p>Choose Stock </p>
            <CFormInput
              onChange={(e) => {
                setStockName(e.target.value);
              }}
              style={{ marginBottom: 4 }}
              placeholder="Enter stock name"
            />
            <CustomTable
              data={stockVolume.filter((stock) =>
                stock["Stock Name - Interpretation"]
                  .toLocaleLowerCase()
                  .includes(stockName.toLocaleLowerCase())
              )}
              columns={[
                {
                  header: "Stock Name - Interpretation",
                  accessor: "Stock Name - Interpretation",
                },
                { header: "Symbol - Volume", accessor: "Symbol - Volume" },
              ]}
            />
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => setStockInfoVisible(false)}
              >
                Close
              </CButton>
            </CModalFooter>
          </CModal>
          <CChart
            type="bar"
            height="80vh"
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: ["Portfolio Risk", "Risk Capacity"],
              datasets: [
                {
                  backgroundColor: ["#321FDB", "#3399FF", "#F9B115"],
                  data: [
                    portfolioEvent?.portfolioRisk,
                    portfolioEvent?.idealRisk,
                  ],
                },
              ],
            }}
          />
          <CRow className="g-4 my-4">
            <CCol md={4} sm={12}>
              <CCard>
                <CCardBody>
                  <div className="text-1 bold">
                    {portfolioEvent?.totalPortfolioPrice}
                  </div>
                  <CCardText className="text-3 mt-2">
                    Total Portfolio Price
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4} sm={12}>
              <CCard>
                <CCardBody>
                  <div className="text-1 bold">
                    {portfolioEvent?.portfolioRisk}
                  </div>
                  <CCardText className="text-3 mt-2">
                    Portfolio Risk(%)
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4} sm={12}>
              <CCard>
                <CCardBody>
                  <div style={{ position: "relative" }}>
                    <div className="text-1 bold">
                      {portfolioEvent?.idealRisk}
                    </div>
                    <CCardText className="text-3 mt-2">Risk Capacity</CCardText>
                    <InfoIcon
                      onClick={handleModalOpen}
                      style={{ position: "absolute", top: 0, right: 0 }}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {portfolioReportSubmitted && (
            <Alert sx={{ mb: "2em" }} severity="success">
              You have successfully submitted your portfolio report
            </Alert>
          )}
          <CCard>
            <CCardBody>
              <Stack direction="row" spacing={1}>
                {portfolioEvent?.portfolioStocks?.map((stocks) => (
                  <Chip label={stocks?.companyName} color="primary" />
                ))}
              </Stack>
              <CCardText className="text-3 mt-2">Stocks Owned</CCardText>
            </CCardBody>
          </CCard>
          <CCard style={{ marginTop: "2em" }}>
            <CCardHeader>
              <CCardTitle>Comment</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CCardText className="text-3 mt-2">
                {portfolioEvent?.comment}
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard className="my-4">
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow
                  className="align-items-center"
                  xs={{ cols: 1 }}
                  md={{ cols: 2 }}
                >
                  <CCol>
                    <p className="ml-3">Choose stock</p>
                    <CCollapse visible>
                      <CustomSelect
                        data={stockOptions}
                        handleChange={handleChange}
                      />
                      <InfoIcon
                        onClick={() => setStockInfoVisible(true)}
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          right: 0,
                          margin: 6,
                        }}
                      />
                    </CCollapse>
                  </CCol>
                  <CCol>
                    <p>Choose Stock Quantity</p>
                    <CFormInput
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      id="inputQuantity"
                      type="number"
                      placeholder="Enter stock quantity"
                    />
                  </CCol>
                </CRow>
                <CButton
                  type="submit"
                  disabled={portfolioStopSubmission}
                  color="primary"
                  variant="outline"
                  className="m-2"
                >
                  ADD to portfolio
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
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
                  Total Stock Price: {quantity > 0 ? currentStockTotalPrice : 0}
                </CCardText>
              </CCardBody>
            </CCard>
          )}
          {!loading ? (
            userStocks?.length > 0 && (
              <div className="mt-3">
                <CRow>
                  <CCol>
                    <CWidgetStatsF
                      className="mb-3"
                      color="primary"
                      icon={<div>VAR</div>}
                      title="Value At Risk"
                      value={getcurrentvaluerisk().toFixed(2)}
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
                      value={getTotalInvested().toFixed(2)}
                    />
                  </CCol>
                  <CCol>
                    <CWidgetStatsF
                      className="mb-3"
                      color="primary"
                      icon={<div>CT</div>}
                      title="Current Total Value"
                      value={getCurrenttotal().toFixed(2)}
                    />
                  </CCol>
                  <CCol>
                    <CWidgetStatsF
                      className="mb-3"
                      color="primary"
                      icon={<div>PV</div>}
                      title="Portfolio Var"
                      value={gettotalvar().toFixed(2)}
                    />
                  </CCol>
                  <CCol>
                    <CWidgetStatsF
                      className="mb-3"
                      color="primary"
                      icon={<CIcon icon={cilSwapVertical} height={24} />}
                      title="Porfit/loss"
                      value={
                        totalprofitloss() >= 0 ? (
                          <span className="text-success">
                            +{totalprofitloss()}%
                          </span>
                        ) : (
                          <span className="text-danger">
                            {totalprofitloss()}%
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
                      {/* <CTableHeaderCell scope="col" className="text-primary">
                        REMOVE STOCK
                      </CTableHeaderCell> */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {stocks?.map((stock) => {
                      return (
                        <CTableRow>
                          <CTableHeaderCell scope="col">
                            {stock?.symbol}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {stock?.currentPrice}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {stock?.totalquantity}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {stock?.totalinvested.toFixed(2)}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {stock?.totalValue}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {stock?.var}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {calvarvalue(stock?.var, stock?.totalinvested)}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {calprofitloss(
                              stock?.totalValue,
                              stock?.totalinvested
                            ) >= 0 ? (
                              <span className="text-success">
                                +
                                {calprofitloss(
                                  stock?.totalValue,
                                  stock?.totalinvested
                                )}
                                %
                              </span>
                            ) : (
                              <span className="text-danger">
                                {calprofitloss(
                                  stock?.totalValue,
                                  stock?.totalinvested
                                )}
                                %
                              </span>
                            )}
                          </CTableHeaderCell>
                          {/* <CTableHeaderCell scope="col">
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
                          </CTableHeaderCell> */}
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
                {!portfolioStopSubmission && (
                  <SpeedDial
                    ariaLabel="Write portfolio report"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.onClick}
                      />
                    ))}
                  </SpeedDial>
                )}
              </div>
            )
          ) : (
            <Loader />
          )}
        </>
      )}
    </Container>
  );
}

export default PortfolioManagementEventSubmit;
