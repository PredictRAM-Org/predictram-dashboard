import {
  CButton,
  CCard,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
} from "@coreui/react";
import React, { useState } from "react";

function Filter({ setParams, setCurrentPage, isSubmitted, setIsSubmitted }) {
  const [filters, setFilters] = useState({});
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setParams(filters);
  };
  return (
    <CCard
      className="shadow-none border border-light d-flex flex-row justify-content-between flex-wrap"
      style={{
        borderRadius: "0.625rem",
        padding: "1.25rem",
        gap: "1rem",
      }}
    >
      <div
        className="d-flex flex-column items-center"
        style={{
          gap: "0.75rem",
          justifyContent: "center",
        }}
      >
        <h2>Filters</h2>
      </div>

      <CForm
        onSubmit={(event) => handleSubmit(event)}
        className="d-flex flex-row align-items-end flex-wrap"
        style={{
          gap: "0.9375rem",
          height: "fit-content",
        }}
      >
        <div>
          <CFormLabel>Start Date</CFormLabel>
          <CFormInput
            name="startDate"
            placeholder="Enter Start Date"
            type="date"
            value={filters.startDate}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <CFormLabel>End Date</CFormLabel>
          <CFormInput
            type="date"
            name="endDate"
            placeholder="Enter End Date"
            value={filters.endDate}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <CButton
          style={{
            height: "fit-content",
          }}
          type="submit"
        >
          Apply
        </CButton>
      </CForm>
    </CCard>
  );
}

export default Filter;
