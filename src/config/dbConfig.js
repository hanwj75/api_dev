import envFiles from "../constants/env.js";

const env = envFiles.database;

const dbConfig = {
  database: {
    USER_DB: {
      host: env.DB1_HOST,
      port: env.DB1_PORT,
      user: env.DB1_USER,
      password: env.DB1_PASSWORD,
      name: env.DB1_NAME,
    },
    POST_DB: {
      host: env.DB2_HOST,
      port: env.DB2_PORT,
      user: env.DB2_USER,
      password: env.DB2_PASSWORD,
      name: env.DB2_NAME,
    },
  },
};

export default dbConfig;
