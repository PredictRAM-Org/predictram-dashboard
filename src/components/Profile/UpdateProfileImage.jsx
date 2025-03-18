import { cibGmail, cilVoicemail } from "@coreui/icons-pro";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCardBody,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useRef, useState } from "react";
import {
  saveProfile,
  uploadProilePicture,
} from "../../api/services/ProfileService";
import { useHistory } from "react-router-dom";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const customStyles = {
  backgroundPic: {
    objectFit: "contain",
    borderBottom: "1px solid",
  },
  profileImg: {
    objectFit: "cover",
    border: "1px solid",
    borderRadius: "50%",
    backgroundColor: "#808080",
  },
};

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

function UpdateProfileImage({
  show,
  setShow,
  image,
  name,
  imgSrc,
  setImgSrc,
  updateProfile,
}) {
  const hiddenFileInput = useRef(null);
  const history = useHistory();

  const uploadFileToBlop = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set the image source to a local URL for preview
    setImgSrc(URL.createObjectURL(file));

    try {
      // Generate a unique filename
      const extension = file.name.split(".")[1];
      const filename = `${Math.random()
        .toString(16)
        .substring(2, 8)}.${extension}`;

      // Upload the file to S3
      const params = {
        Bucket: BUCKET_NAME,
        Key: `${FOLDER_NAME}/${filename}`,
        Body: file,
        ContentType: file.type, // Preserve the original file type
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Generate the URL of the uploaded file
      const fileUrl = `https://${BUCKET_NAME}.s3.us-east-1.amazonaws.com/${FOLDER_NAME}/${filename}`;

      // Update the image source with the S3 URL
      setImgSrc(fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <CModal visible={show} onClose={() => setShow(false)}>
      <CModalHeader onClose={() => setShow(false)}>
        <CModalTitle>Change Profile Picture</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-flex justify-content-center align-items-center flex-column gap-3">
        <img
          width="160"
          height="160"
          alt="..."
          src={
            imgSrc ||
            image ||
            `https://ui-avatars.com/api/?name=${name?.replaceAll(" ", "+")}`
          }
          style={customStyles.profileImg}
        />
        <CFormInput
          name="image"
          ref={hiddenFileInput}
          type="file"
          style={{ display: "none" }}
          accept="image/png,image/jpeg"
          id="inputGroupFile01"
          onChange={(e) => {
            uploadFileToBlop(e);
          }}
        />

        <CButton onClick={imgSrc ? updateProfile : handleClick}>
          {imgSrc ? "Update Picture" : "Choose Profile Image"}
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default UpdateProfileImage;
