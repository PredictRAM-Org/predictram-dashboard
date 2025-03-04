import {
  CButton,
  CForm,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { CLoadingButton } from "@coreui/react-pro";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import handleExportPdf from "./EventReportPdf";
import handleExportDocx from "./EventReportDoc";

function GenerateReportModal({ data, setData, reportModal, setReportModal }) {
  const handelChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handelClose = () => {
    setReportModal(false);
  };

  const generateReport = (e) => {
    e.preventDefault();
    handleExportPdf(data, `${data?.mainTopic}_${Date.now()}.pdf`);
    handleExportDocx(data, `${data?.mainTopic}_${Date.now()}.docx`);
  };

  return (
    <CModal
      size="lg"
      backdrop="static"
      alignment="center"
      visible={reportModal}
      onClose={handelClose}
    >
      <CForm onSubmit={generateReport}>
        <CModalHeader onClose={handelClose}>
          <CModalTitle>Report Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <CFormLabel htmlFor="execSummary">Executive Summary</CFormLabel>
          <CFormTextarea
            required
            placeholder="Enter Executive Summary"
            onChange={handelChange}
            name="execSummary"
            value={data?.execSummary}
          />
          <CFormLabel htmlFor="keyFindings" className="mt-1">
            Key Findings
          </CFormLabel>
          <CFormTextarea
            required
            placeholder="Enter Key Findings..."
            onChange={handelChange}
            name="keyFindings"
            value={data?.keyFindings}
          />
          <CFormLabel htmlFor="risks" className="mt-1">
            Risks and Uncertainties
          </CFormLabel>
          <CFormTextarea
            required
            placeholder="Enter Risks and Uncertainties..."
            onChange={handelChange}
            name="risks"
            value={data?.risks}
          />
          <CFormLabel htmlFor="relatedIndustries" className="mt-1">
            Related Industries
          </CFormLabel>
          <CFormTextarea
            required
            placeholder="Enter Related Industries..."
            onChange={handelChange}
            name="relatedIndustries"
            value={data?.relatedIndustries}
          />

          <CFormLabel htmlFor="globalScenarios" className="mt-1">
            Global Scenarios
          </CFormLabel>
          <CFormTextarea
            required
            placeholder="Enter Global Scenarios..."
            onChange={handelChange}
            name="globalScenarios"
            value={data?.globalScenarios}
          /> */}
          <CFormLabel htmlFor="conclusion" className="mt-1">
            Conclusion
          </CFormLabel>
          <CFormTextarea
            required
            rows={5}
            placeholder="Enter Conclusion..."
            onChange={handelChange}
            name="conclusion"
            value={data?.conclusion}
          />
        </CModalBody>
        <CModalFooter>
          <CLoadingButton color="primary" type="submit">
            Download
          </CLoadingButton>{" "}
          <CButton color="secondary" onClick={handelClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}

export default GenerateReportModal;
