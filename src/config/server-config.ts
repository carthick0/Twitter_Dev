import dotenv from "dotenv"

dotenv.config();

export const MONGO_URL: string | undefined = process.env.MONGO_URL;

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;