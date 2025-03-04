import { Alert, AlertTitle, Button } from "@mui/material";

export default function PredictGpt() {
  return (
    <>
      <Alert severity="info" sx={{ my: 3, mx: 4 }}>
        <AlertTitle>
          <h1>PredictRAM-cGPU</h1>
        </AlertTitle>
        <div>
          <h6>Unleashing Financial Insights with AI Precision!</h6>
          <ul>
            <li>
              <b>Comprehensive Understanding:</b> PredictGpt provides in-depth
              explanations of financial terms, ensuring users gain a
              comprehensive understanding of the terminology.
            </li>
            <li>
              <b>Dynamic AI Analysis:</b> Leverage the power of dynamic AI
              analysis to receive real-time insights and stay updated on the
              latest financial trends and terms.
            </li>
            <li>
              <b>User-Friendly Interface:</b> Enjoy a seamless experience with
              PredictGpt's user-friendly interface, making financial education
              accessible to users of all backgrounds and expertise levels.
            </li>
            <li>
              <b>Personalized Learning:</b> Tailor your financial knowledge
              journey with PredictGpt's personalized learning feature, adapting
              to your pace and preferences for a more effective learning
              experience.
            </li>
            <li>
              <b>Cross-Platform Accessibility:</b> Access PredictGpt anytime,
              anywhere, as it is designed to be cross-platform, ensuring you can
              enhance your financial literacy on desktops, tablets, or mobile
              devices with ease.
            </li>
          </ul>
        </div>

        <Button
          color="success"
          variant="contained"
          onClick={() =>
            window.open(`https://predictram-gpt.streamlit.app/`, "_blank")
          }
        >
          Start Using
        </Button>
      </Alert>
    </>
  );
}
