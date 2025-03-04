import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  InputBase,
  Button,
} from "@mui/material";
import {
  Code,
  WbSunny,
  CurrencyBitcoin,
  ShowChart,
  AttachMoney,
  NorthEast,
} from "@mui/icons-material";
import { useThemeContext } from "../../../../contexts/ThemeProvider";
import { ArrowForward } from "@mui/icons-material";
import axios from "axios";
import Uploader from "./Uploader";
import CircularProgress from "@mui/material/CircularProgress";
import { getProfile } from "../../../../api/services/ProfileService";
import { useDispatch } from "react-redux";

const topics = [
  {
    icon: AttachMoney,
    text: "How do specific assets contribute to overall portfolio risk?",
  },
  {
    icon: ShowChart,
    text: "What hedging strategies are in place to mitigate risks?",
  },
  { icon: AttachMoney, text: "What is the portfolio’s overall risk exposure?" },
  {
    icon: ShowChart,
    text: "What is the optimal asset allocation to minimize risk?",
  },
  // {
  //   icon: WbSunny,
  //   text: "How frequently should risk assessments be updated?",
  // },
  // {
  //   icon: CurrencyBitcoin,
  //   text: "What is the plan for responding to identified risks?",
  // },
];

export default function ChatInterface({ financialAnalysisMessage }) {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
  // const userid = useSelector((state) => state.user);

  const dispatch = useDispatch();
  dispatch({ type: "sidebar", sidebarShow: false });

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (financialAnalysisMessage) {
      handleSendMessage(financialAnalysisMessage);
    }
  }, [financialAnalysisMessage]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile(setLoading);
    if (!data?.iscomplete) {
      setUser(data?.user);
    } else {
      setProfile(data?.profile);
    }
  };

  const handleSendMessage = async (userMessage) => {
    const isAnalysisMessage =
      typeof userMessage === "string" && userMessage.startsWith(`f"""`);

    const isUserMessage = typeof userMessage === "string";
    const messageToSend = isUserMessage ? userMessage : message;

    if (messageToSend.trim() !== "") {
      if (!chatStarted) setChatStarted(true);

      const newMessage = {
        sender: isAnalysisMessage ? "analysis" : "user",
        text: messageToSend,
      };

      setChat((prevChat) => [...prevChat, newMessage]);
      setLoading(true);
      const apiUrl = `https://payload.vextapp.com/hook/NBONBK7C8A/catch/$(channel_token)'`;
      const payload = { payload: messageToSend };

      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Accept: "/",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            Apikey: "Api-Key EByzmv4x.0FLZqAuP3CssgEYg5oXJZrq5sAN2GCZb",
          },
        });
        const botMessage = {
          sender: "bot",
          text: response.data.text || "Received your message!",
        };
        setChat((prevChat) => [...prevChat, botMessage]);
      } catch (error) {
        const errorMessage = { sender: "bot", text: "Error sending message." };
        setChat((prevChat) => [...prevChat, errorMessage]);
      } finally {
        setLoading(false);
        setMessage("");
      }
    }
  };

  const handleTopicClick = (topicText) => {
    handleSendMessage(topicText);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          // position: "fixed",
          bgcolor: "palette.background.default",
          left: {
            xs: 0,
            md: 0,
            lg: 0,
            xl: "80px",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Box sx={{ width: "1000px", mx: "auto" }}>
          <Box sx={{ mt: 0 }}>
            {!chatStarted && (
              <>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "52px",
                    fontFamily: "Poppins",
                    color: mode === "dark" ? "#fffff" : "#272BAB",
                  }}
                >
                  Hey {profile?._id?.name}
                  <span
                    style={{
                      display: "inline-block",
                      animation: "wave 2s infinite",
                      transformOrigin: "70% 70%",
                    }}
                  >
                    👋
                  </span>
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "48px",
                    fontFamily: "Poppins",
                    color: mode === "dark" ? "#5a5a5a" : "#9b82e1",
                    mb: 2,
                  }}
                >
                  How Can I help you Today?
                </Typography>
                <Grid container spacing={1.5} sx={{ paddingTop: 5 }}>
                  {topics.map((topic, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper
                        elevation={0}
                        onClick={() => handleTopicClick(topic.text)}
                        sx={{
                          bgcolor: "#F2F2FF",
                          borderRadius: 5,
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              background:
                                "linear-gradient(to right, #9B82E1, #684CB5)",
                              p: 1,
                              borderRadius: "50%",
                              mr: 2,
                            }}
                          >
                            <topic.icon sx={{ color: "white", fontSize: 24 }} />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "purpleDarkText.main",
                              fontFamily: "Poppins",
                              fontWeight: 500,
                            }}
                          >
                            {topic.text}
                          </Typography>
                          <NorthEast sx={{ color: "primary.light" }} />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            <Box sx={{ maxHeight: "450px", overflowY: "auto", mt: 2 }}>
              {chat.map((msg, index) => (
                <>
                  {msg.sender !== "analysis" ? (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          mx: 1,
                          bgcolor:
                            msg.sender === "user" ? "#321FDB" : "#F2F2FF",
                          color: msg.sender === "user" ? "white" : "black",
                          borderRadius: 2,
                          maxWidth: "75%",
                          whiteSpace: "pre-line",
                        }}
                      >
                        <Typography variant="body1" component="span">
                          {msg.text
                            .split(/(\*\*.*?\*\*)/g)
                            .map((part, i) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={i}>
                                  {part.replace(/\*\*/g, "")}{" "}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                </>
              ))}
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <CircularProgress size={20} sx={{ marginRight: 1 }} />
                  <Typography variant="body2">Typing...</Typography>
                </Box>
              )}
              <div ref={chatEndRef} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          left: {
            xs: 0,
            xl: 0,
          },
          bottom: theme.spacing(8),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: theme.spacing(6),
        }}
      >
        <Box
          sx={{
            width: "1000px",
            bgcolor: "#F2F2FF",
            borderRadius: "9999px",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 2,
              justifyContent: "space-between",
              bgcolor:
                mode === "dark"
                  ? "customPalette.lighterDark.main"
                  : "customPalette.purpleVeryLight.main",
            }}
          >
            <InputBase
              placeholder="Start your conversation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent the default behavior (e.g., form submission)
                  handleSendMessage(message);
                }
              }}
              sx={{
                flexGrow: 1,
                color:
                  mode === "dark"
                    ? "customPalette.darkText.main"
                    : "customPalette.purpleDarkText.main",
                fontFamily: "Poppins",
                py: 1,
                px: 2,
                borderRadius: "9999px",
                bgcolor:
                  mode === "dark"
                    ? "customPalette.lighterDark.main"
                    : "customPalette.purpleVeryLight.main",

                "& input": {
                  "&::placeholder": {
                    color:
                      mode === "dark"
                        ? "customPalette.darkText.main"
                        : "customPalette.purpleDarkText.main",
                    opacity: 1,
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* <Uploader /> */}
              <Button
                variant="contained"
                onClick={() => handleSendMessage(message)}
                sx={{
                  minWidth: 0,
                  p: 1.25,
                  borderRadius: "50%",
                  background: `linear-gradient(to right, customPalette.purpleAccent.main, customPalette.purpleAccent.primary)`,
                }}
              >
                <ArrowForward />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
