import { BlobServiceClient } from "@azure/storage-blob";
import { CButton, CFormInput } from "@coreui/react";
import React from "react";
import ImageContainer from "./ImageContainer";

const SAS_TOKEN =
  "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-09-10T21:29:24Z&st=2022-09-10T13:29:24Z&spr=https&sig=s3kLJQTP6SPOtOv23vgCecHFMiCsOi7NIorN0XctFuA%3D";
const STORAGE_ACCOUNT_NAME = "researchpaper";

function UploadImage({
  imgSrc,
  setImgSrc,
  containerName,
  refSrc,
  autoSave = false,
  localImageId = "paper-cover-img",
}) {
  const CONTAINER_NAME = `${containerName}`;
  console.log(autoSave);
  const uploadFileToBlop = async (e) => {
    console.log("file", e.target.files);
    setImgSrc(URL.createObjectURL(e.target.files[0]));

    if (!e.target.files[0]) return [];

    const blobService = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`,
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(CONTAINER_NAME);

    const uploadedFile = await containerClient.uploadBlockBlob(
      `${e.target.files[0].name}`,
      e.target.files[0],
      1,
    );
    if (!!uploadedFile) {
      setImgSrc(uploadedFile.blockBlobClient.url);
      if (autoSave) {
        localStorage.setItem(localImageId, uploadedFile.blockBlobClient.url);
      }
    }
  };
  const handleClick = (event) => {
    refSrc.current.click();
  };

  return (
    <>
      {!imgSrc && (
        <CButton
          size="sm"
          className="secondaryButton"
          style={{
            marginTop: "2.5rem",
            width: "fit-content",
          }}
          onClick={handleClick}
        >
          {"Add Cover Image"}
        </CButton>
      )}
      {imgSrc && (
        <ImageContainer
          imgSrc={imgSrc}
          refSrc={refSrc}
          setImgSrc={setImgSrc}
          autoSave={autoSave}
          localImageId={localImageId}
        />
      )}

      <CFormInput
        name="image"
        ref={refSrc}
        type="file"
        style={{ display: "none" }}
        accept="image/png,image/jpeg"
        id="inputGroupFile01"
        onChange={(e) => {
          uploadFileToBlop(e);
        }}
      />
    </>
  );
}

export default UploadImage;
