import React, { useState, useRef } from "react";
import { Button, Typography, Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useThemeContext } from "../../../../contexts/ThemeProvider";

export default function Uploader() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { mode } = useThemeContext();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid CSV file.");
      setFile(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        aria-label="Upload CSV file"
      />
      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<CloudUpload />}
        sx={{
          bgcolor:
            mode === "dark"
              ? "customPalette.darkCardsSidebar.main"
              : "customPalette.purpleVeryLight.main",
          color:
            mode === "dark"
              ? "customPalette.darkText.main"
              : "customPalette.purpleDarkText.main",
          fontWeight: 600,
          py: 1.25,
          px: 2,
          borderRadius: "9999px",
        }}
        aria-label="Select CSV file to upload"
      >
        {file ? file.name : "Upload CSV"}
      </Button>
      {file && (
        <Typography variant="caption" sx={{ mt: 1, color: "primary.main" }}>
          Selected file: {file.name}
        </Typography>
      )}
    </Box>
  );
}
