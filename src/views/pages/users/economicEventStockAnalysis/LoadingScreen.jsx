import React from "react";
import { Backdrop, Box } from "@mui/material";

export default function LoadingOverlay({ isLoading }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      }}
      open={isLoading}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "palette.background.default",
          left: {
            xs: 0,
            md: 0,
            lg: 0,
            xl: "80px",
          },
          display: "flex",
          flexDirection: "column",
          pr: {
            xs: 6,
            md: 6,
            lg: 12,
            xl: 12,
          },
          pl: {
            xs: 6,
            md: 6,
            lg: 6,
            xl: "360px",
          },
          pt: 4,
        }}
      ></Box>
    </Backdrop>
  );
}
