import React, { useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
// import { useThemeContext } from "../contexts/ThemeProvider";
import { useStockAnalysis } from "../../../../contexts/StockAnalysisContext";
import {
  eventOptions,
  stockOptions,
} from "../../../../data/economicEventOptions";
import Select from "react-select";
import { getEconomicEventUpcomingRate } from "../../../../api/services/EventService";

const SelectOptions = () => {
  // const { mode } = useThemeContext();
  const { setFormData, formData, loading: stockLoading, error, handleAnalyzeStock } =
    useStockAnalysis();

  const methodOptions = ["Dynamic", "Simple"];
  const [loading, setLoading] = useState(false);  

  const incrementRate = () => {
    setFormData((prevState) => ({
      ...prevState,
      expected_rate: prevState.expected_rate + 0.01
    }));
  };

  const formattedOptions = eventOptions.map((option) => ({
    label: option,
    value: option,
  }));

  const formattedStockOptions = stockOptions.map((option) => ({
    label: option,
    value: option,
  }));

  const fetchEconomicEventRate = async (eventType) => {
    try {
      const payload = {
        event_type: eventType,
      };
      const { data } = await getEconomicEventUpcomingRate(setLoading, payload);
      setFormData((prevState) => ({
        ...prevState,
        expected_rate: data || 0, // assuming expected_rate is in the response
      }));
    } catch (error) {
      console.error("API request failed", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, event_type: e });
    fetchEconomicEventRate(e.value);
  };

  const handleStockChange = (e) => {
    setFormData({ ...formData, stock_symbols: e });
  };

  const decrementRate = () => {
    setFormData((prevState) => ({
      ...prevState,
      expected_rate: prevState.expected_rate - 0.01
    }));
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        marginTop: "16px",
        marginBottom: 0,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        // color:
        //   mode === "dark"
        //     ? "customPalette.darkText.main"
        //     : "customPalette.purpleDarkText.main",
        color: "customPalette.purpleDarkText.main",
      }}
    >
      {/* Event Type */}
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          // color:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "customPalette.purpleDarkText.main",
        }}
      >
        Select Event Type
      </Typography>
      <Select
        id="event-select"
        value={formData.event_type}
        onChange={handleChange}
        options={formattedOptions}
        style={{
          width: "100%",
          fontWeight: "bold",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #9b82e1",
          backgroundColor: "customPalette.purpleDarkText.main",
          // backgroundColor:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "#9b82e1",
        }}
      />

      {/* Stock Symbol */}
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          // color:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "customPalette.purpleDarkText.main",
        }}
      >
        Select Stock Symbol
      </Typography>
      <Select
        id="stock-select"
        value={formData.stock_symbols}
        isMulti
        onChange={handleStockChange}
        options={formattedStockOptions}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #9b82e1",
          fontWeight: "bold",
          backgroundColor: "customPalette.purpleDarkText.main",
          // backgroundColor:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "#9b82e1",
        }}
      />

      {/* Expected Upcoming Rate */}
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          // color:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "customPalette.purpleDarkText.main",
        }}
      >
        Expected Upcoming Rate
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={decrementRate}
          sx={{ minWidth: "40px", backgroundColor: "#9b82e1", color: "white" }}
        >
          -
        </Button>
        <Typography
          variant="p"
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            minWidth: "60px",
            textAlign: "center",
          }}
        >
          {formData.expected_rate.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={incrementRate}
          sx={{ minWidth: "40px", backgroundColor: "#9b82e1", color: "white" }}
        >
          +
        </Button>
      </Box>

      {/* Method */}
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          // color:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "customPalette.purpleDarkText.main",
        }}
      >
        Select Method
      </Typography>
      <select
        id="method-select"
        value={formData.method}
        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #9b82e1",
          fontWeight: "bold",
          backgroundColor: "customPalette.purpleDarkText.main",
          // backgroundColor:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          color: "#9b82e1",
        }}
      >
        <option value="" disabled>
          Select a Method
        </option>
        {methodOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Analyze Stock Button */}
      <Button
        variant="contained"
        onClick={handleAnalyzeStock}
        disabled={stockLoading}
        sx={{
          marginTop: "16px",
          backgroundColor: "#9b82e1",
          borderRadius: "16px",
          color: "white",
        }}
      >
        {stockLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Analyze Stock"
        )}
      </Button>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </FormControl>
  );
};

export default SelectOptions;
