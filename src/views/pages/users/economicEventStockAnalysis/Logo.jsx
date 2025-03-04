import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../../../assets/predictram-logo.png";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        paddingBottom: 1.5,
        borderBottom: "2px solid",
        borderColor: "purpleAccent.main",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="PredictRAM Logo"
        sx={{ width: 40, height: 40 }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "purpleDarkText.main",
          fontFamily: "Poppins",
        }}
      >
        PredictRAM
      </Typography>
    </Box>
  );
};

export default Logo;
