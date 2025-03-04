import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { updateInvestors } from "../../../../api/services/InvestorService";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function InvestorProfileUpdate({ visible, setVisible, setLoading, data }) {
  const [newprofile, setNewProfile] = useState({});
  const investor = useSelector((state) => state.investor);
  const history = useHistory();

  const updateProfile = async (e) => {
    e.preventDefault();
    await updateInvestors(setLoading, { ...newprofile, id: investor._id });
    setVisible(false);
    history.go(0);
  };

  const handelChange = (e) => {
    setNewProfile({ ...newprofile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setNewProfile(data);
  }, []);

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CForm onSubmit={updateProfile}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Profile Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Enter First Name</p>
          <CFormInput
            id="exampleFormControlTextarea1"
            required
            name="firstName"
            placeholder="Enter First Name.."
            value={newprofile?.firstName}
            onChange={(e) => {
              handelChange(e);
            }}
          ></CFormInput>
          <p className="mt-3">Enter Last Name</p>
          <CFormInput
            value={newprofile?.lastName}
            required
            name="lastName"
            onChange={(e) => {
              handelChange(e);
            }}
            type="text"
            placeholder="Your Last Name.."
          />
          <p className="mt-3">Enter Email</p>
          <CFormInput
            value={newprofile?.email}
            required
            name="email"
            onChange={(e) => {
              handelChange(e);
            }}
            type="text"
            placeholder="Your Email.."
          />
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" type="submit">
            Save
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}

export default InvestorProfileUpdate;
