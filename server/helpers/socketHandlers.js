const fs = require("fs");
const path = require("path");
const socketConnection = require("../socket");

const chartRenderDataPath = path.join(__dirname, "..", "chartRenderData.json");

let chartGeneratingTimer = null;
const startChartData = () => {
  const chartRenderDataData = JSON.parse(
    fs.readFileSync(chartRenderDataPath).toString()
  );
  const socket = socketConnection.getIO();
  const interval = chartRenderDataData.interval * 1000 || 5000;
  chartGeneratingTimer = setInterval(() => {
    socket.emit("chartdata", "world");
  }, interval);
};
const clearChartData = () => {
  clearInterval(chartGeneratingTimer);
  chartGeneratingTimer = null;
};
const setNewInterval = (interval) => {
  clearChartData();
  const chartRenderDataData = JSON.parse(
    fs.readFileSync(chartRenderDataPath).toString()
  );
  fs.writeFileSync(
    chartRenderDataPath,
    JSON.stringify({ ...chartRenderDataData, interval: +interval })
  );
  startChartData();
};

module.exports = (socket) => {
  startChartData();
  socket.on("connect", startChartData);
  socket.on("disconnect", clearChartData);
  socket.on("setnewinterval", setNewInterval);
};
