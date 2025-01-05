import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    ENV: process.env.APP_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  DB: {
    URL: process.env.DB_URL,
  },
  GASLESS_TRANSFER: {
    CONTRACT_ADDRESS: process.env.GASLESS_TRANSFER_CONTRACT_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    RPC_URL: process.env.RPC_URL,
  },
};
