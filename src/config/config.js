import envFiles from "../constants/env.js";

const env = envFiles.server;

const config = {
  server: {
    PORT: env.PORT,
  },
};

export default config;
