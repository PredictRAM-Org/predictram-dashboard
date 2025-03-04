import { BlobServiceClient } from "@azure/storage-blob";
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

const SAS_TOKEN =
  "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-09-10T21:29:24Z&st=2022-09-10T13:29:24Z&spr=https&sig=s3kLJQTP6SPOtOv23vgCecHFMiCsOi7NIorN0XctFuA%3D";
const STORAGE_ACCOUNT_NAME = "researchpaper";
const CONTAINER_NAME = "researchpaper-image";

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
    console.log("file", e.target.files);
    setImgSrc(URL.createObjectURL(e.target.files[0]));

    if (!e.target.files[0]) return [];

    const blobService = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(CONTAINER_NAME);

    const uploadedFile = await containerClient.uploadBlockBlob(
      `${e.target.files[0].name}`,
      e.target.files[0],
      1
    );
    if (!!uploadedFile) {
      setImgSrc(uploadedFile.blockBlobClient.url);
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
