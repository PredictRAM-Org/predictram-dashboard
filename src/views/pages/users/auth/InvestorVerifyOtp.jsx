import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createInvestors,
  getInvestors,
} from "../../../../api/services/InvestorService";
import Loader from "../Loader";
import { nanoid } from "nanoid";

function InvestorVerifyOtp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { investorpreAuth } = JSON.parse(
    localStorage.getItem("investorpreAuth")
  );
  const userMobileNumber = localStorage.getItem("mobileNumber");

  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timeLeftToResendOTP, setTimeLeftToResendOTP] = useState(10);
  const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(false);

  const getAuthenticatedUserData = async () => {
    const {
      data: [userData],
    } = await getInvestors(setLoading, { mobileNumber: userMobileNumber });
    console.log("secretToken", userData.secretToken);
    localStorage.setItem("secretToken", userData.secretToken);
    dispatch({ type: "INVESTOR_SIGNUP", payload: userData });
  };

  const automaticTimer = () => {
    setIsResendOtpDisabled(true);
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
  };

  useEffect(() => {
    automaticTimer();
  }, []);

  const setLocalUserData = () => {
    const userAuthenticated = { authenticated: true };
    localStorage.setItem("investorAuth", JSON.stringify(userAuthenticated));
    dispatch({ type: "INVESTOR_AUTHENTICATED" });
  };

  const verifyOtpForSignup = async (e) => {
    let _otp = e.target.value;
    setOtp(_otp);

    if (_otp?.length === 6) {
      setLoading(true);
      try {
        const confirmationResult = window.confirmationResult;
        const { user } = await confirmationResult.confirm(_otp);
        const { data } = await createInvestors(setLoading, {
          mobileNumber: user?.phoneNumber,
          refercode: localStorage.getItem("referCode"),
          uniqueId: nanoid(10),
        });
        if (!!data) {
          setVerified(true);
          setLocalUserData();
          localStorage.removeItem("referCode");
          history.push("/register/investor/info");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyOtpForLogin = async (e) => {
    let _otp = e.target.value;
    setOtp(_otp);

    if (_otp?.length === 6) {
      setLoading(true);
      try {
        const confirmationResult = window.confirmationResult;
        const { user } = await confirmationResult.confirm(_otp);
        setVerified(true);
        setLocalUserData();
        getAuthenticatedUserData();
        toast.success("Logged in successfully");
        dispatch({ type: "investorSidebar", investorSidebarShow: true });
        history.push("/investor/dashboard", { refresh: true });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // const requestOtp = () => {
  //   if (!phoneNumber) return toast.error("Please enter a phone number");

  //   if (!isValidPhoneNumber(phoneNumber))
  //     return toast.error("Please enter a valid phone number");

  //   setLoading(true);
  //   setIsResendOtpDisabled(true);

  //   const otpSendingToast = toast.loading("Sending otp....");

  //   const timerToResendOtp = setInterval(() => {
  //     setTimeLeftToResendOTP((time) => {
  //       if (time === 1) {
  //         clearInterval(timerToResendOtp);
  //         setIsResendOtpDisabled(false);
  //         return 10;
  //       }
  //       return time - 1;
  //     });
  //   }, 1000);

  //   generateRecaptcha();
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(
  //     authentication,

  //     phoneNumber,

  //     appVerifier
  //   )
  //     .then((res) => {
  //       window.confirmationResult = res;
  //       toast.dismiss(otpSendingToast);
  //       toast.success("OTP sent successfully");
  //       setShowVerifyOTP(true);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <div className="card-container">
      <CCard>
        <CCardHeader className="card-options-title-medium">
          Verify OTP
        </CCardHeader>
        <CCardBody>
          {loading && <Loader />}
          {!loading && (
            <>
              <CFormLabel htmlFor="inputphnOtp">OTP</CFormLabel>
              <CFormInput
                onChange={
                  investorpreAuth ? verifyOtpForLogin : verifyOtpForSignup
                }
                id="inputphnOtp"
                name="otp"
                required
                placeholder="Enter OTP"
                className={verified ? "is-valid" : "is-invalid"}
              />

              <p className="text-muted my-2">
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
                      // onClick={requestOtp}
                    >
                      Resend OTP
                    </span>
                  </>
                )}
              </p>
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default InvestorVerifyOtp;
