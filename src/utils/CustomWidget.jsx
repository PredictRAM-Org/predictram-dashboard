import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function CustomWidget({ data, label }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 35 }} color="textPrimary" gutterBottom>
          {data}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="textSecondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
