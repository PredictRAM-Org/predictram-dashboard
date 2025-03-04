import React, { useEffect, useState } from "react";
import { authentication } from "../../../../config/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  CButton,
  CCol,
  CCollapse,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import { toast } from "react-toastify";
import "../../../../assets/css/Colors.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

function PhoneVerifier({ setValue }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [timeLeftToResendOTP, setTimeLeftToResendOTP] = useState(10);
  const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(false);

  useEffect(() => {
    setValue({ phone: phoneNumber, phnotp: otp });
  }, [phoneNumber, otp]);

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

  const requestOtp = () => {
    if (!phoneNumber) return toast.error("Please enter a phone number");

    if (!isValidPhoneNumber(phoneNumber))
      return toast.error("Please enter a valid phone number");

    setLoading(true);
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

    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(
      authentication,

      phoneNumber,

      appVerifier
    )
      .then((res) => {
        window.confirmationResult = res;
        toast.dismiss(otpSendingToast);
        toast.success("OTP sent successfully");
        setShowVerifyOTP(true);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const verifyOtp = (e) => {
    let _otp = e.target.value;
    setOtp(_otp);

    if (_otp?.length === 6) {
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(_otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          setVerified(true);
          // ...
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <CCol sm={12} md={12}>
        <CFormLabel htmlFor="inputPhone">Phone number</CFormLabel>
        <CRow className="mb-3 g-3">
          <CCol sm={12} md={!showVerifyOTP ? 9 : 12}>
            <PhoneInput
              defaultCountry="IN"
              international
              countryCallingCodeEditable={false}
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your mobile number"
            />
          </CCol>
          {!showVerifyOTP && (
            <CCol sm={12} md={3}>
              <CButton
                type="button"
                color="primary"
                variant="outline"
                onClick={requestOtp}
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
                    onClick={requestOtp}
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
        <CCol xs={12} md={12}>
          <CFormLabel htmlFor="inputphnOtp">Verify OTP</CFormLabel>
          <CFormInput
            onChange={verifyOtp}
            id="inputphnOtp"
            name="otp"
            placeholder="Enter OTP"
            className={verified ? "is-valid" : "is-invalid"}
          />
        </CCol>
      </CCollapse>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default PhoneVerifier;
