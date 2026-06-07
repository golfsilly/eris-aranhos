import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("video-setting", (data) => {
    console.log("Receive video-setting:", data);
    io.emit("video-setting", data);
  });

  socket.on("youtube-setting", (data) => {
    console.log("Receive youtube-setting:", data);
    io.emit("youtube-setting", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(3201, () => {
  console.log("Socket running on :3201");
});