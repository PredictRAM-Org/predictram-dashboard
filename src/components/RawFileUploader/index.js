import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import FileIcon from "../../assets/images/file_icon.png";
import FileService from "../../api/services/FileService";
import { toast } from "react-toastify";
import { updateEvent } from "../../api/services/EventService";

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** i).toFixed(2))} ${units[i]}`;
}

function RawFileUploader({
  setUrl,
  url,
  accept = ".pdf",
  uploadHeader = { blobContentType: "application/pdf" },
}) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFilesize] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    handelCancelFile(e);

    const totalSize = file.size;

    try {
      setLoading(true);

      setFileName(file?.name);
      setFilesize(formatFileSize(file?.size));
      const uploadedImageUrl = await FileService.upload(
        file,
        (progress) => {
          const loadSize = progress?.loadedBytes;
          const percent = Number((loadSize / totalSize) * 100).toFixed(1);
          setUploadPercent(percent);
        },
        uploadHeader
      );

      setUrl(uploadedImageUrl);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setUploadPercent(0);
    }
  };

  const handelCancelFile = async (e) => {
    e.preventDefault();
    if (url) {
      try {
        await FileService.delete(url);
        setUrl("");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 2 },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ebf4f2",
          border: 1,
          borderRadius: 3,
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          cursor: url ? "default" : "pointer",
        }}
        htmlFor={url ? "" : "file-upload"}
        component={FormLabel}
      >
        <input
          onClick={(e) => {
            e.target.value = "";
          }}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          id="file-upload"
          onChange={onSelect}
        />

        {url || loading ? (
          <Box
            bgcolor="white"
            p={2}
            borderRadius={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress variant="determinate" value={uploadPercent} />
                <Typography>{uploadPercent}% Uploaded</Typography>
              </Box>
            ) : (
              <>
                <IconButton
                  onClick={handelCancelFile}
                  sx={{
                    color: "red",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                >
                  <CancelIcon />
                </IconButton>
                <img alt={fileName} src={FileIcon} height={50} />
                <Typography>{`${fileName} (${fileSize})`}</Typography>
              </>
            )}
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>Click to select file</Typography>
            <Typography variant="p">({accept} file)</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RawFileUploader;
