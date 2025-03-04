import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ gradient = false, children, sx = {}, onClick, disabled }) => {
  // Conditional styles for gradient or solid background
  const buttonStyles = gradient
    ? {
        background: "linear-gradient(to right, #9B82E1, #684CB5)", // Gradient background
      }
    : {
        backgroundColor: "#9B82E1", // Solid background
      };

  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      variant="contained" // Use contained variant for the button
      sx={{
        ...buttonStyles,
        color: "white", // Text color
        padding: "8px 24px", // Padding
        borderRadius: "100px", // Rounded corners
        fontWeight: "medium", // Font weight
        width: "100%", // Full width
        "&:hover": {
          opacity: 0.9, // Hover effect
        },
        ...sx, // Merge additional styles from the sx prop
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
