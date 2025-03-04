import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
import Select from "react-select";
import React, { useState } from "react";
import { company } from "../../../../data";
import { createIncomeStatementEvent } from "../../../../api/services/IncomeStatementService";
import Loader from "../Loader";

function CreateIncomeStatementEvent() {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    await createIncomeStatementEvent(setLoading, payload);
    setPayload({});
  };
  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Create Income Statement Event</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handlesubmit} className="row g-3">
          <CCol xs={12}>
            <CFormLabel htmlFor="inputEventname">Event Name</CFormLabel>
            <CFormInput
              required
              id="inputEventname"
              name="name"
              value={payload.name}
              placeholder="Enter Event Name"
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputStockSymbol">Stock Symbol</CFormLabel>
            <Select
              required
              id="inputStockSymbol"
              name="stockSymbol"
              value={{ value: payload.stockSymbol, label: payload.stockSymbol }}
              options={company.map((stock) => {
                return { value: stock, label: stock };
              })}
              onChange={(e) => setPayload({ ...payload, stockSymbol: e.value })}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </CCol>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">
              Event Details
            </CFormLabel>
            <CFormTextarea
              required
              name="details"
              id="exampleFormControlTextarea1"
              rows="3"
              value={payload.details}
              onChange={handleChange}
            ></CFormTextarea>
          </div>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputStateDate">Start Date</CFormLabel>
            <CFormInput
              required
              id="inputStateDate"
              name="startDate"
              placeholder="Enter Start Date"
              type="date"
              value={payload.startDate}
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol xs={6}>
            <CFormLabel htmlFor="inputEndDate">End Date</CFormLabel>
            <CFormInput
              required
              id="inputEndDate"
              name="endDate"
              placeholder="Enter End Date"
              type="date"
              value={payload.endDate}
              onChange={handleChange}
            />{" "}
          </CCol>
          <CCol xs={12}>
            {loading ? (
              <Loader />
            ) : (
              <CButton type="submit">Create Event</CButton>
            )}
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
}

export default CreateIncomeStatementEvent;
