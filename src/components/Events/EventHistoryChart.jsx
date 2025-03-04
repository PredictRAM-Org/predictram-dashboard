import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const EventHistoryChart = ({ data, name }) => {
  const chartData = data?.map((entry) => ({
    date: new Date(entry?.startdate).getFullYear().toString(),
    lastvalue: parseFloat(entry?.lastvalue?.replace(/[^0-9.]/g, "")),
    previousvalue: parseFloat(entry?.previousvalue?.replace(/[^0-9.]/g, "")),
    forecastvalue: parseFloat(entry?.forecastvalue?.replace(/[^0-9.]/g, "")),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name || "Event History Chart"}
        </Typography>
        <LineChart
          xAxis={[
            {
              id: "years",
              data: data?.map((entry) => new Date(entry?.startdate)),
              scaleType: "time",
            },
          ]}
          series={[
            {
              id: "lastvalue",
              label: "Last Value",
              data: data?.map((entry) =>
                parseFloat(entry?.lastvalue?.replace(/[^0-9.]/g, ""))
              ),
            },
            {
              id: "previousvalue",
              label: "Previous Value",
              data: data?.map((entry) =>
                parseFloat(entry?.previousvalue?.replace(/[^0-9.]/g, ""))
              ),
            },
            {
              id: "forecastvalue",
              label: "Forecast Value",
              data: data?.map((entry) =>
                parseFloat(entry?.forecastvalue?.replace(/[^0-9.]/g, ""))
              ),
            },
          ]}
          height={250}
          margin={{ top: 10, bottom: 20 }}
        />
      </CardContent>
    </Card>
  );
};

export default EventHistoryChart;
