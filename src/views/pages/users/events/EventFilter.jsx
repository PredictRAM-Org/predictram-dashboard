import {
  CButton,
  CCard,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
} from "@coreui/react";
import React, { useState } from "react";

function EventFilter({
  setParams,
  setCurrentPage,
  isSubmitted,
  setIsSubmitted,
}) {
  const [filters, setFilters] = useState({});

  const handleChange = (event) => {
    let prevData = { ...filters };
    prevData[event.target.name] = event.target.value;
    setFilters(prevData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setParams({
      startdate: new Date(filters["startDate"]),
      enddate: new Date(filters["endDate"]),
    });
  };

  return (
    // TODO: Make a filter card holder
    <CCard
      className="shadow-none border border-light d-flex flex-row justify-content-between flex-wrap"
      style={{
        borderRadius: "0.625rem",
        padding: "1.25rem",
        gap: "1rem",
      }}
    >
      <div
        className="d-flex flex-column align-items-start"
        style={{
          gap: "0.75rem",
        }}
      >
        <h2>Filters</h2>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "fit-content",
            gap: "0.5rem",
          }}
        >
          All
          <CFormSwitch
            shape="pill"
            size="lg"
            style={{
              width: "2rem",
              cursor: "pointer",
            }}
            checked={isSubmitted}
            onChange={(e) => {
              setIsSubmitted(e.target.checked);
              setCurrentPage(0);
            }}
          />
          Submitted
        </div>
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
            value={filters.startdate}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <CFormLabel>End Date</CFormLabel>
          <CFormInput
            type="date"
            name="endDate"
            placeholder="Enter End Date"
            value={filters.enddate}
            onChange={(event) => handleChange(event)}
          />
        </div>
        {filters.startDate && filters.endDate ? (
          <CButton
            style={{
              height: "fit-content",
            }}
            type="submit"
          >
            Apply
          </CButton>
        ) : (
          <CButton
            style={{
              height: "fit-content",
            }}
            type="submit"
            disabled
          >
            Apply
          </CButton>
        )}
      </CForm>
    </CCard>
  );
}

export default EventFilter;
