import {
  CButton,
  CCol,
  CCollapse,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { sendEmailOTP } from "../../../../api/services/AuthenticationService";
import { toast } from "react-toastify";

function EmailVerifier({ setValue }) {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeftToResendOTP, setTimeLeftToResendOTP] = useState(10);
  const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(false);

  useEffect(() => {
    setValue({ email, otp });
  }, [email, otp]);

  const sendotp = async (e) => {
    setIsResendOtpDisabled(true);
    const otpSendingToast = toast.loading("Sending otp....");
    const timerToResendOtp = setInterval(() => {
      setTimeLeftToResendOTP((time) => {
        if (time === 1) {
          clearInterval(timerToResendOtp);
          setIsResendOtpDisabled(false);
          return 10;
        }
        return time - 1;
      });
    }, 1000);
    await sendEmailOTP(setLoading, { email });
    toast.dismiss(otpSendingToast);
    setShowVerifyOTP(true);
  };

  return (
    <>
      <CCol xs={12} md={12}>
        <CFormLabel htmlFor="inputEmail">Email Address</CFormLabel>
        <CRow className="mb-3 g-3">
          <CCol sm={12} md={!showVerifyOTP ? 9 : 12}>
            <CFormInput
              onChange={(e) => setEmail(e.target.value)}
              required
              id="inputEmail"
              name="email"
              type="email"
              placeholder="Enter your email address"
              aria-describedby="button-addon1"
            />
          </CCol>
          {!showVerifyOTP && (
            <CCol sm={12} md={3}>
              <CButton
                onClick={sendotp}
                type="button"
                color="primary"
                variant="outline"
                id="button-addon1"
                disabled={showVerifyOTP}
              >
                Send OTP
              </CButton>
            </CCol>
          )}
          {showVerifyOTP && (
            <p className="text-muted mb-0">
              {isResendOtpDisabled && (
                <>
                  Didn't receive any OTP yet? Resend OTP in{" "}
                  {timeLeftToResendOTP} secs
                </>
              )}
              {!isResendOtpDisabled && (
                <>
                  Didn't receive any OTP yet?
                  <span
                    className="color-1 cursor-pointer mx-1"
                    onClick={sendotp}
                  >
                    Resend OTP
                  </span>
                </>
              )}
            </p>
          )}
        </CRow>
      </CCol>
      <CCollapse visible={showVerifyOTP}>
        <CCol className="mb-3" xs={12} md={12}>
          <CFormLabel htmlFor="inputOtp">Verify OTP</CFormLabel>
          <CFormInput
            onChange={(e) => setOtp(e.target.value)}
            id="inputOtp"
            name="otp"
            placeholder="Enter OTP"
          />
        </CCol>
      </CCollapse>
    </>
  );
}

export default EmailVerifier;
