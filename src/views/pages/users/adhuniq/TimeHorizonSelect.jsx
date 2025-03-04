import React from "react";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { useThemeContext } from "../../../../contexts/ThemeProvider";

const TimeHorizonSelect = ({ selectedTime, setSelectedTime }) => {
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
        Select your Time Horizon:
      </Typography>
      <select
        id="stock-select"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
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
          Select a Time Horizon
        </option>
        <option value="SHORT_TERM">SHORT TERM</option>
        <option value="LONG_TERM">LONG TERM</option>
      </select>
    </FormControl>
  );
};

export default TimeHorizonSelect;
