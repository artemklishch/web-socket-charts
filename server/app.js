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



// TODO: these are web-socket settings for client 
// import { useEffect, useState } from "react";
// import "./App.css";
// const { io } = require("socket.io-client");
// const socket = io("http://localhost:8080", {
//   transports: ["websocket", "polling", "flashsocket"],
// });

// function App() {
//   useEffect(() => {
//     socket.on("chartdata", (arg) => {
//       console.log(arg);
//     });
//   }, []);
//   const stopCharts = () => {
//     socket.disconnect();
//   };
//   const startCharts = () => {
//     socket.connect();
//   };

//   const [interval, setInt] = useState("");
//   const setNewInterval = () => {
//     socket.emit("setnewinterval", interval);
//   };
//   return (
//     <div className="App">
//       <button onClick={stopCharts}>Stop charts</button>
//       <button onClick={startCharts}>Start charts</button>
//       <div>
//         <input
//           type="number"
//           name="interval"
//           value={interval}
//           onChange={(e) => setInt(e.target.value)}
//         />
//         <button onClick={setNewInterval}>Set interval</button>
//       </div>
//     </div>
//   );
// }

// export default App;

