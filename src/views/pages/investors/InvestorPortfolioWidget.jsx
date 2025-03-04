import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getStockPrice } from "../../../api/services/EventService";
import { FyersHoldings } from "../../../api/services/FyersService";
import "../../../assets/css/Fontsize.css";
import importportfolioImg from "../../../assets/images/portfolio_background.svg";
import BrokerConnect from "../../../components/BrokerConnect";
import {
  checkAccessToken,
  fyers_access_token_key,
  fyers_refresh_token_key,
  handelFyersLogin,
  loginwithFyersAuthCode,
  loginwithFyersRefreshToken,
} from "../../../utils/custom/fyersLogin";
import VisualNoData from "../../../utils/VisualNoData";
import { VAR } from "../../../data/VAR";
import { getRiskScore } from "../../../api/services/RiskScoreService";
import { useDispatch, useSelector } from "react-redux";
import { getPortfoliostock } from "../../../api/services/PortfolioService";
import {
  checkPaytmAccessToken,
  generateAccessToken,
  paytmMoney_access_token_key,
} from "../../../utils/custom/paytmMoneyLogin";

function InvestorPortfolioWidget() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("auth_code");
  const requestToken = queryParams.get("requestToken");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [fyerslogin, setFyerslogin] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [fyersHoldings, setFyersHoldings] = useState([]);
  const [portfolioVAR, setPortfolioVAR] = useState(0);
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);
  const paytmMoney_access_token = localStorage.getItem(
    paytmMoney_access_token_key
  );
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const { _id: userId } = useSelector((state) => state.investor);
  const [idealRisk, setIdealRisk] = useState(0);
  const [scrapper, setScrapper] = useState([]);
  const [userstocks, setUserstocks] = useState([]);
  const [virtualPortfolioRisk, setVirtualPortfolioRisk] = useState(0);
  const [totalPortfolioRisk, setTotalPortfolioRisk] = useState(0);
  const history = useHistory();

  const getFyersHolding = async () => {
    const data = await FyersHoldings(setLoading, fyers_access_token);
    const price = await getStockPrice(
      setLoading,
      userId ? "investor" : "advisor",
      { secretToken, mobileNumber }
    );
    if (data?.expired) {
      loginwithFyersRefreshToken(fyers_refresh_token, setLoading);
    } else {
      setFyersHoldings(data?.holdings?.holdings);

      let totalVar = 0;
      let totalInvested = 0;
      data?.holdings?.holdings?.map((holding) => {
        let symbol = holding?.symbol
          .replace(/NSE[:]/gi, "")
          .replace(/[-]EQ/gi, "");
        let stockInfo = price.find((stock) => stock?.symbol === symbol);
        let varvalue = (holding.costPrice * (VAR[stockInfo?.isin] || 20)) / 100;
        totalVar += varvalue;
        totalInvested += holding.costPrice;
      });
      const portfoliovar = (totalVar / totalInvested) * 100;

      setPortfolioVAR(portfoliovar?.toFixed(2));
    }
  };

  const portfolioDetails = async () => {
    const price = await getStockPrice(
      setLoading,
      userId ? "investor" : "advisor",
      { secretToken, mobileNumber }
    );
    const result = await getPortfoliostock(
      setLoading,
      userId ? { id: userId } : {},
      {
        secretToken,
        mobileNumber,
      },
      userId ? "investor" : "advisor"
    );
    const riskData = await getRiskScore(
      setLoading,
      { id: userId },
      { secretToken, mobileNumber },
      userId ? "investor" : "advisor"
    );
    if (riskData?.data?.length) {
      setIdealRisk(
        Number(riskData?.data[0]?.riskScores?.riskProfile)?.toFixed(2)
      );
    }
    setUserstocks(result);
    setScrapper(price);
  };

  useEffect(() => {
    if (userId) {
      portfolioDetails();
    }
  }, [userId]);

  const gettotalvar = () => {
    let totalvar = 0;
    let totalinvested = 0;
    if (scrapper) {
      userstocks?.forEach((stock) => {
        let varvalue = (stock?.totalinvested * stock?.var) / 100;
        totalvar += varvalue;
        totalinvested += stock?.totalinvested;
      });
    }
    return (totalvar / totalinvested) * 100;
  };

  const _virtualPortfolioRisk = Number(gettotalvar()?.toFixed(2));

  useEffect(() => {
    if (!_virtualPortfolioRisk) return;
    setVirtualPortfolioRisk(_virtualPortfolioRisk);
  }, [_virtualPortfolioRisk]);

  useEffect(() => {
    if (portfolioVAR || virtualPortfolioRisk) {
      setTotalPortfolioRisk(
        Number(portfolioVAR || 0) + Number(virtualPortfolioRisk || 0)
      );
    }
  }, [portfolioVAR, virtualPortfolioRisk]);

  useEffect(() => {
    if (totalPortfolioRisk <= 0 || idealRisk <= 0) return;
    dispatch({
      type: "INVESTOR_RISKS_UPDATED",
      payload: {
        investorVAR: totalPortfolioRisk,
        investorIdealRisk: idealRisk,
      },
    });
  }, [totalPortfolioRisk, idealRisk]);

  useEffect(() => {
    if (fyers_access_token && fyers_refresh_token) {
      setFyerslogin(true);
      checkAccessToken(fyers_access_token, fyers_refresh_token, setLoading);
      getFyersHolding();
    } else if (paytmMoney_access_token) {
      checkPaytmAccessToken(paytmMoney_access_token, setLoading);
      //getHoldings
    } else if (requestToken) {
      generateAccessToken(requestToken, setLoading);
    } else if (code) {
      loginwithFyersAuthCode(code, setLoading, userId);
    }
  }, []);

  return (
    <CCard
      className={"pb-0 shadow-none border border-light card-dashboard mt-3"}
    >
      <CCardTitle className="text-2">Your Portfolio Risks</CCardTitle>
      <CCardBody className="p-4">
        {fyerslogin || virtualPortfolioRisk > 0 ? (
          fyersHoldings.length !== 0 || virtualPortfolioRisk > 0 ? (
            <CRow className="justify-content-md-evenly align-items-center">
              <CCol>
                <CChart
                  type="bar"
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={{
                    labels: ["Your VAR", "Risk Capacity"],
                    datasets: [
                      {
                        backgroundColor: ["#321FDB", "#3399FF", "#F9B115"],
                        data: [totalPortfolioRisk, idealRisk, 100],
                      },
                    ],
                  }}
                />
              </CCol>
              <CCol>
                <p className="fw-bold">
                  Your VAR : {totalPortfolioRisk} <br />
                  Ideal Risk : {idealRisk}
                </p>
                <p className="fw-semibold text-muted">
                  {portfolioVAR !== idealRisk
                    ? "Your Portfolio Risk Does not match with your risk appetite"
                    : "Your Risk is matched with your risk appetite"}
                </p>
                {/* <div
                  className="d-flex align-items-center gap-3"
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    className="link-3"
                    to="/investor/portfolio/your-risk"
                    style={{ textDecoration: "none" }}
                  >
                    View Details
                  </Link>
                  <CIcon size="xl" icon={cilArrowRight}></CIcon>
                </div> */}
              </CCol>
            </CRow>
          ) : (
            <div>
              <VisualNoData message={"You dont have any holdings"} />
            </div>
          )
        ) : (
          <CRow className="justify-content-md-evenly align-items-center flex-wrap mx-auto">
            <img className="card-img" src={importportfolioImg} alt="..." />

            <CButton
              className="mt-4 card-button"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Know Your Portfolio Risk
            </CButton>
          </CRow>
        )}
      </CCardBody>
      {openmodal && (
        <BrokerConnect
          setLoading={setLoading}
          setVisible={setOpenModal}
          visible={openmodal}
          handelFyersLogin={() => handelFyersLogin(window.location.origin)}
        />
      )}
    </CCard>
  );
}

export default InvestorPortfolioWidget;
