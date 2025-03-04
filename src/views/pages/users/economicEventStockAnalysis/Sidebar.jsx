import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  Typography,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import Logo from "./Logo";
import Button from "./Button";
// import { useThemeContext } from "../contexts/ThemeProvider";
import SelectOptions from "./SelectOptions";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { mode, toggleMode } = useThemeContext();
  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    setIsOpen(isLargeScreen);
  }, [isLargeScreen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: "280px",
        height: "100%",
        bgcolor: "customPalette.purpleLight.main",
        // bgcolor: `${
        //   mode === "dark"
        //     ? "customPalette.lighterDark.main"
        //     : "customPalette.purpleLight.main"
        // }`,
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0 }}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            // color:
            //   mode === "dark"
            //     ? "customPalette.darkText.main"
            //     : "customPalette.purpleDarkText.main",
            color: "customPalette.purpleDarkText.main",
          }}
        >
          <ViewSidebarIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box> */}
      {/* <Logo /> */}

      <SelectOptions />
      {/* <Box sx={{}}>
        <Button
          onClick={toggleMode}
          sx={{
            mt: 4,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            fontSize: "10px",
            background: "linear-gradient(45deg, #9B82E1 30%, #684CB5 90%)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, #8A71D0 30%, #573AA4 90%)",
            },
            "& .MuiButton-startIcon": {
              marginRight: 1,
            },
          }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          {mode === "dark" ? "Switch To Light Mode" : "Switch To Dark Mode"}
        </Button>
      </Box> */}
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          display: `${isOpen ? "none" : "block"}`,
          top: theme.spacing(1),
          left: isOpen && isLargeScreen ? "244px" : theme.spacing(6),
          zIndex: 1200,
          color: "customPalette.purpleDarkText.main",
          // color:
          //   mode === "dark"
          //     ? "customPalette.darkText.main"
          //     : "customPalette.purpleDarkText.main",
          transition: theme.transitions.create("left"),
        }}
      >
        <ViewSidebarIcon sx={{ fontSize: 30 }} />
      </IconButton>
      {isLargeScreen ? (
        <Box
          sx={{
            position: "fixed",
            zIndex: 30,
            width: isOpen ? "280px" : "0px",
            height: "100vh",
            transition: theme.transitions.create("width"),
            overflow: "hidden",
          }}
        >
          {sidebarContent}
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
