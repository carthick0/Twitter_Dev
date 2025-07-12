import AWS from "aws-sdk";
import dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export const uploadToS3 = async (file: any): Promise<string> => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  const key = `${uuidv4()}-${filename}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: stream,
    ContentType: mimetype,
    ACL: "public-read",
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Location; // URL
};
