import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayRazorpayForSpecificAmount } from "../../../../utils/PaymentGateway";
import { getFutureDate } from "../../../../utils/DateTimeService";
import PaymentSuccessGIF from "../../../../assets/images/payment_success_gif.gif";
import { getInvestors } from "../../../../api/services/InvestorService";

function AddCreditDialog({ show, setShow }) {
  const { _id: userId, mobileNumber } = useSelector((state) => state.investor);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUpdatedCredit = async () => {
    const {
      data: [userData],
    } = await getInvestors(setLoading, { mobileNumber });

    dispatch({ type: "INVESTOR_SIGNUP", payload: userData });
  };

  useEffect(() => {
    if (confirmation) {
      fetchUpdatedCredit();
    }
  }, [confirmation]);

  const handelClose = () => {
    setShow(false);
    setConfirmation(false);
    setLoading(false);
  };

  return (
    <CModal visible={show} onClose={handelClose}>
      <CModalHeader onClose={handelClose}>
        <CModalTitle>Add Credit</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {confirmation ? (
          <Box textAlign="center">
            <img
              src={PaymentSuccessGIF}
              alt="Payment Successful"
              style={{ width: "150px", marginBottom: "20px" }}
            />
            <Typography variant="h6" gutterBottom>
              Payment Successful!
            </Typography>
            <Button variant="contained" onClick={handelClose}>
              Close
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Enter the Credit Amount
            </Typography>
            <TextField
              label={"Credit Amount"}
              fullWidth
              //   margin="normal"
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={() =>
                displayRazorpayForSpecificAmount(
                  userId,
                  amount,
                  setLoading,
                  setConfirmation,
                  getFutureDate(1)
                )
              }
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </>
        )}
      </CModalBody>
    </CModal>
  );
}

export default AddCreditDialog;
