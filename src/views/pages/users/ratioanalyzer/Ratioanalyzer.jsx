import { Alert, AlertTitle, Button } from "@mui/material";
import ratiolyzer from "../../../../assets/images/ratiolyzer.png";

export default function RatioAnalyzer() {
  return (
    <>
      <div className="mb-2 text-center">
        <img
          style={{ height: "5rem", objectFit: "contain" }}
          src={ratiolyzer}
          alt="no data"
        />
      </div>
      <Alert severity="info" sx={{ my: 3, mx: 4 }}>
        <AlertTitle>
          <h1>Ratiolyzer</h1>
        </AlertTitle>
        <p>
          Introducing a comprehensive financial ratio analysis called RatioLYZER
          based on the provided data. Here are some key insights into the
          company's financial performance.
        </p>

        <h2>Financial Ratios:</h2>
        <ul>
          <li>
            Profit Margin: Indicates profitability. We categorized it into
            [Good, Neutral, Bad] ranges.
          </li>
          <li>
            Gross Margin: Measures gross profit as a percentage of revenue.
          </li>
          <li>Operating Margin: Reflects operating efficiency.</li>
          <li>
            ROA (Return on Assets): Evaluates the ability to generate profit
            from assets.
          </li>
          <li>
            ROE (Return on Equity): Gauges the return on shareholders' equity.
          </li>
          <li>Current Ratio: Assesses short-term liquidity.</li>
        </ul>

        <h2>Insights:</h2>
        <ul>
          <li>Provide insights based on the categorized ranges.</li>
          <li>Highlight areas of strength and improvement.</li>
          <li>Summarize the overall financial ratio health of the company.</li>
          <li>Mention notable strengths and areas that may need attention.</li>
        </ul>
        <Button
          color="success"
          variant="contained"
          onClick={() =>
            window.open(
              "https://predictram-ratio-analyzer.streamlit.app/",
              "_blank"
            )
          }
        >
          Start Using
        </Button>
      </Alert>
    </>
  );
}
