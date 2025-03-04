import {
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  getIncomeStatementEvent,
  getIncomeStatementHistory,
  getIncomeStatementSummary,
  subscribeToIncomeStatement,
} from "../../../../api/services/IncomeStatementService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { getFundamentalData } from "../../../../api/services/ScrapperService";
import CustomScrapperTable from "../../../../utils/CustomScrapperTable";
import CustomTable from "../../../../utils/CustomTable";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  {
    header: "Total Revenue/Income (Cr)",
    accessor: "avg_total_revenue_income",
  },
  {
    header: "Total Operating Expense (Cr)",
    accessor: "avg_total_operating_expense",
  },
  {
    header: "EBITDA (Cr)",
    accessor: "avg_EBITDA",
  },
  {
    header: "Net Income (Cr)",
    accessor: "avg_net_income",
  },
  {
    header: "Total Advisor",
    accessor: "totalAdvisor",
  },
];

const IncomeStatementCols = [
  {
    header: "Year",
    accessor: "period",
  },
  {
    header: "Total Revenue/Income",
    accessor: "revenue",
  },
  {
    header: "Total Operating Expense",
    accessor: "opsExp",
  },
  {
    header: "Operating Income/Profit",
    accessor: "opsProfit",
  },
  {
    header: "EBITDA",
    accessor: "ebitda",
  },
  {
    header: "EBIT",
    accessor: "ebit",
  },
  {
    header: "Income/Profit Before Tax",
    accessor: "pbt",
  },
  {
    header: "Net Income From Continuing Operation",
    accessor: "pat",
  },
  {
    header: "Net Income",
    accessor: "netInc",
  },
  {
    header: "Net Income Applicable to Common Share",
    accessor: "netIncAppToCmnSh",
  },
  {
    header: "EPS (Earning Per Share)",
    accessor: "eps",
  },
];

const inputStyle = {
  borderRadius: "0.625rem",
  padding: "0.25rem 0.7rem",
  height: "2.875rem",
  fontWeight: "500",
  color: "#14151F",
  borderColor: "#AFAFB6",
  boxShadow: "none  ",
};

function IncomeStatement() {
  const [incomeEvent, setIncomeEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const isProfessional = useSelector(
    (state) => state.user.professional || false
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEventEnd, setIsEventEnd] = useState(false);
  const [payload, setPayload] = useState({});
  const [stockData, setStockData] = useState({});
  const [result, setResult] = useState([]);

  const { id, stock } = useParams();

  const handelInput = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const checkSubscribed = async () => {
    const {
      data: [incomeEventData],
    } = await getIncomeStatementEvent(setLoading, {
      userId,
      eventId: id,
    });
    if (incomeEventData) {
      setIncomeEvent(incomeEventData);
      setIsSubscribed(true);
      setPayload(incomeEventData?.subscriber[0]);
      setIsEventEnd(new Date(incomeEventData?.endDate).getTime() < Date.now());
    } else {
      setIsSubscribed(false);
    }
  };

  const getIncomeStatement = async () => {
    const {
      data: [incomeEventData],
    } = await getIncomeStatementEvent(setLoading, { eventId: id });
    if (!incomeEventData) {
      return toast.error("Event data not found");
    }
    setIncomeEvent(incomeEventData ?? {});
    setIsEventEnd(new Date(incomeEventData?.endDate).getTime() < Date.now());
    checkSubscribed();
  };

  const getStockData = async () => {
    const { data } = await getIncomeStatementHistory(
      setLoading,
      incomeEvent?.stockSymbol
    );

    setStockData(data?.list ?? []);
  };

  const getResult = async () => {
    const { data } = await getIncomeStatementSummary(setLoading, {
      eventId: id,
    });
    setResult(data);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await subscribeToIncomeStatement(setLoading, id, { ...payload, userId });
    getIncomeStatement();
  };

  useEffect(() => {
    getIncomeStatement();
  }, []);

  useEffect(() => {
    incomeEvent?.stockSymbol && getStockData();
  }, [incomeEvent]);

  useEffect(() => {
    if (isEventEnd) {
      getResult();
    }
  }, [isEventEnd]);

  return (
    <div
      style={{
        marginBottom: "3rem",
      }}
    >
      {loading && <Loader />}
      {!loading && (
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
            {incomeEvent?.name}
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
            {incomeEvent?.stockSymbol}
          </CCardText>
        </CCardHeader>
      )}

      {!loading && (
        // <CustomScrapperTable
        //   column={
        //     stockData?.IncomeStatement?.length > 0 &&
        //     stockData?.IncomeStatement[0]
        //   }
        //   data={stockData?.IncomeStatement}
        // />
        <CustomTable
          columns={IncomeStatementCols}
          data={stockData?.IncomeStatement}
        />
      )}
      {!loading && (
        <Box
          component="div"
          sx={{
            background: "#EFF1F3",
            borderRadius: "10px",
            padding: "0.7em 1em",
            my: "2em",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mb: "0.5em" }} variant="h4">
            About Event
          </Typography>
          <Typography variant="body1">{incomeEvent.details}</Typography>
        </Box>
      )}
      {!loading && isEventEnd && result.length !== 0 && (
        <Box component="div" sx={{ mb: "2em", pl: "1em" }}>
          <Typography
            sx={{ fontWeight: "bold", mt: "1em", mb: "0.5em" }}
            variant="h4"
          >
            Event Result
          </Typography>
          <CustomTable data={result} columns={columns} />
        </Box>
      )}
      {!loading && isProfessional && (
        <Box component="div" sx={{ pl: "1em" }}>
          <div className="d-flex justify-content-between align-items-center">
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              {isSubscribed || isEventEnd
                ? "Your Prediction"
                : "Submit Your Prediction"}
            </Typography>
            {isSubscribed && !isEventEnd && (
              <Button
                variant="contained"
                onClick={() => setIsSubscribed(false)}
              >
                Edit Prediction
              </Button>
            )}
          </div>

          <CForm className="row g-3 mt-2" onSubmit={handelSubmit}>
            <CCol xs={6}>
              <CFormLabel
                className="text-2"
                htmlFor="inputtotal_revenue_income"
              >
                Total Revenue/Income (Cr)
              </CFormLabel>
              <CFormInput
                required
                value={payload?.total_revenue_income}
                disabled={isSubscribed || isEventEnd}
                onChange={handelInput}
                style={inputStyle}
                id="inputtotal_revenue_income"
                name="total_revenue_income"
                type="number"
                placeholder="Enter Total Revenue"
              />{" "}
            </CCol>
            <CCol xs={6}>
              <CFormLabel
                className="text-2"
                htmlFor="inputtotal_operating_expense"
              >
                Total Operating Expense (Cr),
              </CFormLabel>
              <CFormInput
                required
                value={payload?.total_operating_expense}
                disabled={isSubscribed || isEventEnd}
                onChange={handelInput}
                style={inputStyle}
                id="inputtotal_operating_expense"
                name="total_operating_expense"
                type="number"
                placeholder="Enter Total Operating Expense"
              />{" "}
            </CCol>
            <CCol xs={6}>
              <CFormLabel className="text-2" htmlFor="inputEBITDA">
                EBITDA (Cr)
              </CFormLabel>
              <CFormInput
                required
                value={payload?.EBITDA}
                disabled={isSubscribed || isEventEnd}
                onChange={handelInput}
                style={inputStyle}
                id="inputEBITDA"
                name="EBITDA"
                type="number"
                placeholder="Enter EBITDA"
              />{" "}
            </CCol>
            <CCol xs={6}>
              <CFormLabel className="text-2" htmlFor="inputnet_income">
                Net Income (Cr)
              </CFormLabel>
              <CFormInput
                required
                value={payload?.net_income}
                disabled={isSubscribed || isEventEnd}
                onChange={handelInput}
                style={inputStyle}
                id="inputnet_income"
                name="net_income"
                type="number"
                placeholder="Enter Net Income"
              />{" "}
            </CCol>
            <CCol xs={6}>
              <a
                href="https://www.nseindia.com/companies-listing/corporate-filings-financial-results"
                target="_blank"
                rel="noreferrer"
              >
                Use this link as a reference to help you predict.
              </a>
            </CCol>
            <CCol xs={12}>
              {!isEventEnd && !isSubscribed && (
                <Button variant="contained" size="large" type="submit">
                  Submit
                </Button>
              )}
            </CCol>
          </CForm>
        </Box>
      )}
    </div>
  );
}

export default IncomeStatement;
