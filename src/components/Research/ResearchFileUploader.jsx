import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import React, { useState } from "react";
import { toast } from "react-toastify";
import RawFileUploader from "../RawFileUploader";
import { Button, Stack } from "@mui/material";

function ResearchFileUploader({
  pdfUrl,
  setPDFUrl,
  detailsUpload,
  closeDetailsUpload,
}) {
  const [loading, setLoading] = useState(false);

  return (
    <CModal
      size="lg"
      alignment="center"
      visible={detailsUpload}
      onClose={() => {
        closeDetailsUpload();
        setPDFUrl("");
      }}
    >
      <CModalHeader
        onClose={() => {
          closeDetailsUpload();
          setPDFUrl("");
        }}
      >
        <CModalTitle>{"Upload Details File"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <RawFileUploader url={pdfUrl} setUrl={setPDFUrl} accept=".pdf" />
        {pdfUrl && (
          <Stack alignItems="flex-end">
            <Button onClick={() => window?.open(pdfUrl)}>
              Open In new Tab
            </Button>
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="200px"
            />
          </Stack>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            closeDetailsUpload();
            setPDFUrl("");
          }}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ResearchFileUploader;
