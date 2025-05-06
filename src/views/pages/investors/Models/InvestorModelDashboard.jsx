import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  Grid,
  Toolbar,
  InputBase,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
  styled,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { getInvestors } from "../../../../api/services/InvestorService";
import StockValuationPrediction from "./StockValuationPrediction";
import StockDividendPrediction from "./StockDividendPrediction";
import StockIndicatorAnalysis from "./StockIndicatorAnalysis";
import MultiFactorQuantModel from "./MultiFactorQuantModel";
import EarningMomentumBreakout from "./EarningMomentumBreakout";
import { toast } from "react-toastify";
import { Add, AttachMoney, LinkRounded, Money } from "@mui/icons-material";
import AddCreditDialog from "./AddCreditDialog";
import EvaluationChart from "./EvaluationChart";

const API_BASE_URL = "https://model.predictram.com";

const models = [
  {
    name: "Stock Valuation Prediction Model",
    description: "Predicts valuation shifts for given stock symbols.",
    inputs: [
      {
        label: "Stock Symbol",
        type: "select",
        source: "stock",
        api_key: "symbol",
      },
    ],
    endpoint: "/valuation-predictor",
    outputComponent: (data) => <StockValuationPrediction data={data} />,
    analysis: {
      dataAccuracy: {
        score: 85,
        description: "Measures completeness of financial data",
      },
      modelEfficiency: {
        score: 75,
        description: "Evaluates computational complexity",
      },
      problemSolving: { score: 90, description: "Assesses edge case handling" },
      logicalStructure: {
        score: 80,
        description: "Rates metric relationships",
      },
      riskProfile: { score: 65, description: "Conservative (low-risk) focus" },
      overallScore: {
        score: 82,
        description: "Weighted average of all scores",
      },
    },
  },
  {
    name: "Stock Dividend Prediction Model",
    description: "Predicts future dividends for multiple stocks.",
    inputs: [
      {
        label: "Symbols",
        type: "multi-select",
        source: "stock",
        api_key: "symbols",
      },
    ],
    endpoint: "/stock-dividend-prediction",
    outputComponent: (data) => <StockDividendPrediction data={data} />,
    analysis: {
      dataAccuracy: {
        score: 88,
        description: "Comprehensive financial metrics from Yahoo Finance",
      },
      modelEfficiency: {
        score: 82,
        description: "Efficient data fetching and processing",
      },
      problemSolving: {
        score: 85,
        description: "Handles multiple valuation scenarios well",
      },
      logicalStructure: {
        score: 90,
        description: "Clear progression from data to analysis",
      },
      riskProfile: {
        score: 75,
        description: "Balanced risk assessment (medium-risk)",
      },
      overallScore: {
        score: 84,
        description: "Strong valuation analysis framework",
      },
    },
  },
  {
    name: "Stock Indicator Analysis Model",
    description: "Analyzes stock indicators based on sheet selection.",
    inputs: [
      {
        label: "Stock ",
        type: "select",
        source: "sheet",
        api_key: "sheet_name",
      },
    ],
    endpoint: "/stock-indicator-analysis",
    outputComponent: (data) => <StockIndicatorAnalysis data={data} />,
    analysis: {
      dataAccuracy: {
        score: 92,
        description: "Comprehensive technical indicators + fundamentals",
      },
      modelEfficiency: {
        score: 78,
        description: "Complex pattern detection impacts speed",
      },
      problemSolving: {
        score: 95,
        description: "Excellent multi-timeframe analysis",
      },
      logicalStructure: {
        score: 90,
        description: "Clear technical/fundamental integration",
      },
      riskProfile: {
        score: 85,
        description: "Aggressive (high-risk/high-reward)",
      },
      overallScore: {
        score: 88,
        description: "Advanced technical analysis system",
      },
    },
  },
  {
    name: "Multi-Factor Quant Model (Smart Beta)",
    description:
      "Generates a smart beta portfolio based on risk tolerance and time horizon.",
    inputs: [
      {
        label: "Stock ",
        type: "select",
        source: "sheet",
        api_key: "sheet_name",
      },
      {
        label: "Risk Tolerance",
        type: "radio",
        options: ["Low", "Medium", "High"],
        api_key: "risk_tolerance",
      },
      {
        label: "Time Horizon",
        type: "radio",
        options: ["Short-Term", "Long-Term"],
        api_key: "time_horizon",
      },
    ],
    endpoint: "/quant-model",
    outputComponent: (data) => <MultiFactorQuantModel data={data} />,
    analysis: {
      dataAccuracy: {
        score: 88,
        description: "Robust fundamental + technical data integration",
      },
      modelEfficiency: {
        score: 85,
        description: "Optimized scoring with caching",
      },
      problemSolving: {
        score: 90,
        description: "Dynamic weight adjustment based on risk/time horizon",
      },
      logicalStructure: {
        score: 92,
        description: "Clear factor separation and scoring methodology",
      },
      riskProfile: {
        score: 75,
        description: "Adaptive (adjusts to user risk preference)",
      },
      overallScore: {
        score: 86,
        description: "Strong quantitative model foundation",
      },
    },
  },
  {
    name: "Earnings Momentum + Breakout Strategy",
    description:
      "Select stocks based on earnings momentum and breakout strategy filters.",
    inputs: [
      {
        label: "Stock ",
        type: "select",
        source: "sheet",
        api_key: "sheet_name",
      },
      {
        label: "Risk Tolerance",
        type: "radio",
        options: ["Conservative", "Balanced", "Aggressive"],
        api_key: "risk_tolerance",
      },
      {
        label: "Time Horizon",
        type: "radio",
        options: ["Hold until Earnings", "Hold 3M Post-Earnings"],
        api_key: "time_horizon",
      },
    ],
    endpoint: "/earnings-momentum",
    outputComponent: (data) => <EarningMomentumBreakout data={data} />,
    analysis: {
      dataAccuracy: {
        score: 90,
        description: "Comprehensive earnings + technical data",
      },
      modelEfficiency: {
        score: 82,
        description: "Complex technical calculations impact speed",
      },
      problemSolving: {
        score: 88,
        description: "Effective earnings momentum capture",
      },
      logicalStructure: {
        score: 85,
        description: "Clear earnings + breakout integration",
      },
      riskProfile: {
        score: 92,
        description: "Adaptive position sizing (conservative/aggressive)",
      },
      overallScore: {
        score: 87,
        description: "Strong event-driven trading strategy",
      },
    },
  },
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: "auto",
}));

export default function InvestorModelDashboard() {
  const theme = useTheme();
  const {
    _id: userId,
    model_credit,
    mobileNumber,
  } = useSelector((state) => state.investor);
  const dispatch = useDispatch();
  const [selectedModel, setSelectedModel] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");
  const [stockOptions, setStockOptions] = useState([]);
  const [sheetOptions, setSheetOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddCredit, setShowAddCredit] = useState(false);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchExcel = async (url) => {
        const res = await axios.get(url, { responseType: "arraybuffer" });
        return XLSX.read(new Uint8Array(res?.data), { type: "array" });
      };

      try {
        const stockBook = await fetchExcel(
          "https://raw.githubusercontent.com/PyStatIQ-Lab/stock-dividend-prediction/main/stocks.xlsx"
        );
        const stockSheet = stockBook.Sheets[stockBook?.SheetNames?.[0]];
        const stockJson = XLSX.utils.sheet_to_json(stockSheet);
        setStockOptions(stockJson?.map((row) => row?.Symbol).filter(Boolean));

        const sheetBook = await fetchExcel(
          "https://raw.githubusercontent.com/PyStatIQ-Lab/Pystatiq-Stocks-call-generator/main/stocklist.xlsx"
        );
        setSheetOptions(sheetBook?.SheetNames);
      } catch (error) {
        console.error("Error loading options", error);
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleExpandClick = (index) => {
    if (expanded.includes(index)) {
      setExpanded((prev) => prev.filter((i) => i !== index));
    } else {
      setExpanded((prev) => [...prev, index]);
    }
  };

  const runModel = async () => {
    if (!selectedModel) return;
    const { endpoint } = selectedModel;
    if (model_credit <= 0)
      return toast.error(
        "You have no model credits left. Please contact support to recharge your credits."
      );
    setErr("");
    setLoading(true);
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      let response;

      const data = Object?.fromEntries(
        Object?.entries(inputValues)?.filter(([_, v]) => v)
      );
      // console.log(data);
      response = await axios.post(url, data, {
        headers: {
          userId: userId,
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const {
        data: [userData],
      } = await getInvestors(setLoading, { mobileNumber });

      dispatch({ type: "INVESTOR_SIGNUP", payload: userData });

      setOutput(response?.data);
    } catch (err) {
      setOutput("");
      setErr(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (
    { api_key, label, type, source, options = [] },
    idx
  ) => {
    const value = inputValues[api_key] ?? ""; // ensure non-null default

    switch (type) {
      case "multi-select":
        const multi_opt = source === "sheet" ? sheetOptions : stockOptions;
        return (
          <Autocomplete
            key={idx}
            multiple
            options={multi_opt}
            value={Array.isArray(value) ? value : []}
            onChange={(e, newValue) =>
              handleInputChange(api_key, newValue ?? [])
            }
            renderInput={(params) => (
              <TextField {...params} label={label} margin="dense" fullWidth />
            )}
          />
        );

      case "select":
        const opt = source === "sheet" ? sheetOptions : stockOptions;
        return (
          <Autocomplete
            key={idx}
            options={opt}
            value={value || ""}
            onChange={(e, newValue) =>
              handleInputChange(api_key, newValue ?? "")
            }
            renderInput={(params) => (
              <TextField {...params} label={label} margin="dense" fullWidth />
            )}
          />
        );

      case "radio":
        return (
          <Box key={idx} my={1}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              row
              value={value}
              onChange={(e) => handleInputChange(api_key, e.target.value)}
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        );

      default:
        return (
          <TextField
            key={idx}
            label={label}
            fullWidth
            margin="dense"
            value={value}
            onChange={(e) => handleInputChange(api_key, e.target.value)}
          />
        );
    }
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xxl"));

  const sidebarContent = (
    <Box p={3} position="relative" sx={{ height: "100%" }}>
      <IconButton
        onClick={() => {
          setSelectedModel(null);
          setInputValues({});
          setOutput("");
          setErr("");
        }}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      {selectedModel && (
        <>
          <Typography variant="h6" gutterBottom>
            {selectedModel?.name}
          </Typography>
          <Typography variant="body2" paragraph>
            {selectedModel?.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Input Parameters</Typography>
          {selectedModel?.inputs?.map((input, idx) =>
            renderInputField(input, idx)
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={runModel}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Running Model Will Take Some Time..." : "Run Model"}
          </Button>
          {output && (
            <Box mt={2}>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {selectedModel?.outputComponent
                  ? selectedModel?.outputComponent(output)
                  : JSON.stringify(output, null, 2)}
              </pre>
            </Box>
          )}
          {err && (
            <Box mt={2}>
              <Typography variant="body2" color="error">
                {err || "An error occurred."}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AddCreditDialog show={showAddCredit} setShow={setShowAddCredit} />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Quantitative Models Dashboard</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <InputBase
              placeholder="Search models..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                backgroundColor: "white",
                px: 2,
                borderRadius: 1,
                width: "50%",
              }}
            />
            <Typography variant="body2" mr={2}>
              Your Model Credits
              <Typography variant="h5">{model_credit}</Typography>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Alert
        sx={{ mt: "2em" }}
        icon={<AttachMoney fontSize="inherit" />}
        color="success"
        action={
          <Button
            sx={{ fontWeight: "bold" }}
            variant="outlined"
            onClick={() => setShowAddCredit(true)}
            color="inherit"
            size="small"
          >
            Add Credit
          </Button>
        }
      >
        Want to add credit inorder to use all Models ?
      </Alert>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Grid container spacing={3}>
          {filteredModels.map((model, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                onClick={() => setSelectedModel(model)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {model?.name}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {model?.description}
                  </Typography>
                  {/* Expand button */}
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Evaluation
                    </Typography>
                    <ExpandMore
                      expand={expanded.includes(index) ? 1 : 0}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering card click
                        handleExpandClick(index);
                      }}
                      aria-expanded={expanded.includes(index)}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>

                  {/* Collapsible EvaluationChart */}
                  <Collapse
                    in={expanded.includes(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <EvaluationChart evaluation={model?.analysis} />
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {isLargeScreen ? (
          <Box
            sx={{
              position: "fixed",
              zIndex: 30,
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
            open={Boolean(selectedModel)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {sidebarContent}
          </Drawer>
        )}
      </Box>
    </Box>
  );
}
