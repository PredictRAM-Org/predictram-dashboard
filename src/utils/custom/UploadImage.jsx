import { BlobServiceClient } from "@azure/storage-blob";
import { CButton, CFormInput } from "@coreui/react";
import React from "react";
import ImageContainer from "./ImageContainer";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAWOOXTYZDEPMEVVEA",
    secretAccessKey: "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",
  },
});

const BUCKET_NAME = "predictram-main-files";

function UploadImage({
  imgSrc,
  setImgSrc,
  containerName,
  refSrc,
  autoSave = false,
  localImageId = "paper-cover-img",
}) {
  const FOLDER_NAME = `${containerName}`;

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

      // Save the URL to localStorage if autoSave is enabled
      if (autoSave) {
        localStorage.setItem(localImageId, fileUrl);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
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
