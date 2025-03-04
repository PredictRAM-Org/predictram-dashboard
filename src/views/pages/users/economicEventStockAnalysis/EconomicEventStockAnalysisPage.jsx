import Wrapper from "./Wrapper";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { StockAnalysisProvider } from "../../../../contexts/StockAnalysisContext";
import ResultInterface from "./ResultInterface";

function EconomicEventStockAnalysisPage() {
  return (
    <>
      <StockAnalysisProvider>
        <Wrapper>
          <Box
            sx={{
              display: "flex",
              minHeight: "100vh",
            }}
          >
            <Sidebar />
            <ResultInterface />
          </Box>
        </Wrapper>
      </StockAnalysisProvider>
    </>
  );
}

export default EconomicEventStockAnalysisPage;
