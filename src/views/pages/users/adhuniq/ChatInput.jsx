import React from "react";
import { Box, InputBase, Button, useTheme, useMediaQuery } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Uploader from "./Uploader";
import { useThemeContext } from "../../../../contexts/ThemeProvider";

export default function ChatInput() {
  const theme = useTheme();
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const { mode } = useThemeContext();
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        left: {
          xs: 0,
          xl: "80px",
        },
        bottom: theme.spacing(8),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: theme.spacing(6),
      }}
    >
      <Box
        sx={{
          width: "916px",
          bgcolor: "#F2F2FF",
          // bgcolor:
          //   mode === "dark"
          //     ? "customPalette.lighterDark.main"
          //     : "customPalette.purpleVeryLight.main",
          borderRadius: "9999px",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            justifyContent: "space-between",
            bgcolor:
              mode === "dark"
                ? "customPalette.lighterDark.main"
                : "customPalette.purpleVeryLight.main",
          }}
        >
          <InputBase
            placeholder="Start your conversation..."
            sx={{
              flexGrow: 1,
              color:
                mode === "dark"
                  ? "customPalette.darkText.main"
                  : "customPalette.purpleDarkText.main",
              fontFamily: "Poppins",
              py: 1,
              px: 2,
              borderRadius: "9999px",
              bgcolor:
                mode === "dark"
                  ? "customPalette.lighterDark.main"
                  : "customPalette.purpleVeryLight.main",

              "& input": {
                "&::placeholder": {
                  color:
                    mode === "dark"
                      ? "customPalette.darkText.main"
                      : "customPalette.purpleDarkText.main",
                  opacity: 1,
                },
              },
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Uploader />
            <Button
              variant="contained"
              sx={{
                minWidth: 0,
                p: 1.25,
                borderRadius: "50%",
                background: `linear-gradient(to right, customPalette.purpleAccent.main, customPalette.purpleAccent.primary)`,
              }}
            >
              <ArrowForward />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
