import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

class FileService {
  constructor() {
    this.FOLDER_NAME = "researchpaper-image";
    this.BUCKET_NAME = "predictram-main-files";
    this.REGION = "us-east-1";

    this.s3Client = new S3Client({
      region: this.REGION,
      credentials: {
        // accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        // secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        accessKeyId: "AKIAWOOXTYZDEPMEVVEA",
        secretAccessKey: "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",
      },
    });
  }

  async upload(file, onProgress, uploadheader) {
    const extension = file.name?.split(".")[1];
    const filename = `${Math.random()
      ?.toString(16)
      .substring(2, 8)}.${extension}`;

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: `${this.FOLDER_NAME}/${filename}`,
      Body: file,
      ContentType: uploadheader?.blobContentType,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);

      // Generate the URL of the uploaded file
      const fileUrl = `https://${this.BUCKET_NAME}.s3.${this.REGION}.amazonaws.com/${this.FOLDER_NAME}/${filename}`;

      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async delete(Url) {
    const blobName = Url.split("/").pop();
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: blobName,
    };

    try {
      const command = new DeleteObjectCommand(params);
      await this.s3Client.send(command);
      console.log(`File deleted successfully: ${blobName}`);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
}

export default new FileService();
