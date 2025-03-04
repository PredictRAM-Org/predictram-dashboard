import React from "react";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { useThemeContext } from "../../../../contexts/ThemeProvider";

const StockSelect = ({ selectedStock, setSelectedStock }) => {
const {mode} = useThemeContext();
  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color:
          mode === "dark"
            ? "customPalette.darkText.main"
            : "customPalette.purpleDarkText.main",  
      }}
    >
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          color:
            mode === "dark"
              ? "customPalette.darkText.main"
              : "customPalette.purpleDarkText.main",
        }}
      >
        Select your Stock:
      </Typography>
      <select
        id="stock-select"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
        style={{
          width: "100%",
          padding: "4px",
          borderRadius: "8px",
          border: "1px solid #9b82e1",
          backgroundColor: "transparent",
          color:
              mode === "dark"
                ? "customPalette.darkText.main"
                : "customPalette.purpleDarkText.main",
        }}
      >
        <option value="" disabled>
          Select a Stock
        </option>
        <option value="option1">Your Option 1</option>
        <option value="option2">Your Option 2</option>
        <option value="option3">Your Option 3</option>
      </select>
    </FormControl>
  );
};

export default StockSelect;
