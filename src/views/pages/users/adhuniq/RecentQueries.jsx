import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import { AccessTime, ExpandMore } from "@mui/icons-material";
import { useThemeContext } from "../../../../contexts/ThemeProvider";

const recentQueries = [
  "What are Stock Price Today?",
  "What are Price for Bitcoin?",
  "What are Stock Price Today?",
  "What are Stock Price Today?",
  "What are Price for Bitcoin?",
];

export default function RecentQueries() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  return (
    <Box
      sx={{
        mt: 2,
        maxWidth: "xs",
        borderBottom: 2,
        borderColor: "purpleAccent.main",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: 0 }}>
        <AccessTime
          sx={{
            width: 20,
            height: 20,
            color:
              mode === "dark"
                ? "customPalette.darkText.main"
                : "customPalette.purpleDarkText.main",
            mr: 1,
          }}
        />
        <Typography variant="p" sx={{ color: "primary.main", fontWeight: 600 }}>
          Recent
        </Typography>
      </Box>
      <List sx={{ mb: 0, padding: 0 }}>
        {recentQueries.map((query, index) => (
          <ListItem
            key={index}
            sx={{
              color: "purpleDarkText.main",
              padding: 0,
              "&:hover": {
                textDecoration: "underline",
              },
              fontSize: "",
              fontFamily: "Poppins",
              cursor: "pointer",
              borderRadius: 1,
            }}
            dense
          >
            <ListItemText
              primary={query}
              primaryTypographyProps={{
                fontFamily: "Poppins",
                noWrap: true,
                padding: 0,
                margin: 0,
                lineHeight: 1,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {}}
        aria-label="Show more (disabled)"
        sx={{
          mt: 0.5,
          mb: 2,
          py: 0.5,
          px: 4,
          bgcolor: mode === "dark" ? "customPalette.purpleLight.main" : "",
          color: mode === "dark" ? "black" : "",
          borderRadius: "28px",
          textTransform: "none",
          transition: "all 300ms ease-in-out",
        }}
        startIcon={<ExpandMore />}
      >
        Show more
      </Button>
    </Box>
  );
}
