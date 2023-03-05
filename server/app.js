const express = require("express");
const app = express();
const socketConnection = require("./socket");
const setSockets = require("./helpers/socketHandlers");
const port = 8080;
const server = app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});

const io = socketConnection.init(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});
io.on("connection", setSockets);
