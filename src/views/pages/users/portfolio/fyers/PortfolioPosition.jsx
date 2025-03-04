import { CButton, CSmartTable } from "@coreui/react-pro";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FyersPosition } from "../../../../../api/services/FyersService";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
  loginwithFyersRefreshToken,
} from "../../../../../utils/custom/fyersLogin";
import VisualNoData from "../../../../../utils/VisualNoData";
import Loader from "../../Loader";

const tableColumn = [
  "symbol",
  { key: "dayBuyQty", label: "Buy qty" },
  { key: "daySellQty", label: "Sell qty" },
  { key: "netQty", label: "Net qty	" },
  { key: "realized_profit", label: "Realized P&L" },
  { key: "unrealized_profit", label: "Unrealized P&L" },
  { key: "pl", label: "Total P&L" },
];

function PortfolioPosition() {
  const [loading, setLoading] = useState(false);
  const [FyersPositios, setFyersPositions] = useState([]);
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);

  const getFyersPosition = async () => {
    const data = await FyersPosition(setLoading, fyers_access_token);

    if (data?.expired) {
      loginwithFyersRefreshToken(fyers_refresh_token, setLoading);
    } else {
      console.log(data);
      setFyersPositions(data?.positions?.netPositions);
    }
  };

  useEffect(() => {
    getFyersPosition();
  }, []);
  return (
    <>
      <div>
        <h4 className="text-primary fw-bold">Your Portfolio Position</h4>
        {!loading &&
          (FyersPositios.length > 0 ? (
            <CSmartTable
              items={FyersPositios.map((e) => {
                return {
                  ...e,
                  pl: Number(e.pl).toFixed(2),
                  realized_profit: Number(e.realized_profit).toFixed(2),
                  unrealized_profit: Number(e.unrealized_profit).toFixed(2),
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
          ) : (
            <VisualNoData />
          ))}
      </div>

      {loading && <Loader />}
    </>
  );
}

export default PortfolioPosition;
