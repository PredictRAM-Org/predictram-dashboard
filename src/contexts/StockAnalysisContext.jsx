import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";
import { getEconomicEventStockData } from "../api/services/EventService";

const StockAnalysisContext = createContext();

export const StockAnalysisProvider = ({ children }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [formData, setFormData] = useState({
    stock_symbols: "",
    event_type: "",
    expected_rate: 3.65,
    method: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeStock = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const formattedData = {
        ...formData,
        stock_symbols: formData.stock_symbols.map((stock) => stock.value),
        event_type: formData.event_type.value,
      };

      // Send API request
      const response = await axios.post(
        "https://predictram-incomestatement-fastapi-render.onrender.com/stock-details/",
        // "http://127.0.0.1:8000/stock-details/",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const payload = {
        stock_symbols: formattedData.stock_symbols,
        event_type: formattedData.event_type
      };

      const { data } = await getEconomicEventStockData(setLoading, payload);

      // Find matching stocks
      const stockDataArray = formattedData.stock_symbols
        .map((symbol) => {
          return data.find((item) => item["Symbol"] === symbol);
        })
        .filter(Boolean);

      // Set state with results
      setStockData(stockDataArray.length > 0 ? stockDataArray : null);
      setAnalysisResult(response.data);
    } catch (err) {
      // Helper function to handle error response
      const errorMessage =
        err.response?.data?.detail ||
        "An error occurred while analyzing the stock";
      console.error("API Error:", errorMessage);
      setError(errorMessage);
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <StockAnalysisContext.Provider
      value={{
        analysisResult,
        stockData,
        formData,
        setFormData,
        loading,
        error,
        handleAnalyzeStock,
      }}
    >
      {children}
    </StockAnalysisContext.Provider>
  );
};

export const useStockAnalysis = () => {
  const context = useContext(StockAnalysisContext);
  if (!context) {
    throw new Error(
      "useStockAnalysis must be used within a StockAnalysisProvider"
    );
  }
  return context;
};
