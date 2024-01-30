import { Server } from "socket.io";
import express from "express";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket Io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./Web Socket/public")));

app.get("/", (req, res) => {
  res.sendFile("./Web Socket/public/index.html");
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
