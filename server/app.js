const express = require("express");
const app = express();
const socketConnection = require("./socket");
const setSockets = require("./helpers/socketHandlers");
const chartRoutes = require("./routes/charts");
const port = 8080;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(chartRoutes);

const server = app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});

const io = socketConnection.init(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});
io.on("connection", setSockets);
