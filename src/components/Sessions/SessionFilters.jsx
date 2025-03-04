import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SessionTagSelect from "../../views/inputs/SelectInputs/SelectWrapper/SessionTagSelect";

function SessionFilters({ setParams }) {
  const [sessionDate, setSessionDate] = useState();
  const [sessionTag, setSessionTag] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionDate && !sessionTag)
      return toast.error("Select atleast a date or tag");

    let _params = {};
    if (sessionDate) {
      _params.date = sessionDate;
    }

    if (sessionTag) {
      _params.tags = sessionTag.value;
    }

    setParams(_params);
  };

  return (
    <CCard>
      <CCardHeader>Filters</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div>
            <CFormLabel>Date</CFormLabel>
            <CFormInput
              name="date"
              placeholder="Enter Date"
              type="date"
              value={sessionDate}
              onChange={(event) => setSessionDate(event.target.value)}
            />
          </div>
          <div className="mt-3">
            <CFormLabel>Session Tag</CFormLabel>
            <SessionTagSelect value={sessionTag} setValue={setSessionTag} />
          </div>
          <CButton className="mt-3" type="submit">
            Apply
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
}

export default SessionFilters;
