import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomSelect from "../../../utils/custom/CustomSelect";
import { getStockPrice } from "../../../api/services/EventService";
import { createPortfolioManagementEvent } from "../../../api/services/PortfolioMangementService";
import { useSelector } from "react-redux";
import { getRiskScore } from "../../../api/services/RiskScoreService";
import { getPortfoliostock } from "../../../api/services/PortfolioService";

function CreatePortfolioManagementEvent() {
  const [portfolioEvent, setPortfolioEvent] = useState({});
  const [stockOptions, setStockOptions] = useState();
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const investor = useSelector((state) => state.investor);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const [userstocks, setUserstocks] = useState([]);
  // const { id } = useParams();

  const handleInputChange = (e) => {
    const inputType = e.target.type;
    const inputValue =
      inputType === "date"
        ? new Date(e.target.value).toISOString()
        : inputType === "number"
        ? Number(e.target.value)
        : e.target.value;
    setPortfolioEvent({
      ...portfolioEvent,
      [e.target.name]: inputValue,
    });
  };

  const getAllStocks = async () => {
    const price = await getStockPrice(
      setLoading,
      investor?._id ? "investor" : "advisor",
      { secretToken, mobileNumber }
    );

    const _options = price.map((el) => {
      return {
        label: el.symbol,
        value: el.symbol,
      };
    });
    setStockOptions(_options);
  };

  const gettotalvar = () => {
    let totalvar = 0;
    let totalinvested = 0;

    userstocks?.forEach((stock) => {
      let varvalue = (stock?.totalinvested * stock?.var) / 100;
      totalvar += varvalue;
      totalinvested += stock?.totalinvested;
    });

    setPortfolioEvent({
      ...portfolioEvent,
      portfolioRisk: Number(((totalvar / totalinvested) * 100)?.toFixed(2)),
      ...(Boolean(totalinvested > 0) && { totalPortfolioPrice: totalinvested }),
    });
  };

  const setDefaultData = async () => {
    //set ideal risk
    const {
      data: [risk],
    } = await getRiskScore(
      setLoading,
      { id: investor._id },
      { secretToken, mobileNumber },
      investor?._id ? "investor" : "advisor"
    );

    if (risk?.riskScores) {
      setPortfolioEvent({
        ...portfolioEvent,
        idealRisk: Number(risk?.riskScores?.riskProfile)?.toFixed(2),
      });
    }

    //set portfolio stock
    const stocksData = await getPortfoliostock(
      setLoading,
      investor?._id ? { id: investor._id } : {},
      {
        secretToken,
        mobileNumber,
      },
      investor?._id ? "investor" : "advisor"
    );

    setUserstocks(stocksData);
    setPortfolioStocks(
      stocksData.map((stock) => {
        return {
          label: stock.symbol,
          value: stock.symbol,
        };
      })
    );
    //set portfolio price and portfolio risk
  };

  useEffect(() => {
    getAllStocks();
    setDefaultData();
  }, [investor]);

  useEffect(() => {
    if (userstocks.length > 0) gettotalvar();
  }, [userstocks]);

  const handleStocksSelect = async (stocks) => {
    setPortfolioStocks(
      stocks.map((stock) => {
        return {
          label: stock.label,
          value: stock.label,
        };
      })
    );
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const payload = {
      ...portfolioEvent,
      portfolioStocks: portfolioStocks.map((stock) => ({
        companyName: stock?.label,
        symbol: stock?.label,
      })),
      createdBy: investor?._id,
    };

    const { statusCode } = await createPortfolioManagementEvent(
      setLoading,
      payload,
      investor?._id ? "investor" : "advisor",
      { mobileNumber, secretToken }
    );

    if (statusCode === 200) {
      history.push(
        investor?._id
          ? "/investor/portfolio/management"
          : "/portfolio/management"
      );
    }
  };

  return (
    <CContainer fluid>
      <h1 className="text-center mb-2">Create Portfolio Event</h1>
      <CCard className="mb-3">
        <CCardBody>
          <CForm onSubmit={handleCreateEvent}>
            <CFormLabel htmlFor="title">Title</CFormLabel>
            <CFormInput
              required
              name="title"
              id="title"
              value={portfolioEvent.title}
              onChange={handleInputChange}
              placeholder="Enter Event Title"
            ></CFormInput>

            <div className="d-flex justify-content-between gap-2 mt-2">
              <div className=" w-100">
                <CFormLabel htmlFor="desc">Portfolio Risk</CFormLabel>
                <CFormInput
                  required
                  readOnly
                  type="number"
                  name="portfolioRisk"
                  id="portfolioRisk"
                  value={portfolioEvent.portfolioRisk}
                  onChange={handleInputChange}
                  placeholder="Enter Portfolio Risk"
                  step="0.01"
                ></CFormInput>
              </div>
              <div className=" w-100">
                <CFormLabel htmlFor="desc">Ideal Risk</CFormLabel>
                <CFormInput
                  required
                  type="number"
                  name="idealRisk"
                  id="idealRisk"
                  value={portfolioEvent.idealRisk}
                  onChange={handleInputChange}
                  placeholder="Enter Ideal Risk"
                  step="0.01"
                  readOnly
                ></CFormInput>
              </div>
            </div>

            <div className="mt-3">
              <CFormLabel>Portfolio Stocks</CFormLabel>
              <CustomSelect
                isMultipleSelect
                value={portfolioStocks}
                data={stockOptions}
                handleChange={handleStocksSelect}
              />
            </div>

            <div className="mt-3">
              <CFormLabel htmlFor="desc">Total Portfolio Stocks</CFormLabel>
              <CFormInput
                required
                readOnly
                type="number"
                name="totalPortfolioPrice"
                id="totalPortfolioPrice"
                value={portfolioEvent.totalPortfolioPrice}
                onChange={handleInputChange}
                placeholder="Enter total portfolio price"
                step="0.01"
              ></CFormInput>
            </div>

            <div className="d-flex justify-content-between gap-2 mt-2">
              <div className="w-100">
                <CFormLabel htmlFor="inputForecastValue">Start Date</CFormLabel>
                <CFormInput
                  id="startDate"
                  name="startDate"
                  placeholder="Enter Start Date"
                  type="date"
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-100">
                <CFormLabel htmlFor="inputForecastValue">End Date</CFormLabel>
                <CFormInput
                  id="endDate"
                  name="endDate"
                  placeholder="Enter End Date"
                  type="date"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="w-100 mt-2">
              <CFormTextarea
                required
                id="comment"
                label="Comment"
                name="comment"
                onChange={handleInputChange}
                rows="3"
              ></CFormTextarea>
            </div>

            <CButton type="submit" className="mt-3">
              {/* {id ? "Save Changes" : "Create Session"} */}
              Create Event
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default CreatePortfolioManagementEvent;
