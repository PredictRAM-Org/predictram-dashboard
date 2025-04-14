import {
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CRow,
} from "@coreui/react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import PhoneVerifier from "./PhoneVerifier";
import EmailVerifier from "./EmailVerifier";
import { registerUser } from "../../../../api/services/AuthenticationService";
import { useSelector } from "react-redux";

export default function Register() {
  const history = useHistory();
  const { role } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const refercode = queryParams.get("refercode");
  const [phoneConfig, setPhoneConfig] = useState({});
  const [emailConfig, setEmailConfig] = useState({});
  const [state, setState] = useState({
    name: "",
    password: "",
    confirmpassword: "",
    refercode: "",
  });
  const [loading, setLoading] = useState(false);
  const investorAuth = useSelector((state) => state.investor.authenticated);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (investorAuth)
        return toast.error("your are currently logged in as an investor");

      if (state.password !== state.confirmpassword)
        return toast.error(
          "Your confirm password is not same as your password"
        );

      if (!emailConfig?.otp)
        return toast.error(
          "Email not verified!! Please click on send otp and verify"
        );

      // if (!phoneConfig?.phnotp)
      //   return toast.error("Mobile number not verified!!");

      const secret_token = await bcrypt.hash(emailConfig.email, 10);

      const userRegistered = await registerUser(setLoading, {
        name: state.name,
        ...emailConfig,
        // ...phoneConfig,
        password: state.password,
        refercode: state.refercode,
        secret_token,
        role: role || "USER",
      });

      if (userRegistered.statusCode === 200) {
        history.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.response && error.response.data);
    }
  };

  useEffect(() => {
    if (refercode) setState({ ...state, refercode });
  }, []);

  return (
    <CRow>
      <CCol className="mx-auto" sm={12} md={6}>
        <CCard className="mx-auto mb-4">
          <CCardHeader>
            <CCardTitle>New User Registration</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={register} className="row g-3">
              <CCol xs={12} md={12}>
                <CFormLabel htmlFor="inputFullname">Full Name</CFormLabel>
                <CFormInput
                  id="inputFullname"
                  name="name"
                  required
                  onChange={changeHandler}
                  placeholder="Enter Full Name"
                />{" "}
              </CCol>
              <CCol sm={12} md={12}>
                <CFormLabel htmlFor="inputRefercode">
                  Refer Code (optional)
                </CFormLabel>
                <CFormInput
                  id="inputRefercode"
                  name="refercode"
                  value={refercode}
                  onChange={changeHandler}
                  placeholder="Enter Refer code"
                />{" "}
              </CCol>
              <CCol sm={12} md={6}>
                <CFormLabel htmlFor="inputPassword"> Password</CFormLabel>
                <CFormInput
                  required
                  id="inputPassword"
                  type="password"
                  onChange={changeHandler}
                  name="password"
                  placeholder="Password"
                />{" "}
              </CCol>
              <CCol sm={12} md={6}>
                <CFormLabel htmlFor="inputConfirmPassword">
                  Confirm Password
                </CFormLabel>
                <CFormInput
                  type="password"
                  required
                  id="inputConfirmPassword"
                  onChange={changeHandler}
                  name="confirmpassword"
                  placeholder=" Confirm Password"
                />{" "}
              </CCol>
              <EmailVerifier setValue={setEmailConfig} />
              {/* <PhoneVerifier setValue={setPhoneConfig} /> */}
              <CRow className="m-2">
                <CCol sm={12} className="text-center">
                  <CButton type="submit">Register</CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
