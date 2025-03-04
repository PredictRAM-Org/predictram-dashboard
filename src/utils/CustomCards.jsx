import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const colors = ["red", "green", "yellow"];

function formatNumber(value) {
  let num = Number(value);
  if (!isNaN(num)) {
    return num.toFixed(2);
  } else {
    const colorRegex =
      /\(\b(red|yellow|green|blue|orange|purple|pink|brown|black|white|gray|grey)\b\)/gi;

    const cleanedValue = value.replace(colorRegex, "").trim();
    return cleanedValue;
  }
}

function returnColor(text = "") {
  const colorRegex =
    /\b(red|yellow|green|blue|orange|purple|pink|brown|black|white|gray|grey)\b/;
  if (typeof text === "string") {
    const match = text.match(colorRegex);
    if (match) return match[0];
  }
  return "black";
}

function CustomCards({ data, config, ...rest }) {
  return (
    <Grid container spacing={3} {...rest}>
      {data?.map((d) => (
        <Grid item>
          <Card sx={{ padding: 3 }}>
            <Grid container gap={2}>
              {config?.map((c) => (
                <Grid item xs={12} md={4} lg={2}>
                  <Typography fontWeight="bold" color="#3777F6">
                    {c?.label}
                  </Typography>
                  <Typography color={returnColor(d[c?.key])}>
                    {d[c?.key] ? formatNumber(d[c?.key]) : "Not Available"}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CustomCards;
