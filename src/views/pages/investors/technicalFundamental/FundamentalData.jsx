import React, { useEffect, useState } from "react";
import { getFundamentalData } from "../../../../api/services/ScrapperService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import Loader from "../../users/Loader";
import { toast } from "react-toastify";
import CustomScrapperTable from "../../../../utils/CustomScrapperTable";
import TabularNav from "../../../../components/TabularNav";
import CustomTable from "../../../../utils/CustomTable";
import { getIncomeStatementSummary } from "../../../../api/services/IncomeStatementService";
import VisualNoData from "../../../../utils/VisualNoData";

const options = [
  "Balance Sheet",
  "Cash Flow",
  "Efficiency Ratios",
  "Income Statement",
  "Valuation Ratio",
];

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
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

function FundamentalData() {
  const { stock } = useParams();
  const { mobileNumber, secretToken } = useSelector((state) => state.investor);
  const [fundamentalData, setFundamentalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const { _id: userId } = useSelector((state) => state.investor);

  const handleViewState = (state) => {
    setViewState(state);
  };

  const reverseObjectProperty = (data) => {
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        const arr = data[key].map((item) => {
          const newObj = {};
          newObj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
          Object.keys(item)
            .slice(1)
            .reverse()
            .forEach((k) => {
              newObj[k] = item[k];
            });
          return newObj;
        });
        data[key] = arr;
      } else {
      }
    });
  };

  const getIncomeStatementPrediction = async () => {
    const { data } = await getIncomeStatementSummary(
      setLoading,
      {
        stockSymbol: stock,
      },
      { mobileNumber, secretToken },
      userId ? "investor" : "advisor"
    );
    console.log(data);
    setPredictions(data);
  };
  const fetchFundamentalData = async () => {
    const {
      data: [data],
    } = await getFundamentalData(
      setLoading,
      { symbols: stock },
      { mobileNumber, secretToken },
      userId ? "investor" : "advisor"
    );
    if (!data) {
      toast.error("Sorry No Fundamental Data Present");
    }
    reverseObjectProperty(data);
    getIncomeStatementPrediction();
    setFundamentalData(data || {});
  };
  useEffect(() => {
    fetchFundamentalData();
  }, []);
  return (
    <div
      style={{
        marginBottom: "3rem",
      }}
    >
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
          {stock} Fundamental Details
          {!loading && (
            <CCardText
              className="m-0 mt-2"
              style={{
                fontWeight: 500,
                color: "#AFAFB6",
                textAlign: "center",
                fontSize: "1.75rem",
              }}
            >
              {fundamentalData?.label}
            </CCardText>
          )}
        </CCardTitle>
      </CCardHeader>
      {loading && <Loader />}

      {!loading && Object.keys(fundamentalData).length === 0 && (
        <VisualNoData message="No data found for this stock" />
      )}
      {!loading && Object.keys(fundamentalData).length !== 0 && (
        <div>
          <TabularNav
            options={options}
            state={viewState}
            handleState={handleViewState}
          />
          {viewState === 0 && (
            <CustomScrapperTable
              column={fundamentalData?.BalanceSheet[0]}
              data={fundamentalData?.BalanceSheet}
            />
          )}
          {viewState === 1 && (
            <CustomScrapperTable
              column={fundamentalData?.CashFlow[0]}
              data={fundamentalData?.CashFlow}
            />
          )}
          {viewState === 2 && (
            <CustomScrapperTable
              column={fundamentalData?.EfficiencyRatios[0]}
              data={fundamentalData?.EfficiencyRatios}
            />
          )}
          {viewState === 3 && (
            <div>
              {predictions.length != 0 && (
                <div className="mb-2">
                  <h2
                    className="pl-2"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    Income Statement Prediction
                  </h2>
                  <CustomTable data={predictions} columns={columns} />
                </div>
              )}
              <CustomScrapperTable
                column={fundamentalData?.IncomeStatement[0]}
                data={fundamentalData?.IncomeStatement}
              />
            </div>
          )}
          {viewState === 4 && (
            <CustomScrapperTable
              column={fundamentalData?.RiskPriceAndValuation[0]}
              data={fundamentalData?.RiskPriceAndValuation}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FundamentalData;
