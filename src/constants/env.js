import dotenv from "dotenv";

dotenv.config();
const env = process.env;
const envFiles = {
  server: {
    PORT: env.PORT || 3000,
    HOST: env.HOST || "localhost",
  },
  database: {
    DB1_NAME: env.DB1_NAME || "DB_NAME",
    DB1_USER: env.DB1_USER || "root",
    DB1_PASSWORD: env.DB1_PASSWORD || "mysql_root_password",
    DB1_HOST: env.DB1_HOST || "API_MYSQL",
    DB1_PORT: env.DB1_PORT || 3306,

    DB2_NAME: env.DB2_NAME || "DB_NAME",
    DB2_USER: env.DB2_USER || "root",
    DB2_PASSWORD: env.DB2_PASSWORD || "mysql_root_password",
    DB2_HOST: env.DB2_HOST || "API_MYSQL",
    DB2_PORT: env.DB2_PORT || 3306,
  },
};

export default envFiles;
