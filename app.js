import express from "express";
import config from "./src/config/config.js";
import initServer from "./src/init/index.js";
import userRouter from "./src/routes/user.router.js";

const app = express();
const { server } = config;

app.use(express.json());

app.use("/api", [userRouter]);

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
