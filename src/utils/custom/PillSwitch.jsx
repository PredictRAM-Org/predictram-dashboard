import React from "react";
import { Switch, Box, Typography } from "@mui/material";

function PillSwitch({ value, setValue, leftLabel, rightLabel }) {
  const handleChange = (event) => {
    setValue(event.target.checked);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="0.5rem"
    >
      <Typography>{leftLabel}</Typography>
      <Switch
        checked={value}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>{rightLabel}</Typography>
    </Box>
  );
}

export default PillSwitch;
