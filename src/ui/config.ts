import dotenv from "dotenv";
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL!,
  login: process.env.LOGIN!,
  password: process.env.PASSWORD!,
};
