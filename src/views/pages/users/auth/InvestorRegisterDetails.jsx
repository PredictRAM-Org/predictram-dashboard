import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getInvestors,
  updateInvestors,
} from "../../../../api/services/InvestorService";
import Loader from "../Loader";
import { toast } from "react-toastify";

function InvestorRegisterDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const mobileNumber = localStorage.getItem("mobileNumber");

  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
  };

  const fetchAccount = async () => {
    const {
      data: [userData],
    } = await getInvestors(setLoading, { mobileNumber });
    return userData?._id;
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    const userId = await fetchAccount();
    const secretToken = await bcrypt.hash(mobileNumber, 10);
    localStorage.setItem("secretToken", secretToken);
    const { data } = await updateInvestors(setLoading, {
      id: userId,
      ...profileDetails,
      secretToken,
    });
    if (!!data) {
      dispatch({ type: "INVESTOR_SIGNUP", payload: data });
      dispatch({ type: "investorSidebar", investorSidebarShow: true });
    }
    localStorage.setItem(
      "investorpreAuth",
      JSON.stringify({ investorpreAuth: false })
    );

    localStorage.setItem(
      "investorAuth",
      JSON.stringify({ authenticated: false })
    );
    dispatch({ type: "INVESTOR_SIGNOUT" });
    toast.success("Please Login Again");
    history.push("/login/investor");
  };

  return (
    <div className="card-container">
      <CCard>
        <CCardHeader className="card-options-title-medium">
          Tell us something about yourself
        </CCardHeader>
        <CCardBody>
          {loading && <Loader />}
          {!loading && (
            <CForm
              onSubmit={updateAccount}
              className="form-size-medium row g-3"
            >
              <div>
                <CFormLabel htmlFor="inputFirstName"> First Name</CFormLabel>
                <CFormInput
                  onChange={handleChange}
                  id="inputFirstName"
                  name="firstName"
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <CFormLabel htmlFor="inputLastName"> Last Name</CFormLabel>
                <CFormInput
                  onChange={handleChange}
                  id="inputLastName"
                  name="lastName"
                  required
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <CFormLabel htmlFor="inputEmail"> Email</CFormLabel>
                <CFormInput
                  onChange={handleChange}
                  id="inputEmail"
                  name="email"
                  required
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <CFormLabel htmlFor="inputPAN"> PAN</CFormLabel>
                <CFormInput
                  onChange={handleChange}
                  id="inputPAN"
                  name="pan"
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  required
                  placeholder="Enter your PAN"
                />
              </div>
              <div>
                <CFormLabel htmlFor="inputInvestment">
                  How much do you plan to invest in the next 2 years?
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>₹</CInputGroupText>
                  <CFormInput
                    type="number"
                    onChange={handleChange}
                    id="inputInvestment"
                    name="estimatedInvestment"
                    required
                    placeholder="Enter the amount"
                  />
                </CInputGroup>
              </div>
              <CButton disabled={loading} type="submit">
                {loading ? "Loading ..." : "Continue"}
              </CButton>
            </CForm>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default InvestorRegisterDetails;
