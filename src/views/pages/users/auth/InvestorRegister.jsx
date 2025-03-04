import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormText,
} from "@coreui/react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import SecurityIcon from "@mui/icons-material/Security";
import { getInvestors } from "../../../../api/services/InvestorService";
import "../../../../assets/css/Forms.css";
import { authentication } from "../../../../config/FirebaseConfig";
import { verifyReferCode } from "../../../../api/services/ReferralService";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

function InvestorRegister() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const InvestorRefercode = queryParams.get("refercode");
  const [mobileNumber, setMobileNumber] = useState("");
  const [refercode, setReferCode] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.user.authenticated);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const checkPreExistingUser = async () => {
    const {
      data: [userData],
    } = await getInvestors(setLoading, {
      mobileNumber: mobileNumber,
    });
    return userData;
  };

  useEffect(() => {
    const userAuthenticated = { investorpreAuth: false };
    localStorage.setItem("investorpreAuth", JSON.stringify(userAuthenticated));
    if (InvestorRefercode) {
      setReferCode(InvestorRefercode);
    }
  }, []);

  const requestOtp = async (e) => {
    e.preventDefault();
    if (auth) return toast.error("your are currently logged in as an advisor");
    if (refercode !== "") {
      const res = await verifyReferCode(setLoading, { refercode: refercode });
      if (!res?.data?.valid) {
        return;
      }
    }
    if (!mobileNumber) return toast.error("Please enter a phone number");
    const userExists = await checkPreExistingUser();
    if (!!userExists)
      return toast.error("User with this mobile number already exists");
    setLoading(true);
    try {
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const res = await signInWithPhoneNumber(
        authentication,

        mobileNumber,

        appVerifier
      );
      window.confirmationResult = res;
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("referCode", refercode);
      toast.success("OTP sent successfully");
      history.push("/register/investor/verify-otp");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <CCard>
        <CCardHeader className="card-options-title-medium">Signup</CCardHeader>
        <CCardBody>
          <CForm onSubmit={requestOtp} className="row g-3">
            <CCol className="form-contact-container" xs={12} md={12}>
              <CFormLabel htmlFor="inputMobileNumber">Mobile Number</CFormLabel>
              <PhoneInput
                defaultCountry="IN"
                international
                countryCallingCodeEditable={false}
                value={mobileNumber}
                onChange={setMobileNumber}
                placeholder="Enter your mobile number"
              />
              <CFormText>You will receive an OTP on your number</CFormText>
              <CFormLabel className="mt-2" htmlFor="inputRefercode">
                Refercode (optional)
              </CFormLabel>
              <CFormInput
                id="inputRefercode"
                name="Refercode"
                value={refercode}
                onChange={(e) => setReferCode(e.target.value)}
                placeholder="Enter Refer Code (optional)"
              />
            </CCol>
            <CButton disabled={loading} type="submit">
              {loading ? "Sending OTP ..." : "Continue"}
            </CButton>
          </CForm>
          <div id="recaptcha-container"></div>
        </CCardBody>
      </CCard>
      <Alert
        icon={<SecurityIcon fontSize="inherit" />}
        sx={{ my: "2em" }}
        severity="success"
      >
        Your privacy is our priority. Rest assured, all the information you
        provide on this registration page is tokenized for your security.
      </Alert>
    </div>
  );
}

export default InvestorRegister;
