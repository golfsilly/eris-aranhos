import { io } from "socket.io-client";

export const socket = io("http://localhost:3201", {
  transports: ["websocket"],
});