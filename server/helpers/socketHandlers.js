const fs = require("fs");
const path = require("path");
const socketConnection = require("../socket");

const chartRenderDataPath = path.join(
  __dirname,
  "..",
  "storage",
  "chartRenderData.json"
);
const intervalValueDataPath = path.join(
  __dirname,
  "..",
  "storage",
  "intervalValue.json"
);
const monthNames = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let chartsData =
  JSON.parse(fs.readFileSync(chartRenderDataPath).toString()) || [];

let chartGeneratingTimer = null;
const startChartData = () => {
  const interval =
    JSON.parse(fs.readFileSync(intervalValueDataPath).toString()).interval ||
    5000;
  const socket = socketConnection.getIO();
  chartGeneratingTimer = setInterval(() => {
    if (!Array.isArray(chartsData)) {
      socket.emit("getchartdata", []);
    } else {
      const updatedChartsData = chartsData.map((chart) => {
        const updatedChart = { ...chart };
        const monthIndex = new Date().getMonth();
        updatedChart.metricData = updatedChart.metricData.map(
          (metric, index) => ({
            "Previos Price": metric.Price,
            Price: Math.trunc(Math.random() * 10000),
            month: monthNames[monthIndex + index],
          })
        );
        return updatedChart;
      });
      socket.emit("getchartdata", updatedChartsData);
      chartsData = updatedChartsData;
    }
  }, interval);
};

const clearChartData = () => {
  clearInterval(chartGeneratingTimer);
  chartGeneratingTimer = null;
};
const setNewInterval = (interval) => {
  clearChartData();

  fs.writeFileSync(
    intervalValueDataPath,
    JSON.stringify({ interval: +interval })
  );
  startChartData();
};

module.exports = (socket) => {
  startChartData();
  socket.on("connect", startChartData);
  socket.on("disconnect", clearChartData);
  socket.on("setnewinterval", setNewInterval);
};
