import React from "react";
import {
  Box,
  LinearProgress,
  Typography,
  Slider,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";

const getBatteryColor = (percentage) => {
  if (percentage >= 75) return "#4caf50"; // Green
  if (percentage >= 50) return "#ffeb3b"; // Yellow
  if (percentage >= 25) return "#ff9800"; // Orange
  return "#f44336"; // Red
};

const BatteryContainer = styled(Box)(({ percentage }) => ({
  position: "relative",
  width: "80px", // Adjusted width to accommodate terminal
  height: "30px",
  border: `2px solid ${getBatteryColor(percentage)}`,
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  backgroundColor: "#fff",
}));

const BatteryProgress = styled(LinearProgress)(({ percentage }) => ({
  position: "absolute",
  width: "100%", // Adjust width to exclude terminal
  height: "100%",
  backgroundColor: "#fff",
  "& .MuiLinearProgress-bar": {
    backgroundColor: getBatteryColor(percentage),
  },
}));

const BatteryLabel = styled(Typography)({
  position: "absolute",
  color: "#000",
  fontWeight: "bold",
});

const Progress = ({ percentage }) => (
  <Tooltip title={`This stock is recommended ${percentage}%`} arrow>
    <BatteryContainer percentage={percentage}>
      <BatteryProgress
        variant="determinate"
        value={percentage}
        percentage={percentage}
      />
      <BatteryLabel variant="body2">{`${percentage}%`}</BatteryLabel>
    </BatteryContainer>
  </Tooltip>
);

export default Progress;
