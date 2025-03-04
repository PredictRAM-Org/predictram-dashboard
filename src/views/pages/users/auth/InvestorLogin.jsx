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
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import TokenIcon from "@mui/icons-material/Token";
import { getInvestors } from "../../../../api/services/InvestorService";
import "../../../../assets/css/Forms.css";
import { authentication } from "../../../../config/FirebaseConfig";
import { getUserByMobile } from "../../../../api/services/UserService";
import Swal from "sweetalert2";
import { Alert, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function InvestorLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.user.authenticated);
  const [phoneForm, setPhoneForm] = useState(true);
  const [emailForm, setEmailForm] = useState(false);

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

  const setPreAuthState = () => {
    const userAuthenticated = { investorpreAuth: true };
    localStorage.setItem("investorpreAuth", JSON.stringify(userAuthenticated));
  };

  const requestOtp = async (e) => {
    e.preventDefault();
    if (auth) return toast.error("your are currently logged in as an advisor");
    if (!mobileNumber) return toast.error("Please enter a phone number");
    try {
      const {
        data: [userData],
      } = await getInvestors(setLoading, {
        mobileNumber,
      });

      if (!userData) {
        const {
          data: [user],
        } = await getUserByMobile(setLoading, { phone: mobileNumber });
        if (user) {
          Swal.fire(
            "You have an account in advisor",
            "go to advisor login"
          ).then((value) => {
            if (value.isConfirmed) {
              history.push("/login/advisor", { reload: true });
            }
          });
        } else {
          toast.error("You Do not have any account");
        }
      } else {
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        setLoading(true);
        const res = await signInWithPhoneNumber(
          authentication,

          mobileNumber,

          appVerifier
        );
        window.confirmationResult = res;
        toast.success("OTP sent successfully");
        localStorage.setItem("mobileNumber", mobileNumber);
        setPreAuthState();
        history.push("/register/investor/verify-otp");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAuthenticatedUserData = async () => {
    const {
      data: [userData],
    } = await getInvestors(setLoading, { email: email });
    userData?.secretToken
      ? localStorage.setItem("secretToken", userData.secretToken)
      : localStorage.setItem("secretToken", email);
    userData?.mobileNumber
      ? localStorage.setItem("mobileNumber", userData.mobileNumber)
      : localStorage.setItem("email", email);
    const payload = userData?.secretToken
      ? userData
      : { ...userData, secretToken: email };
    dispatch({
      type: "INVESTOR_SIGNUP",
      payload,
    });
  };

  async function loginClick(e) {
    e.preventDefault();
    if (email && password) {
      try {
        const { user } = await signInWithEmailAndPassword(
          authentication,
          email,
          password
        );
        if (user) {
          localStorage.setItem("email", email);
          getAuthenticatedUserData();
          const userAuthenticated = { authenticated: true };
          localStorage.setItem(
            "investorAuth",
            JSON.stringify(userAuthenticated)
          );
          dispatch({ type: "INVESTOR_AUTHENTICATED" });
          history.push("/investor");
        }
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else {
          toast.error("Failed to log in. Please try again later.");
        }
      }
    } else {
      toast.error("Please enter both email and password.");
    }
  }

  return (
    <Box component="div" className="card-container">
      <CCard style={{ width: "50%" }}>
        <CCardHeader className="card-options-title-medium">Login</CCardHeader>
        {phoneForm && (
          <CCardBody>
            <CForm onSubmit={requestOtp} className="row g-3">
              <CCol
                style={{ marginTop: "1rem" }}
                className="form-contact-container"
                xs={12}
                md={12}
              >
                <CFormLabel htmlFor="inputMobileNumber">
                  Mobile Number
                </CFormLabel>
                <PhoneInput
                  defaultCountry="IN"
                  international
                  countryCallingCodeEditable={false}
                  value={mobileNumber}
                  onChange={setMobileNumber}
                  placeholder="Enter your mobile number"
                />
                <CFormText>You will receive an OTP on your number</CFormText>
              </CCol>
              <CButton disabled={loading} type="submit">
                {loading ? "Sending OTP ..." : "Continue"}
              </CButton>
              <CButton
                variant="outline"
                onClick={() => {
                  setEmailForm(true);
                  setPhoneForm(false);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <EmailIcon />
                  {"Continue with email"}
                </div>
              </CButton>
            </CForm>
            <div id="recaptcha-container"></div>
          </CCardBody>
        )}
        {emailForm && (
          <CCardBody className="p-4">
            <CForm onSubmit={loginClick} className="row g-3">
              <div style={{ marginTop: "1rem" }}>
                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                <CFormInput
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  name="email"
                  type="text"
                  id="inputEmail"
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <CFormLabel Label htmlFor="inputPassword">
                  Password
                </CFormLabel>
                <CFormInput
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                  name="password"
                  type="password"
                  id="floatingPassword"
                  placeholder="Enter your password"
                />
              </div>
              {/* <CRow>
                <CCol className="text-end">
                  <Link to="/forgetpassword" color="link" className="px-0">
                    Forgot password?
                  </Link>
                </CCol>
              </CRow> */}
              <CButton type="submit" color="primary">
                Login
              </CButton>
              <CButton
                variant="outline"
                onClick={() => {
                  setEmailForm(false);
                  setPhoneForm(true);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <LocalPhoneIcon />
                  {"Continue with phone"}
                </div>
              </CButton>
            </CForm>
          </CCardBody>
        )}
      </CCard>
      <Alert
        icon={<TokenIcon fontSize="inherit" />}
        sx={{ my: "2em" }}
        severity="success"
      >
        Welcome back! Feel confident logging in, knowing that your data's
        security is maintained through tokenization.
      </Alert>
    </Box>
  );
}

export default InvestorLogin;
