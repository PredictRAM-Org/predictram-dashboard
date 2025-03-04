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
import AddIcon from "@mui/icons-material/Add";
import StockSelect from "./StockSelect";
import RecentQueries from "./RecentQueries";
import { getPortfoliostock } from "../../../../api/services/PortfolioService";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Logo from "./Logo";
import Button from "./Button";
// import EventSelect from "./EventSelect";
// import profileImg from "../../../../assets/shubh.png";
import { useThemeContext } from "../../../../contexts/ThemeProvider";
import EventSelect from "../../../inputs/SelectInputs/SelectWrapper/EventSelect";
import { useSelector } from "react-redux";
import { getStockPrice } from "../../../../api/services/EventService";
import CustomSelect from "../../../../utils/custom/CustomSelect";
import TimeHorizonSelect from "./TimeHorizonSelect";

const Sidebar = ({
  selectedStock,
  selectedEvent,
  selectedTime,
  setSelectedStock,
  setSelectedEvent,
  setSelectedTime,
  onAnalyze,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleMode } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [stockOptions, setStockOptions] = useState();

  const investor = useSelector((state) => state.user);
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const getAllStocks = async () => {
    const price = await getStockPrice(
      setLoading,
      investor?._id ? "investor" : "advisor",
      { secretToken, mobileNumber }
    );

    const _options = price.map((el) => {
      return {
        label: el.symbol,
        value: el.symbol,
      };
    });
    setStockOptions(_options);
  };

  useEffect(() => {
    getAllStocks();
  }, []);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xxl"));

  useEffect(() => {
    setIsOpen(isLargeScreen);
  }, [isLargeScreen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleStocksSelect = async (stocks) => {
    setSelectedStock(
      stocks.map((stock) => {
        return {
          label: stock.label,
          value: stock.label,
        };
      })
    );
  };

  const sidebarContent = (
    <Box
      sx={{
        width: "300px",
        height: "100%",
        bgcolor: `${
          mode === "dark"
            ? "customPalette.lighterDark.main"
            : "customPalette.purpleLight.main"
        }`,
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0 }}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color:
              mode === "dark"
                ? "customPalette.darkText.main"
                : "customPalette.purpleDarkText.main",
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
      <Logo />
      {/* <Button
        sx={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <AddIcon />
        New Chat
      </Button> */}
      {/* <StockSelect
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
      /> */}
      {/* <EventSelect
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      /> */}
      <TimeHorizonSelect
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <Typography>Select your Stock:</Typography>
      <CustomSelect
        isMultipleSelect
        value={selectedStock}
        data={stockOptions}
        handleChange={handleStocksSelect}
      />
      <EventSelect value={selectedEvent} setValue={setSelectedEvent} />

      {/* <RecentQueries /> */}
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

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            bgcolor: "purpleVeryLight.main",
            borderRadius: 2,
            height: 60,
            bgcolor:
              mode === "dark"
                ? "#252525"
                : "customPalette.purpleVeryLight.main",
          }}
        >
          <Box
            component="img"
            src={profileImg}
            alt="Profile"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          />
          <Box sx={{ flexGrow: 0, ml: 0 }}>
            <Typography variant="subtitle2">Subh Sharma</Typography>
            <Typography variant="caption" sx={{ display: "block" }}>
              ux.subhsharma@gmai...
            </Typography>
          </Box>
        </Box>
      </Box> */}

      <Button
        disabled={!selectedStock || !selectedEvent || !selectedTime}
        onClick={onAnalyze} // Call onAnalyze when "Analyze" button is clicked
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
        {"Analyze"}
      </Button>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          display: isOpen ? "none" : "block",
          color:
            mode === "dark"
              ? "customPalette.darkText.main"
              : "customPalette.purpleDarkText.main",
          backgroundColor: "customPalette.purpleDarkText.main",
          transition: theme.transitions.create("left"),
          textTransform: "none",
          minWidth: "auto",
          width: "auto",
          padding: theme.spacing(0.5, 1.5),
          height: "36px",
          lineHeight: "1.2",
        }}
      >
        <MenuIcon sx={{ fontSize: 30 }} />
      </IconButton>

      {isLargeScreen ? (
        <Box
          sx={{
            position: "fixed",
            zIndex: 30,
            width: isOpen ? "236px" : "0px",
            height: "100vh",
            transition: theme.transitions.create("width"),
            overflow: "hidden",
          }}
        >
          {sidebarContent}
        </Box>
      ) : (
        <Drawer
          anchor="right"
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
