import React, { useState, useRef, useEffect } from "react";
import { CForm, CCol, CRow, CButton } from "@coreui/react";
import ReactQuill from "react-quill";
import { CFormLabel, CLoadingButton } from "@coreui/react-pro";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import UploadImage from "../../../../utils/custom/UploadImage";
import "../../../../assets/css/Editor.css";
import Select from "react-select";
import TagsList from "../../../../config/TagsList";
import CurrentEventSelect from "../../../inputs/SelectInputs/SelectWrapper/CurrentEventSelect";
import ImageCompress from "quill-image-compress";
import ImageUploader from "quill-image-uploader";
import imageCompression from "browser-image-compression";
import { apiPost } from "../../../../api/BaseAPICaller";
import Swal from "sweetalert2";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Hyperlink from "editorjs-hyperlink";
import ColorPlugin from "editorjs-text-color-plugin";
import Header from "editorjs-header-with-alignment";
import Paragraph from "editorjs-paragraph-with-alignment";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import edjsHTML from "editorjs-html";
import { useSelector } from "react-redux";
import axios from "axios";
import ResearchFileUploader from "../../../../components/Research/ResearchFileUploader";
import { Button, Container, Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    // accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    // secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    accessKeyId: "AKIAWOOXTYZDEPMEVVEA",
    secretAccessKey: "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",
  },
});

const BUCKET_NAME = "predictram-main-files";

const FOLDER_NAME = "researchpaper-image";
function tableParser(block) {
  const rows = block.data.content;

  let tableHTML = '<table style="border-collapse: collapse; width: 100%;">';
  rows.forEach((row) => {
    tableHTML += "<tr>";
    row.forEach((cell) => {
      tableHTML += `<td style="border: 1px solid black; padding: 8px;">${cell}</td>`;
    });
    tableHTML += "</tr>";
  });
  tableHTML += "</table>";

  return tableHTML;
}

const edjsParser = edjsHTML({ table: tableParser });

ReactQuill.Quill.register("modules/imageCompress", ImageCompress);
ReactQuill.Quill.register("modules/imageUploader", ImageUploader);

PostResearch.formats = [
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

PostResearch.modules = {
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
      try {
        // Compress the image
        const options = {
          maxSizeMB: 1, // Maximum size in MB
          maxWidthOrHeight: 600, // Maximum width or height
        };
        const compressedFile = await imageCompression(file, options);

        // Generate a unique filename
        const extension = file.name?.split(".")[1];
        const filename = `${Math.random()
          ?.toString(16)
          .substring(2, 8)}.${extension}`;

        // Upload the compressed file to S3
        const params = {
          Bucket: BUCKET_NAME,
          Key: `${FOLDER_NAME}/${filename}`,
          Body: compressedFile,
          ContentType: file.type, // Preserve the original file type
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Generate the URL of the uploaded file
        const fileUrl = `https://${BUCKET_NAME}.s3.us-east-1.amazonaws.com/${FOLDER_NAME}/${filename}`;

        return fileUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    },
  },
};

export default function PostResearch() {
  const history = useHistory();
  const quillRef = useRef();
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventId = params.get("event");
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pdfUrl, setPDFUrl] = useState(null);
  const fetchEvent = async () => {
    try {
      const { data } = await axios.post(
        "/api/users/getevent",
        { id: eventId },
        { withCredentials: true }
      );
      if (Array.isArray(data) && data.length === 1) {
        const event = data[0];
        setEventOptions([{ label: event.name, value: event._id }]);
        setSelectedEvent({ label: event.name, value: event._id });
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, []);

  const [value, setValue] = useState("");
  const [image, setImage] = useState(localStorage.getItem("paper-cover-img"));
  const [title, setTitle] = useState(localStorage.getItem("title"));
  const [subtitle, setSubTitle] = useState(localStorage.getItem("subtitle"));
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tags")));
  const [event, setEvent] = useState(JSON.parse(localStorage.getItem("event")));

  const [newEditor, setNewEditor] = useState(null);
  const [modalState, setModalState] = useState(null);

  const isBetaUser = true; //useSelector((state) => state.user.isBetaUser);

  const config = {
    holder: "editorjs",
    placeholder: "Press tab to open options",
    tools: {
      header: { class: Header, inlineToolbar: true },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      table: {
        class: Table,
        inlineToolbar: true,
      },
      code: CodeTool,
      embed: Embed,
      hyperlink: {
        class: Hyperlink,
        config: {
          shortcut: "CMD+L",
          target: "_blank",
          rel: "nofollow",
          availableTargets: ["_blank", "_self"],
          availableRels: ["author", "noreferrer"],
          validate: false,
        },
      },
      quote: Quote,
      image: {
        class: ImageTool,
        config: {
          uploader: {
            async uploadByFile(file) {
              try {
                // Compress the image
                const options = {
                  maxSizeMB: 1, // Maximum size in MB
                  maxWidthOrHeight: 600, // Maximum width or height
                };
                const compressedFile = await imageCompression(file, options);

                // Generate a unique filename
                const extension = file.name?.split(".")[1];
                const filename = `${Math.random()
                  ?.toString(16)
                  .substring(2, 8)}.${extension}`;

                // Upload the compressed file to S3
                const params = {
                  Bucket: BUCKET_NAME,
                  Key: `${FOLDER_NAME}/${filename}`,
                  Body: compressedFile,
                  ContentType: file.type, // Preserve the original file type
                };

                const command = new PutObjectCommand(params);
                await s3Client.send(command);

                // Generate the URL of the uploaded file
                const fileUrl = `https://${BUCKET_NAME}.s3.us-east-1.amazonaws.com/${FOLDER_NAME}/${filename}`;

                return {
                  success: 1,
                  file: {
                    url: fileUrl,
                    // You can add additional metadata here if needed
                  },
                };
              } catch (error) {
                console.error("Error uploading image:", error);
                return {
                  success: 0,
                  file: {
                    url: null,
                  },
                };
              }
            },
            async uploadByUrl(url) {
              try {
                // Fetch the image from the URL
                const response = await fetch(url);
                const blob = await response.blob();

                // Upload the fetched image using the uploadByFile method
                const result = await this.uploadByFile(blob);
                return result;
              } catch (error) {
                console.error("Error uploading image by URL:", error);
                return {
                  success: 0,
                  file: {
                    url: null,
                  },
                };
              }
            },
          },
        },
      },
    },
    onReady: () => {
      console.log("Editor.js is ready to work");
    },
    data: JSON.parse(localStorage.getItem("paper-draft")),
  };

  async function postresearchpapaer(info) {
    try {
      const data = await apiPost(
        setLoading,
        "/api/users/postresearchpaper",
        info,
        {
          withCredentials: true,
        }
      );

      if (Object.keys(data).length !== 0) {
        removeItems([
          "paper-draft",
          "title",
          "subtitle",
          "paper-cover-img",
          "tags",
          "event",
        ]);
        toast.success("Paper published successfully.");
        const destination = eventId ? `/eventdetails/${eventId}` : "/papers";
        history.push(destination);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Failed");
      }
      setLoading(false);
    }
  }

  const removeItems = (localStorageItems) => {
    localStorageItems.map((item) => {
      localStorage.removeItem(item);
    });
  };

  function handlesubmit(e) {
    e.preventDefault();
    if (!image) return toast.error("Cover Image is required");
    if (!title) return toast.error("Title is required");
    if (!subtitle) return toast.error("Sub Title is required");
    if (tags.length === 0) return toast.error("Choose a tag");
    if (!event && !eventId) return toast.error("Choose a event");

    if (isBetaUser) {
      newEditor
        .save()
        .then((outputData) => {
          const htmlarr = edjsParser.parse(outputData);
          const html = htmlarr.join(" ");
          const text = html.replace(/<[^>]+>/g, "");
          const tagarray = tags.map((tag) => tag.value);
          let payload = {
            image,
            title,
            subtitle,
            event: eventId ? eventId : event.value,
            data: html,
            text: text,
            tags: tagarray,
            report: pdfUrl,
          };

          postresearchpapaer(payload);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
          toast.error(error.message);
        });
    } else {
      const text = value.replace(/<[^>]+>/g, "");
      const tagarray = tags.map((tag) => tag.value);
      let payload = {
        image,
        title,
        subtitle,
        event: eventId ? eventId : event.value,
        data: value,
        text: text,
        tags: tagarray,
      };
      postresearchpapaer(payload);
    }
  }

  // Getting the entire pasted content and finding the img elements in it
  // Uploading them in azure and replacing the src of the original with the azure link
  // Updating the orignal html

  const handlePaste = async (html) => {
    const tempEl = document.createElement("div");
    tempEl.innerHTML = html;

    const images = tempEl.querySelectorAll("img");

    let progress = 0;

    Swal.fire({
      title: "Pasting in progress",
      html: `<progress max="${images.length}" value="${progress}"></progress>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });

    const promises = Array.from(images).map(async (img) => {
      const data = img.getAttribute("src");
      const blob = await (await fetch(data)).blob();
      const url = await PostResearch.modules.imageUploader.upload(blob);
      img.setAttribute("src", url);

      progress++;
      Swal.getHtmlContainer().querySelector("progress").value = progress;
    });

    await Promise.all(promises);

    Swal.close();

    const updatedHtml = tempEl.innerHTML;

    quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(updatedHtml);
    toast.success("Report pasted successfully");
  };

  useEffect(() => {
    if (isBetaUser) {
      const editor = new EditorJS(config);
      setNewEditor(editor);
      const editordiv = document.getElementById("editorjs");
      if (editordiv) {
        editordiv.addEventListener("input", (e) => {
          e.preventDefault();
          editor.save().then((outputData) => {
            localStorage.setItem("paper-draft", JSON.stringify(outputData));
          });
        });
        editordiv.addEventListener("click", (e) => {
          e.preventDefault();
          editor.save().then((outputData) => {
            localStorage.setItem("paper-draft", JSON.stringify(outputData));
          });
        });
      }
    } else {
      removeItems([
        "paper-draft",
        "title",
        "subtitle",
        "paper-cover-img",
        "tags",
        "event",
      ]);
      const editorEl = document.querySelector(".ql-editor");

      if (editorEl) {
        editorEl.addEventListener("paste", (e) => {
          e.preventDefault();

          const html = e.clipboardData.getData("text/html");

          handlePaste(html);
        });
      }
    }
  }, [isBetaUser]);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="text-center m-0 mb-3 pb-3">Post Research Paper</h1>
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
        <UploadImage
          imgSrc={image}
          autoSave={isBetaUser ? true : false}
          setImgSrc={setImage}
          containerName="researchpaper-image"
          refSrc={hiddenFileInput}
        />

        <input
          onChange={(e) => {
            setTitle(e.target.value);
            isBetaUser && localStorage.setItem("title", e.target.value);
          }}
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
          onChange={(e) => {
            setSubTitle(e.target.value);
            isBetaUser && localStorage.setItem("subtitle", e.target.value);
          }}
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
        {!isBetaUser && (
          <div className="app">
            <ReactQuill
              ref={quillRef}
              className="ql-editor"
              bounds={"app"}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Write something..."}
              modules={PostResearch.modules}
              formats={PostResearch.formats}
            />
          </div>
        )}
        {isBetaUser && <div id="editorjs"></div>}
        <CRow>
          <CCol>
            <CFormLabel className="mt-2">Choose Tag</CFormLabel>
            <Select
              isMulti
              name="Tags"
              options={TagsList}
              value={tags}
              onChange={(e) => {
                setTags(e);
                isBetaUser && localStorage.setItem("tags", JSON.stringify(e));
              }}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </CCol>
          {!eventId ? (
            <CCol>
              <CurrentEventSelect
                value={event}
                setValue={(e) => {
                  setEvent(e);
                  isBetaUser &&
                    localStorage.setItem("event", JSON.stringify(e));
                }}
              />
            </CCol>
          ) : (
            <CCol>
              <CFormLabel className="mt-2">Choose Event</CFormLabel>
              <Select
                isDisabled={true}
                options={eventOptions}
                value={selectedEvent}
                onChange={setSelectedEvent}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </CCol>
          )}
        </CRow>

        <div style={{ marginTop: "10px" }}>
          {pdfUrl ? (
            <>
              <Button
                style={{ textTransform: "none" }}
                color="primary"
                variant="outlined"
                startIcon={<ArrowOutwardIcon />}
                onClick={() => window?.open(pdfUrl)}
              >
                Open Upload Research PDF
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => setPDFUrl(null)}
                color="error"
                startIcon={<ClearIcon />}
              >
                Remove
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<UploadFileIcon />}
                color="primary"
                style={{ textTransform: "none" }}
                variant="outlined"
                onClick={() => openModal()}
              >
                {"Upload Research File"}
              </Button>

              <ResearchFileUploader
                pdfUrl={pdfUrl}
                setPDFUrl={setPDFUrl}
                closeDetailsUpload={closeModal}
                detailsUpload={modalState}
              />
            </>
          )}
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
