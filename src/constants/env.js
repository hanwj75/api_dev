import dotenv from "dotenv";

dotenv.config();
const env = process.env;
const envFiles = {
  server: {
    PORT: env.PORT || 3000,
    HOST: env.HOST || "localhost",
  },
};

export default envFiles;
