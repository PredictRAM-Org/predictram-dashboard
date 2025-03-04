import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CLoadingButton, CSmartTable } from "@coreui/react-pro";
import RawFileUploader from "../RawFileUploader";
import { updateEvent } from "../../api/services/EventService";
import { convertXlsxURLToJson } from "../FileUploader/xlsxTOJson";
import FileUploader from "../FileUploader/FileUploader";

const tableConfig = [
  { key: "name", label: "Name" },
  { key: "regno", label: "Registration Number" },
];

function EventRiaFileUploader({
  id,
  getevent,
  name,
  riaFileUpload,
  closeRiaFileUploader,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handelRiaUpload = async (e) => {
    try {
      setLoading(true);
      await updateEvent(setLoading, id, { ria: data });
      getevent(id);
      handelClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handelClose = () => {
    setData([]);
    closeRiaFileUploader();
  };

  return (
    <CModal
      size="lg"
      alignment="center"
      visible={riaFileUpload}
      onClose={handelClose}
    >
      <CModalHeader onClose={handelClose}>
        <CModalTitle>{name ?? "Upload RIA/RAA details file"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <FileUploader setData={(d) => setData(d)} />

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {data.length > 0 && (
            <CSmartTable
              columns={tableConfig}
              items={data}
              columnFilter
              columnSorter
              pagination
              tableProps={{
                hover: true,
              }}
            />
          )}
        </div>
      </CModalBody>
      <CModalFooter>
        <CLoadingButton
          color="primary"
          disabled={loading && data.length === 0}
          loading={loading}
          onClick={handelRiaUpload}
        >
          Upload
        </CLoadingButton>{" "}
        <CButton color="secondary" onClick={handelClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default EventRiaFileUploader;
