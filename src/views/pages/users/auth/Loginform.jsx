import React, { useState } from "react";
import {
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
} from "@coreui/react";
import { post } from "axios";
import { Link, useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cibLinkedin } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import { getInvestors } from "../../../../api/services/InvestorService";
export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const investorAuth = useSelector((state) => state.investor.authenticated);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailPass, setIsEmailPass] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const linkedin = () => {
    window.open("/api/auth/linkedin", "_self");
  };
  async function loginClick(e) {
    e.preventDefault();
    try {
      if (investorAuth)
        return toast.error("your are currently logged in as an investor");
      if (email) {
        const logindata = { email, password };
        const { data } = await post(
          "/api/auth/login/email-password",
          logindata
        );

        if (data) {
          dispatch({ type: "LOGIN", payload: data });
          history.push("/");
        }
      } else if (phone) {
        const logindata = { phone, password };
        const { data } = await post(
          "/api/auth/login/phone-password",
          logindata
        );
        if (data) {
          dispatch({ type: "LOGIN", payload: data });
          history.push("/");
        }
      }
    } catch (error) {
      if (phone) {
        const {
          data: [userData],
        } = await getInvestors(setLoading, {
          mobileNumber: phone,
        });
        if (!!userData) {
          Swal.fire(
            "You have an account in investor",
            "go to investor login"
          ).then((value) => {
            if (value.isConfirmed) {
              history.push("/login/investor");
            }
          });
        }
      } else {
        toast.error("Invalid id or Password");
      }
    }
  }
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol sm={12} md={8} xl={6}>
          <CCard>
            <CCardHeader>
              <div className="text-muted text-center mt-2 mb-3">
                <h1>Sign in with credential</h1>
              </div>

              {/*<div className="text-center ">
                <CButton onClick={linkedin} color="info" className="px-4">
                  <CIcon icon={cibLinkedin} size="lg" className="pr-3" />
                  <span className="fw-bold text-white"> linkedin</span>
                </CButton>
  </div>*/}
            </CCardHeader>
            <CCardBody className="p-4">
              {/*<div className="text-center text-muted mb-4">
                <small>sign in with credentials</small>
</div>*/}
              <CForm onSubmit={loginClick}>
                {isEmailPass ? (
                  <div>
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
                ) : (
                  <div>
                    <CFormLabel htmlFor="inputPhone">Phone number</CFormLabel>
                    <PhoneInput
                      id="inputMobileNumber"
                      defaultCountry="IN"
                      international
                      countryCallingCodeEditable={false}
                      value={phone}
                      onChange={setPhone}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                )}
                <div className="mt-3">
                  <CFormLabel htmlFor="inputPassword">Password</CFormLabel>
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
                <CRow>
                  <CCol className="text-end">
                    <Link to="/forgetpassword" color="link" className="px-0">
                      Forgot password?
                    </Link>
                  </CCol>
                </CRow>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <CButton type="submit" color="primary">
                    Login
                  </CButton>
                  <CButton
                    variant="outline"
                    color="success"
                    className="px-0"
                    onClick={() => setIsEmailPass(!isEmailPass)}
                  >
                    {isEmailPass ? "Use Phone Number Login" : "Use Email Login"}
                  </CButton>
                </div>
              </CForm>
              {/* <CContainer>
                <CRow>
                  <CCol>
                    <CButton
                      variant="outline"
                      color="success"
                      active={isEmailPass}
                      className="px-0"
                      onClick={() => setIsEmailPass(true)}
                    >
                      Login With Email
                    </CButton>
                  </CCol>
                  <CCol>
                    <CButton
                      color="success"
                      variant="outline"
                      active={!isEmailPass}
                      className="px-0"
                      onClick={() => setIsEmailPass(false)}
                    >
                      Login With Phone
                    </CButton>
                  </CCol>
                </CRow>
              </CContainer> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}
