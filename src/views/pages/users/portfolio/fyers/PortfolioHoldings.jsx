import { cilChartPie } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CRow, CWidgetStatsF } from "@coreui/react";
import { CButton, CSmartTable } from "@coreui/react-pro";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getStockPrice } from "../../../../../api/services/EventService";
import {
  FyersHoldings,
  FyersPosition,
} from "../../../../../api/services/FyersService";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
  loginwithFyersRefreshToken,
} from "../../../../../utils/custom/fyersLogin";
import VisualNoData from "../../../../../utils/VisualNoData";
import Loader from "../../Loader";

const tableColumn = [
  "symbol",
  { key: "quantity", label: "Total Quantity" },
  { key: "costPrice", label: "Buy Price" },
  { key: "ltp", label: "Current Value" },
  { key: "marketVal", label: "Prev. Colse" },
  { key: "pl", label: "Total P&L" },
];

function PortfolioHoldings() {
  const [loading, setLoading] = useState(false);
  const [fyersHoldings, setFyersHoldings] = useState([]);
  const [holdingOverview, setHoldingOverview] = useState({});
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);

  const getFyersHolding = async () => {
    const data = await FyersHoldings(setLoading, fyers_access_token);

    if (data?.expired) {
      loginwithFyersRefreshToken(fyers_refresh_token, setLoading);
    } else {
      setFyersHoldings(data?.holdings?.holdings);
      const sum = data?.holdings?.holdings.reduce((accumulator, object) => {
        return accumulator + object.costPrice;
      }, 0);
      setHoldingOverview({ ...data?.holdings?.overall, total_investment: sum });
    }
  };

  useEffect(() => {
    getFyersHolding();
  }, []);
  return (
    <>
      <div>
        <h4 className="text-primary fw-bold">Your Portfolio Holdings</h4>
        {!loading &&
          (fyersHoldings.length > 0 ? (
            <div>
              <CRow>
                <CCol>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<div>IV</div>}
                    title="Total Invested Value"
                    value={holdingOverview?.total_investment?.toFixed(2)}
                  />
                </CCol>
                <CCol>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<div>CV</div>}
                    title="Total Current Value"
                    value={holdingOverview?.total_current_value?.toFixed(2)}
                  />
                </CCol>

                <CCol>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<div>PL</div>}
                    title="Total P&L"
                    value={`${holdingOverview?.total_pl?.toFixed(2)}`}
                  />
                </CCol>
              </CRow>
              <CSmartTable
                items={fyersHoldings.map((e) => {
                  return {
                    ...e,
                    pl: Number(e.pl).toFixed(2),
                  };
                })}
                columns={tableColumn}
                columnFilter
                itemsPerPageSelect
                columnSorter
                pagination
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
                clickableRows
              />
            </div>
          ) : (
            <VisualNoData />
          ))}
      </div>

      {loading && <Loader />}
    </>
  );
}

export default PortfolioHoldings;
