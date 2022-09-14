import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    uri: process.env.DB_URI || "",
    name: process.env.DB_NAME || "",
  },
  server: {
    stage: process.env.NODE_ENV!,
    env: process.env.ENV || "dev",
    host: process.env.stage || "localhost",
    port: process.env.SERVER_PORT || 9090,
  },
};

export default config;
