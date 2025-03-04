// import toast from 'react-hot-toast';
import { BlobServiceClient } from "@azure/storage-blob";

class FileService {
  constructor() {
    this.CONTAINER_NAME = "researchpaper-image";
    this.SAS_TOKEN =
      "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-09-10T21:29:24Z&st=2022-09-10T13:29:24Z&spr=https&sig=s3kLJQTP6SPOtOv23vgCecHFMiCsOi7NIorN0XctFuA%3D";
    this.STORAGE_ACCOUNT_NAME = "researchpaper";

    this.upload_url = `https://${this.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${this.SAS_TOKEN}`;

    this.blobService = new BlobServiceClient(this.upload_url);

    this.containerClient = this.blobService.getContainerClient(
      this.CONTAINER_NAME
    );
  }

  async upload(file, onProgress, uploadheader) {
    const extension = file.name?.split(".")[1];
    const filename = `${Math.random()
      ?.toString(16)
      .substring(2, 8)}.${extension}`;

    const uploadedFile = await this.containerClient.uploadBlockBlob(
      `${filename}`,
      file,
      1,
      {
        onProgress,
        blobHTTPHeaders: { ...uploadheader },
      }
    );
    return uploadedFile?.blockBlobClient?.url;
  }

  async delete(Url) {
    const blobName = Url.split("/").pop().split("?")[0];
    console.log(blobName);
    const blobClient = this.containerClient.getBlockBlobClient(blobName);
    await blobClient.deleteIfExists({ deleteSnapshots: "include" });
  }
}

export default new FileService();
