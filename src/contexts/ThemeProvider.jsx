import React, { createContext, useState, useMemo, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const customPalette = {
  purpleAccent: {
    main: "#9b82e1",
    primary: "#684CB5",
  },
  purpleDarkAccent: {
    main: "#795dc8",
  },
  purpleVeryLight: {
    main: "#f2f2ff",
  },
  purpleLight: {
    main: "#e5dcff",
  },
  purpleDarkText: {
    main: "#5c459a",
  },
  darkCardsSidebar: {
    main: "#222222",
  },
  lighterDark: {
    main: "#2d2d2d",
  },
  darkText: {
    main: "#dadada",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light mode colors
                primary: {
                  main: customPalette.purpleAccent.primary,
                },
                background: {
                  default: "white",
                  paper: customPalette.purpleVeryLight.main,
                },
                text: {
                  primary: customPalette.purpleDarkText.main,
                },
              }
            : {
                // Dark mode colors
                primary: {
                  main: customPalette.purpleDarkAccent.main,
                },
                background: {
                  default: customPalette.darkCardsSidebar.main,
                  paper: customPalette.lighterDark.main,
                },
                text: {
                  primary: customPalette.darkText.main,
                },
              }),
          // Custom colors available in both modes
          customPalette: customPalette,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
