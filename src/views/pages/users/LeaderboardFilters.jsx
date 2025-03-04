import { CCard, CCardBody } from "@coreui/react";
import {
  CButton,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react-pro";
import React, { useEffect, useState } from "react";

function LeaderboardFilters({ params, setParams, state }) {
  const [filters, setFilters] = useState({});

  const handleChange = (event) => {
    let prevData = { ...filters };
    prevData[event.target.name] = event.target.value;
    setFilters(prevData);
  };

  useEffect(() => {
    setFilters(params);
  }, [params]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const _params = {};

    if (!!filters["name"]) {
      _params["name"] = filters["name"];
    }

    if (!!filters["fromDate"]) {
      _params["fromDate"] = new Date(filters["fromDate"]);
    }

    if (!!filters["toDate"]) {
      _params["toDate"] = new Date(filters["toDate"]);
    }

    setParams(_params);
  };

  return (
    <CCard>
      <CCardHeader style={{ background: "#D6D2F8" }}>
        <CCardTitle>Filters</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm
          onSubmit={handleSubmit}
          className="d-flex flex-col align-items-end flex-wrap justify-content-center"
          style={{
            gap: "0.9375rem",
            height: "fit-content",
            marginBottom: "2em",
          }}
        >
          {state === 3 && (
            <div style={{ width: "100%" }}>
              <div style={{ marginBottom: "1em" }}>
                <CFormLabel>Start Date</CFormLabel>
                <CFormInput
                  name="fromDate"
                  placeholder="Enter Start Date"
                  type="date"
                  value={filters.fromDate}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div>
                <CFormLabel>End Date</CFormLabel>
                <CFormInput
                  type="date"
                  name="toDate"
                  placeholder="Enter End Date"
                  value={filters.toDate}
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </div>
          )}
          <div>
            <CFormLabel>Name</CFormLabel>
            <CFormInput
              name="name"
              placeholder="Enter Name"
              value={filters.name}
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div>
            <CButton
              style={{
                height: "fit-content",
              }}
              type="submit"
            >
              Apply
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
}

export default LeaderboardFilters;
