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
import { updateEvent } from "../../api/services/EventService";
import RawFileUploader from "../RawFileUploader";
import { Button, Stack } from "@mui/material";

function EventFileUploader({
  id,
  getevent,
  name,
  detailsUpload,
  closeDetailsUpload,
}) {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPDFUrl] = useState("");

  const handelEventFileUpload = async (e) => {
    e.preventDefault();
    try {
      if (!pdfUrl) return toast.error("No File Selected for Upload!!");
      setLoading(true);

      await updateEvent(setLoading, id, { file: pdfUrl });

      getevent(id);
      closeDetailsUpload();
      setPDFUrl("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <CModalTitle>{name ?? "Upload Details File"}</CModalTitle>
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
          color="primary"
          disabled={loading}
          onClick={handelEventFileUpload}
        >
          Upload
        </CButton>{" "}
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

export default EventFileUploader;
