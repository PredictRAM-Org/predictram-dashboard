import { Box } from "@mui/material";
import Wrapper from "./Wrapper";
import ChatInterface from "./ChatInterface";
import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";

function Adhuniq() {
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [financialAnalysisMessage, setFinancialAnalysisMessage] = useState("");
  const prevMessageRef = useRef();

  const handleSendMessage = () => {
    const stockNames = selectedStock.map((stock) => stock.label).join(", ");
    const message = `f"""
Analyze the following financial scenario:

Stocks under consideration:
${stockNames} 

Recent Financial Event:
 ${selectedEvent.label}
 
Investment Profile:
- Risk Tolerance: MODERATE
- Time Horizon: ${selectedTime}

Please provide analysis and recommendations following the structured format above.
"""
`;
    setFinancialAnalysisMessage(message);
  };

  return (
    <>
      <Wrapper>
        <Box
          sx={{
            display: "flex",
            // minHeight: "100vh",
          }}
        >
          <Sidebar
            selectedStock={selectedStock}
            selectedEvent={selectedEvent}
            selectedTime={selectedTime}
            setSelectedStock={setSelectedStock}
            setSelectedEvent={setSelectedEvent}
            setSelectedTime={setSelectedTime}
            onAnalyze={handleSendMessage}
          />
          <ChatInterface
            selectedStock={selectedStock}
            selectedEvent={selectedEvent}
            financialAnalysisMessage={
              prevMessageRef.current !== financialAnalysisMessage
                ? financialAnalysisMessage
                : null
            }
          />
        </Box>
        {/* <ChatInput /> */}
      </Wrapper>
    </>
  );
}

export default Adhuniq;
