import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from "recharts";

const colorMap = {
  dataAccuracy: "#3498db",
  modelEfficiency: "#2ecc71",
  problemSolving: "#f39c12",
  logicalStructure: "#e67e22",
  riskProfile: "#9b59b6",
  overallScore: "#1abc9c",
};

const metricLabelMap = {
  dataAccuracy: "Accuracy",
  modelEfficiency: "Efficiency",
  problemSolving: "Problem Solving",
  logicalStructure: "Logic Building",
  riskProfile: "Risk Profile",
  overallScore: "Overall Score",
};

const EvaluationChart = ({ evaluation }) => {
  const [open, setOpen] = useState(false);

  const chartData = Object.entries(evaluation).map(([key, val]) => ({
    name: `${metricLabelMap[key]} : ${val.score}` || key,
    value: val.score,
    fill: colorMap[key] || "#ccc",
  }));

  return (
    <Box sx={{ mt: 5 }}>
      {/* <Button variant="contained" onClick={() => setOpen(!open)} sx={{ mb: 2 }}>
        {open ? "Hide Evaluation" : "Show Evaluation"}
      </Button>

      <Collapse in={open}> */}

      {/* <Typography variant="h6">Evaluation:</Typography> */}

      <RadialBarChart
        width={400}
        height={200}
        cx="25%"
        cy="50%"
        innerRadius="30%"
        outerRadius="100%"
        barSize={10}
        data={chartData}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          clockWise
          dataKey="value"
          angleAxisId={0}
          animationDuration={800}
        />
      </RadialBarChart>
      <Stack spacing={1} sx={{ textAlign: "left" }}>
        {chartData.map((item) => (
          <Box key={item.key} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.fill,
                mr: 1,
              }}
            />
            <Typography sx={{ color: item.fill }}>{item.name}</Typography>
          </Box>
        ))}
      </Stack>
      {/* </Collapse> */}
    </Box>
  );
};

export default EvaluationChart;
