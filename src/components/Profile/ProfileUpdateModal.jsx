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
import { saveProfile } from "../../api/services/ProfileService";

function ProfileUpdateModal({ visible, setVisible, setLoading, data }) {
  const [newprofile, setNewProfile] = useState({});
  const options = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];

  const updateProfile = async (e) => {
    e.preventDefault();
    const data={...newprofile,gender:newprofile?.gender?.value};
    await saveProfile(setLoading,data);
    setVisible(false);
    
  };

  const handelChange = (e) => {
    setNewProfile({...newprofile,[e.target.name]:e.target.value});
  }

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
          <p>Enter about yourself</p>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Example textarea"
            required
            name="about"
            value={newprofile?.about}
            onChange={(e) => {handelChange(e)}}
            rows="3"
          ></CFormTextarea>
          <p className="mt-3">Enter your age</p>
          <CFormInput
            value={newprofile?.age}
            required
            name="age"
            onChange={(e) => {handelChange(e)}}
            type="number"
            placeholder="Your age"
          />
          <p className="mt-3">Select gender</p>
          <Select
            value={newprofile?.gender}
            required
            name="gender"
            onChange={(e) => {
              setNewProfile({...newprofile,gender:e})
            }}
            options={options}
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

export default ProfileUpdateModal;
