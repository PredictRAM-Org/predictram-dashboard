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

const tableConfig = [{ key: "Stock Symbol", label: "Stock Symbol" }];

function EventStockUploader({
  id,
  getevent,
  name,
  stockUpload,
  closeStockUpload,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [xlsxUrl, setXLSXUrl] = useState("");

  const handelStockUpload = async (e) => {
    try {
      setLoading(true);
      await updateEvent(setLoading, id, { stockFile: xlsxUrl });
      getevent(id);
      handelClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handelClose = () => {
    setXLSXUrl("");
    setData([]);
    closeStockUpload();
  };

  const convertXlsxToJson = async (url) => {
    const json = await convertXlsxURLToJson(url);
    setData(json);
  };

  useEffect(() => {
    if (xlsxUrl) {
      convertXlsxToJson(xlsxUrl);
    } else {
      setData([]);
    }
  }, [xlsxUrl]);

  return (
    <CModal
      size="lg"
      alignment="center"
      visible={stockUpload}
      onClose={handelClose}
    >
      <CModalHeader onClose={handelClose}>
        <CModalTitle>{name ?? "Upload Details File"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <RawFileUploader
          accept=".xlsx"
          url={xlsxUrl}
          setUrl={setXLSXUrl}
          uploadHeader={{
            blobContentType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }}
        />

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
          disabled={loading}
          loading={loading}
          onClick={handelStockUpload}
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

export default EventStockUploader;
