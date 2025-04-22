import express from "express";
import config from "./config/config.js";
import initServer from "./init/index.js";
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import { specs, swaggerUi } from "./config/swagger.js";

const app = express();
const { server } = config;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", [userRouter, postRouter]);
initServer()
  .then(() => {
    app.listen(server.PORT, server.HOST, () => {
      console.log(`Port: ${server.PORT} Host:${server.HOST}`);
    });
  })
  .catch((err) => {
    console.error(`Server Init Error : ${err}`);
    process.exit(1);
  });
