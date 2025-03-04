import { CAREGORIZED_STOCKS_DATA } from "../api/InvestorEndpoints";

export const getCategorizedStocks = async (stock) => {
    const response = await fetch(CAREGORIZED_STOCKS_DATA);
    if (response.ok) {
        const { data: categorizedStocks } = await response.json();
        categorizedStocks?.forEach((obj) => {
            obj.Symbol = obj?.Symbol?.replace(".NS", "");
            obj.symbol = obj.Symbol;
            delete obj.Symbol;
            obj.value = obj.Latest_Close_Price;
            delete obj.Latest_Close_Price;
        });
        return categorizedStocks;
    } else {
        console.error("Failed to fetch categorized stocks data.");
    }
};

export const getCagr = (stock, categorizedStocks) => {
    let foundStock = categorizedStocks?.find(
        (stockData) => stockData.symbol === stock.symbol
    );
    return foundStock ? foundStock.CAGR.toFixed(2) : null;
};