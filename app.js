import express from "express";
import config from "./src/config/config.js";

const app = express();
const server = config.server;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("main");
});

app.get("/api", (req, res) => {
  res.send("api test");
});

app.listen(server.PORT, () => {
  console.log(server.PORT, "포트로 서버 열림");
});
