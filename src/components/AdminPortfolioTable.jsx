import { CSmartTable } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { fyersQuotes } from "../api/services/FyersService";
import Loader from "../views/pages/users/Loader";

const tableColumns = [
  {
    key: "symbol",
    label: "Symbol",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
  {
    key: "currentPrice",
    label: "Current Price",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
  {
    key: "totalquantity",
    label: "Total Quantity",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
  {
    key: "totalinvested",
    label: "Total Invested",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
  {
    key: "currentInvested",
    label: "Current Value",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
  {
    key: "returnPercent",
    label: "Profit%",
    _props: { color: "primary", className: "fw-semibold" },
    _style: { width: "20%" },
  },
];

const getFyersData = async (stocks) => {
  const { data } = await fyersQuotes({ symbols: stocks });
  return data.data.d;
};

function returnPercentage(currentValue, investedValue) {
  const percentageChange =
    ((currentValue - investedValue) / investedValue) * 100;
  return percentageChange;
}

const AdminPortfolioTable = ({ portfolio, visible, totalPortfolioPrice }) => {
  const [updatedPortfolio, setUpdatedPortfolio] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  useEffect(() => {
    const fetchCurrentPrices = async () => {
      if (visible) {
        const symbols = portfolio.map((stock) => stock.symbol);
        try {
          const prices = await getFyersData(symbols.join(","));
          let overall = 0;
          const updatedPortfolioData = portfolio.map((item) => {
            const cp = prices.filter((price) =>
              price.n.includes(item.symbol)
            )[0].v.lp;
            const currentInvested = cp * item.totalquantity;
            const returnPercent = returnPercentage(
              currentInvested,
              item.totalinvested
            );
            overall += currentInvested;
            return {
              ...item,
              totalinvested: item.totalinvested.toFixed(2),
              currentPrice: cp,
              currentInvested: currentInvested.toFixed(2),
              returnPercent: returnPercent.toFixed(2),
            };
          });
          setUpdatedPortfolio(updatedPortfolioData);
          setTotalPortfolioValue(overall.toFixed(2));
        } catch (error) {
          console.error("Error fetching current prices:", error);
        }
      }
    };
    fetchCurrentPrices();
  }, [portfolio, visible]);

  return (
    <div style={{ padding: "1.5rem 0 1.5rem 0" }}>
      {updatedPortfolio.length ? (
        <>
          <div style={{ padding: "1.5rem" }}>
            <h5>Current Portfolio Value: {totalPortfolioValue}</h5>
            <h5>
              Profit Percentage:{" "}
              <span
                style={{
                  color:
                    returnPercentage(
                      totalPortfolioValue,
                      totalPortfolioPrice
                    ) >= 0
                      ? "green"
                      : "red",
                }}
              >
                {returnPercentage(totalPortfolioValue, totalPortfolioPrice) >= 0
                  ? "+"
                  : ""}
                {returnPercentage(
                  totalPortfolioValue,
                  totalPortfolioPrice
                ).toFixed(2)}
                %
              </span>
            </h5>
          </div>
          <CSmartTable
            // cleaner
            clickableRows
            columns={tableColumns}
            // columnFilter
            columnSorter
            items={updatedPortfolio}
            // itemsPerPageSelect
            // itemsPerPage={5}
            // pagination
            scopedColumns={{
              returnPercent: (item) => {
                return (
                  <td>
                    <span
                      style={{
                        color: item.returnPercent >= 0 ? "green" : "red",
                      }}
                    >
                      {item.returnPercent >= 0 ? "+" : ""}
                      {item.returnPercent}%
                    </span>
                  </td>
                );
              },
            }}
            sorterValue={{ column: "name", state: "asc" }}
            // tableFilter
            tableHeadProps={{
              color: "danger",
            }}
            tableProps={{
              striped: true,
              hover: true,
            }}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AdminPortfolioTable;
