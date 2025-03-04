// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import {
//   WbSunny,
//   ShowChart,
//   Code,
//   CurrencyBitcoin,
//   AttachMoney,
//   NorthEast,
// } from "@mui/icons-material";
// import axios from "axios";

// const topics = [
//   { icon: WbSunny, text: "What's Today's Weather in Bareilly?" },
//   { icon: ShowChart, text: "What are the Stock prices today?" },
//   { icon: Code, text: "Write SQL to Generate Report" },
//   { icon: CurrencyBitcoin, text: "I'm interested in crypto investing" },
//   { icon: AttachMoney, text: "I want to create a budget plan" },
//   { icon: ShowChart, text: "Could you analyze this stock for me?" },
// ];

// export default function ChatInterface() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   const handleSendMessage = async (msg) => {
//     if (!msg.trim()) return; // Don't send empty messages
//     const userMessage = { sender: "user", text: msg };
//     setChat((prevChat) => [...prevChat, userMessage]); // Add user message
//     setLoading(true);

//     const apiUrl = `https://payload.vextapp.com/hook/4615HFQVDX/catch/$(channel_token)`;
//     const payload = { payload: msg };

//     try {
//       const response = await axios.post(apiUrl, payload, {
//         headers: {
//           Accept: "/",
//           "Content-Type": "application/json",
//           Apikey: "Api-Key GjYJbCTJ.ZnFUbKVPBXcpS0lDCaDFPoBUlu38KgkN",
//         },
//       });

//       const botMessage = {
//         sender: "bot",
//         text: response.data.text || "Received your message!",
//       };
//       setChat((prevChat) => [...prevChat, botMessage]); // Add bot message
//     } catch (error) {
//       const errorMessage = { sender: "bot", text: "Error sending message." };
//       setChat((prevChat) => [...prevChat, errorMessage]); // Add error message
//     } finally {
//       setLoading(false); // Reset loading state
//       setMessage(""); // Clear input after sending
//     }
//   };

//   const handleTopicClick = (topicText) => {
//     handleSendMessage(topicText); // Send message when topic is clicked
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         bgcolor: "palette.background.default",
//         px: 6,
//         pt: 4,
//       }}
//     >
//       <Box sx={{ width: "916px", mx: "auto", pt: 5 }}>
//         <Typography
//           variant="h1"
//           sx={{
//             fontWeight: "bold",
//             fontSize: "52px",
//             color: "#272BAB",
//           }}
//         >
//           Hey Shubh{" "}
//           <span
//             style={{
//               display: "inline-block",
//               animation: "wave 2s infinite",
//               transformOrigin: "70% 70%",
//             }}
//           >
//             👋
//           </span>
//         </Typography>
//         <Typography
//           variant="h1"
//           sx={{
//             fontWeight: "bold",
//             fontSize: "48px",
//             color: "#9b82e1",
//             mb: 2,
//           }}
//         >
//           How Can I help you Today?
//         </Typography>
//         <Grid container spacing={1.5}>
//           {topics.map((topic, index) => (
//             <Grid item xs={12} md={6} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   borderRadius: 5,
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => handleTopicClick(topic.text)}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Box
//                     sx={{
//                       background: "linear-gradient(to right, #9B82E1, #684CB5)",
//                       p: 1,
//                       borderRadius: "50%",
//                       mr: 2,
//                     }}
//                   >
//                     <topic.icon sx={{ color: "white", fontSize: 24 }} />
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography
//                     sx={{ color: "purpleDarkText.main", fontWeight: 500 }}
//                   >
//                     {topic.text}
//                   </Typography>
//                   <NorthEast sx={{ color: "primary.light" }} />
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//         <Box
//           sx={{
//             mt: 3,
//             bgcolor: "background.paper",
//             borderRadius: "10px",
//             p: 2,
//           }}
//         >
//           {chat.map((msg, index) => (
//             <Box
//               key={index}
//               sx={{
//                 mb: 2,
//                 display: "flex",
//                 justifyContent:
//                   msg.sender === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               <Box
//                 sx={{
//                   background:
//                     msg.sender === "user" ? "primary.main" : "grey.300",
//                   color: msg.sender === "user" ? "white" : "black",
//                   borderRadius: "20px",
//                   p: 2,
//                   maxWidth: "70%",
//                 }}
//               >
//                 {msg.text}
//               </Box>
//             </Box>
//           ))}
//           {loading && (
//             <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//               <CircularProgress size={24} />
//               <Typography sx={{ ml: 1 }}>Typing...</Typography>
//             </Box>
//           )}
//           <div ref={chatEndRef}></div>
//         </Box>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSendMessage(message);
//           }}
//           style={{ display: "flex", justifyContent: "space-between", mt: 2 }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Type your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             sx={{ flexGrow: 1, mr: 1, borderRadius: "20px" }}
//           />
//           <Button
//             variant="contained"
//             type="submit"
//             sx={{
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <NorthEast sx={{ color: "white" }} />
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import {
  CRow,
  CContainer,
  CCol,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CForm,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import { cilSend } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]); // To store chat messages
  const [loading, setLoading] = useState(false); // To manage loading state
  const chatEndRef = useRef(null); // Reference to the end of the chat container

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const userMessage = { sender: "user", text: message };
      setChat([...chat, userMessage]);
      setLoading(true); // Show loading bubble

      const apiUrl = `https://payload.vextapp.com/hook/4615HFQVDX/catch/$(channel_token)`;
      const payload = {
        payload: message,
      };

      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Accept: "/",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            Apikey: "Api-Key GjYJbCTJ.ZnFUbKVPBXcpS0lDCaDFPoBUlu38KgkN",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const botMessage = {
            sender: "bot",
            text: data.text || "Received your message!",
          };
          setChat((prevChat) => [...prevChat, botMessage]);
        } else {
          const errorMessage = {
            sender: "bot",
            text: "Failed to send message.",
          };
          setChat((prevChat) => [...prevChat, errorMessage]);
        }
      } catch (error) {
        const errorMessage = { sender: "bot", text: "Error sending message." };
        setChat((prevChat) => [...prevChat, errorMessage]);
      } finally {
        setLoading(false); // Hide loading bubble
        setMessage("");
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  return (
    <>
      <CContainer fluid>
        <CRow>
          <h1 className="text-center m-0 mb-3 pb-3">ADHUNIQ</h1>
        </CRow>
        <CRow className="mb-3">
          <CCard
            className={"bg-light text-dark"}
            style={{ height: "400px", borderRadius: "20px", overflowY: "auto" }}
          >
            <CCardBody>
              {chat.length === 0 && !loading ? (
                <div className="text-muted text-center">
                  Enter your query to start the conversation
                </div>
              ) : (
                <>
                  {chat.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex flex-column ${
                        msg.sender === "user"
                          ? "align-items-end"
                          : "align-items-start"
                      } mb-3`}
                    >
                      <div
                        className={`p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-white text-dark"
                        }`}
                        style={{ borderRadius: "20px", maxWidth: "80%" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="d-flex align-items-start mb-2">
                      <div
                        className="p-2 bg-white text-dark"
                        style={{ borderRadius: "20px", maxWidth: "75%" }}
                      >
                        <CSpinner size="sm" /> Typing...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}></div>
                </>
              )}
            </CCardBody>
          </CCard>
        </CRow>
        <CRow>
          <CCol
            xs="12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CForm
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5em",
                }}
              >
                <div style={{ width: "50rem" }}>
                  <CFormInput
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="p-3"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <div>
                  <CButton
                    color="primary"
                    type="submit"
                    onClick={handleSendMessage}
                    style={{
                      borderRadius: "50%",
                      padding: "10px",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      width="24"
                      height="24"
                    >
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg> */}
                    <CIcon icon={cilSend} />
                  </CButton>
                </div>
              </div>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Chat;
