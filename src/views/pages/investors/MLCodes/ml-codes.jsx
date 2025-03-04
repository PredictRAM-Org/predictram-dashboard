import React, { useState } from "react";
import {
  Container,
  Grid,
  Snackbar,
  Alert,
  Box,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ModelCard from "../../../../components/MLCodes/ModelCard";
import WorkspacePanel from "../../../../components/MLCodes/WorkspacePanel";
import { lightTheme, darkTheme } from "./theme";
import { Search } from "@mui/icons-material";

// Sample model data
const models = [
  {
    name: "NeuralProphet Forecaster",
    readability: 9,
    functionality: 9.2,
    performance: 92.5,
    description:
      "Hybrid forecasting model combining neural networks with AR processes",
  },
  {
    name: "Deep Portfolio Optimizer",
    readability: 8.7,
    functionality: 9.5,
    performance: 94.1,
    description: "Reinforcement learning-based portfolio optimization",
  },
  {
    name: "Transformer-XHedge",
    readability: 8.1,
    functionality: 9.8,
    performance: 96.3,
    description: "Attention-based hedging strategy generator",
  },
];

// Main MLCodesPage Component
const MLCodesPage = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleModelSelect = (modelName) => {
    const model = models.find((m) => m.name === modelName);
    setSelectedModel(model);
  };

  const handleSubscribe = async () => {
    showToast("Model subscribed successfully", "success");
  };

  const handleConnect = async (apiKey, portfolioId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showToast("Portfolio connected successfully", "success");
  };

  const handleTrain = async (epochs) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showToast("Training completed successfully", "success");
  };

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 2 }}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item md={4} display={{ xs: "none", md: "block" }}></Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search for ML codes"
                onChange={(e) => console.log(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Tooltip
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  <IconButton
                    onClick={toggleTheme}
                    sx={{ color: "text.primary" }}
                  >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {models.map((model, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ModelCard
                      model={model}
                      onSelect={handleModelSelect}
                      selectedModelName={selectedModel?.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <WorkspacePanel
                selectedModel={selectedModel}
                onSubscribe={handleSubscribe}
                onConnect={handleConnect}
                onTrain={handleTrain}
              />
            </Grid>
          </Grid>

          <Snackbar
            open={toast.open}
            autoHideDuration={3000}
            onClose={handleCloseToast}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseToast}
              severity={toast.severity}
              variant="filled"
            >
              {toast.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MLCodesPage;
