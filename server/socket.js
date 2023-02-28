module.exports = {
  io: null,
  init: (httpServer) => {
    this.io = require("socket.io")(httpServer);
    return this.io;
  },
  getIO: () => {
    if (!this.io) {
      throw new Error("Socket.io is not initialized!");
    }
    return this.io;
  },
};
