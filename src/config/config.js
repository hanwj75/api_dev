import envFiles from "../constants/env.js";

const env = envFiles.server;

const config = {
  server: {
    PORT: env.PORT,
    HOST: env.HOST,
    JWT: env.JWT_KEY,
  },
};

export default config;
