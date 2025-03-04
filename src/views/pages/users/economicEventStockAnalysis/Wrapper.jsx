import React from "react";
import { Box } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={{
        marginX: "auto",
        fontFamily: "Poppins",
        width: "100%",
        padding: "0",
        
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;