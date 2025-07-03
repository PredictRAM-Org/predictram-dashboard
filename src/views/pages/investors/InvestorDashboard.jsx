import { CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InvestorPortfolioWidget from "./InvestorPortfolioWidget";
import InvestorProfileProgress from "./InvestorProfileProgress";
import InvestorRiskView from "./InvestorRiskView";
import InvestorViewETF from "./InvestorViewETF";
import InvestorRecommend from "./InvestorRecommend";
import InvestorViewEventsWidget from "./InvestorViewEventsWidget";
import { Box, Button, Paper, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

function InvestorDashboard() {
  const investor = useSelector((state) => state.investor);
  const kycCompleted = useSelector((state) => state.investor.kycCompleted);

  // if (!kycCompleted) {
  //   return (
  //     <Box
  //       sx={{
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         width: "100vw",
  //         height: "100vh",

  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Paper
  //         elevation={8}
  //         sx={{
  //           p: 5,
  //           borderRadius: 4,
  //           textAlign: "center",
  //           minWidth: 340,
  //           maxWidth: "90vw",
  //           background: "linear-gradient(135deg, #ffffff 60%, #e3f2fd 100%)",
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             mb: 2,
  //           }}
  //         >
  //           <LockIcon sx={{ fontSize: 60, color: "#1976d2" }} />
  //         </Box>
  //         <Typography
  //           variant="h5"
  //           fontWeight={700}
  //           gutterBottom
  //           color="primary"
  //         >
  //           Access Restricted
  //         </Typography>
  //         <Typography variant="body1" sx={{ mb: 3 }}>
  //           To activate your account, please complete your KYC first.
  //         </Typography>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           size="large"
  //           onClick={() =>
  //             (window.location.href =
  //               "https://live.meon.co.in/paramsdata/rm_analyst")
  //           }
  //           sx={{
  //             px: 4,
  //             py: 1.5,
  //             fontWeight: 600,
  //             borderRadius: 2,
  //             boxShadow: 2,
  //             textTransform: "none",
  //           }}
  //         >
  //           Complete KYC
  //         </Button>
  //       </Paper>
  //     </Box>
  //   );
  // }

  return (
    <>
      <div>
        <h1>
          Welcome Back, {investor?.firstName ? investor.firstName : "Investor"}!
        </h1>
      </div>
      {!investor?.profileCompleted && (
        <CRow className="my-5">
          <CCol xs={12} md={12}>
            <InvestorProfileProgress />
          </CCol>
        </CRow>
      )}
      <CRow className="mt-5">
        <CCol xs={12} md={6}>
          <InvestorRiskView />
        </CCol>
        <CCol xs={12} md={6}>
          <InvestorPortfolioWidget />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <InvestorRecommend />
        </CCol>
      </CRow>
      <CRow className="my-5">
        {/* <InvestorViewETF /> */}
        <InvestorViewEventsWidget />
      </CRow>
    </>
  );
}

export default InvestorDashboard;
