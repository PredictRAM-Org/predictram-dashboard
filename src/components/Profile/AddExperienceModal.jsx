import React, { useEffect, useState } from "react";
import {
    CButton,
    CForm,
    CFormInput,
    CFormSwitch,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from "@coreui/react";
import { saveExperience, updateExperience } from "../../api/services/ProfileService";

function AddExperienceModal({ visible, setVisible ,setLoading ,data={},isUpdate=false}) {
  const [experience, setExperience] = useState({});
  const [present, setPresent] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(present);
    if(present) delete experience["enddate"];
    console.log(experience)
    if(isUpdate){
        await updateExperience(setLoading,{...experience,present});
    }else{
        await saveExperience(setLoading,{...experience,present});
    }
    setVisible(false);
  };
  const handelChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setExperience(data);
    if(isUpdate&&data?.present) setPresent(true); 
  },[])
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CForm onSubmit={handelSubmit}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Add Experience</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Company Name</p>
          <CFormInput
            value={experience?.title}
            name="title"
            required
            onChange={(e) => handelChange(e)}
            type="text"
            placeholder="Enter Company Name"
          />
          <p className="mt-3">Description</p>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Example textarea"
            name="description"
            required
            value={experience?.description}
            onChange={(e) => handelChange(e)}
            rows="3"
          ></CFormTextarea>
          <p className="mt-3">Position</p>
          <CFormInput
            value={experience?.position}
            name="position"
            required
            onChange={(e) => handelChange(e)}
            type="text"
            placeholder="Enter Position"
          />
          <p className="mt-3">Select Start date</p>
          <CFormInput
            name="startdate"
            placeholder="Enter Start Date"
            required
            type="date"
            value={experience?.startdate}
            onChange={(e) => {
                console.log(e.target.value);
              handelChange(e);
            }}
          />
          <p className="mt-3">Select End date</p>
          <CFormInput
            name="enddate"
            placeholder="Enter End Date"
            required={!present}
            disabled={present}
            type="date"
            value={experience?.enddate}
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <p className="mt-3">
            Presently working
            <span>
              <CFormSwitch
                shape="pill"
                size="lg"
                style={{
                  width: "2rem",
                  cursor: "pointer",
                }}
                checked={present}
                onChange={(e) => {
                  setPresent(!present);
                }}
              />
            </span>
          </p>
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

export default AddExperienceModal;
