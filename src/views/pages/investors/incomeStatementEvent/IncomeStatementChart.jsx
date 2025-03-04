import { CChart } from "@coreui/react-chartjs";
import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

function IncomeStatementChart({ stockData, predictedValues }) {
  const incomeStatementParameters = [
    {
      index: 0,
      prediction_access: "avg_total_revenue_income",
      heading: "Revenues",
      name: "Total Revenue/Income(Cr)",
    },
    {
      index: 1,
      prediction_access: "avg_total_operating_expense",
      heading: "Operating Expenses",
      name: "Total Operating Expense(Cr)",
    },
    {
      index: 3,
      prediction_access: "avg_EBITDA",
      heading: "EBITDA",
      name: "EBITDA(Cr)",
    },
    {
      index: 7,
      prediction_access: "avg_net_income",
      heading: "Net Income",
      name: "Net Income(Cr)",
    },
  ];

  useEffect(() => {
    if (stockData) {
      incomeStatementParameters.map((item) => {
        console.log(
          "rohit check",
          item?.prediction_access,
          ...Object.values(stockData?.IncomeStatement[item.index])
            .slice(0, 40)
            .reverse()
            .filter((v) => !v.includes("(Cr)"))
            .pop()
        );
      });
    }
  }, [stockData]);

  return (
    <Grid container spacing={5} marginTop={5}>
      {incomeStatementParameters.map((d) => {
        return (
          <Grid item sx={12} md={6}>
            {/* <CChart
              type="bar"
              options={{
                scales: {
                  y: {
                    title: {
                      display: true,

                      text: d.name,
                      color: "#321FDB",
                      font: {
                        size: 20,
                      },
                    },
                  },
                  x: {
                    title: {
                      display: true,

                      text: "Month",
                      color: "#321FDB",
                      font: {
                        size: 3,
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: [
                  ...Object.keys(stockData?.IncomeStatement[d.index])
                    .slice(0, 40)
                    .reverse()
                    .filter((v) => !v.includes("Field")),
                  "predicted",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      ...Object.keys(stockData?.IncomeStatement[d.index])
                        .slice(0, 40)
                        .filter((v) => !v.includes("Field"))
                        .map(() => "#9b80e8"),
                      "#321FDB",
                    ],
                    data: [
                      ...Object.values(stockData?.IncomeStatement[d.index])
                        .slice(0, 40)
                        .reverse()
                        .filter((v) => !v.includes("(Cr)")),
                      predictedValues[d.prediction_access],
                    ],
                  },
                ],
              }}
            /> */}
            <Typography sx={{ textAlign: "center", mb: "0.5em" }} variant="h4">
              {d.heading}
            </Typography>
            <Stack
              direction="row"
              sx={{ mb: "0.5em" }}
              justifyContent="space-around"
              alignItems="center"
              spacing="4"
            >
              <Typography variant="h6">
                {`Previous Value: ${Object.values(
                  stockData?.IncomeStatement[d.index]
                )
                  .slice(0, 40)
                  .reverse()
                  .filter((v) => !v.includes("(Cr)"))
                  .pop()}`}
              </Typography>
              <Typography variant="h6">
                {`Predicted Value: ${predictedValues[
                  d.prediction_access
                ]?.toFixed(2)}`}
              </Typography>
            </Stack>
            <CChart
              type="bar"
              options={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: d.name,
                      color: "#321FDB",
                      font: {
                        size: 20,
                      },
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                      color: "#321FDB",
                      font: {
                        size: 3,
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: [
                  ...Object.keys(stockData?.IncomeStatement[d.index])
                    .slice(0, 40)
                    .reverse()
                    .filter((v) => !v.includes("Field")),
                  "predicted",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      ...Object.keys(stockData?.IncomeStatement[d.index])
                        .slice(0, 40)
                        .filter((v) => !v.includes("Field"))
                        .map(() => "#9b80e8"),
                      "#321FDB",
                    ],
                    data: [
                      ...Object.values(stockData?.IncomeStatement[d.index])
                        .slice(0, 40)
                        .reverse()
                        .filter((v) => !v.includes("(Cr)")),
                      predictedValues[d.prediction_access],
                    ],
                  },
                ],
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default IncomeStatementChart;
