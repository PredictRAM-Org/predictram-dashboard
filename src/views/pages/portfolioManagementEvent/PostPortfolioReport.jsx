import React, { useState, useRef } from "react";
import { CForm } from "@coreui/react";
import ReactQuill from "react-quill";
import { CLoadingButton } from "@coreui/react-pro";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import "../../../assets/css/Editor.css";
import ImageCompress from "quill-image-compress";
import ImageUploader from "quill-image-uploader";
import { BlobServiceClient } from "@azure/storage-blob";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { submitPortfolioManagementReport } from "../../../api/services/PortfolioMangementService";

ReactQuill.Quill.register("modules/imageCompress", ImageCompress);
ReactQuill.Quill.register("modules/imageUploader", ImageUploader);

const CONTAINER_NAME = "researchpaper-image";
const SAS_TOKEN =
  "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-09-10T21:29:24Z&st=2022-09-10T13:29:24Z&spr=https&sig=s3kLJQTP6SPOtOv23vgCecHFMiCsOi7NIorN0XctFuA%3D";
const STORAGE_ACCOUNT_NAME = "researchpaper";

PostPortfolioReport.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
  "align",
  "color",
  "background",
];

PostPortfolioReport.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4] }, { font: [] }],
    [{ size: [] }],
    [{ color: [] }],
    [{ background: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { direction: "rtl" },
    ],
    ["link", "image", "code"],
    ["clean"],
  ],

  clipboard: {
    matchVisual: false,
  },
  imageUploader: {
    upload: async (file) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 600,
      };

      const compressedFile = await imageCompression(file, options);

      const blobService = new BlobServiceClient(
        `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`
      );

      const containerClient = blobService.getContainerClient(CONTAINER_NAME);
      const extension = file.name.split(".")[1];
      const filename = `${Math.random()
        .toString(16)
        .substring(2, 8)}.${extension}`;

      const uploadedFile = await containerClient.uploadBlockBlob(
        `/portfolioReport/${filename}`,
        compressedFile,
        1
      );
      if (!!uploadedFile) {
        return uploadedFile.blockBlobClient.url;
      }
    },
  },
};

export default function PostPortfolioReport() {
  const { eventId } = useParams();
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [value, setValue] = useState("");

  const postresearchpapaer = async (reportPayload) => {
    const { statusCode } = await submitPortfolioManagementReport(
      setLoading,
      reportPayload
    );

    if (statusCode === 200) {
      history.push(`/portfolio/management/${eventId}`);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required");
    if (!subtitle) return toast.error("Sub Title is required");

    const text = value.replace(/<[^>]+>/g, "");

    let payload = {
      userId,
      title,
      subtitle,
      text: text,
      data: value,
      event: eventId,
    };
    postresearchpapaer(payload);
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="text-center m-0 mb-3 pb-3">Post Portfolio Report</h1>
      <hr className="m-0" />

      <CForm
        onSubmit={handlesubmit}
        className="d-flex flex-column"
        style={{
          width: "100%",
          maxWidth: "50rem",
          margin: "0 auto",
        }}
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          type="text"
          maxLength={60}
          id="floatingInput"
          placeholder="Title"
          style={{
            fontSize: "2.5rem",
            fontWeight: 600,
            color: "#252525",
            background: "transparent",
            outline: "none",
            marginTop: "1.5625rem",
          }}
          className="border-0 w-100"
        />
        <input
          onChange={(e) => setSubTitle(e.target.value)}
          value={subtitle}
          name="subtitle"
          type="text"
          maxLength={120}
          id="floatingInput"
          placeholder="Subtitle"
          style={{
            fontWeight: 500,
            color: "#AFAFB6",
            background: "transparent",
            fontSize: "1.50rem",
            outline: "none",
            marginBottom: "2.25rem",
          }}
          className="border-0 w-100"
        />
        <div className="app">
          <ReactQuill
            bounds={"app"}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={"Write something..."}
            modules={PostPortfolioReport.modules}
            formats={PostPortfolioReport.formats}
          />
        </div>

        <CLoadingButton
          loading={loading}
          className="px-4"
          variant="outline"
          type="submit"
          color="primary"
          id="inputGroupFileAddon03"
          style={{
            width: "fit-content",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Publish
        </CLoadingButton>
      </CForm>
    </div>
  );
}
