const fs = require("fs");
const path = require("path");
const socketConnection = require("../socket");

const chartRenderData = path.join(
  __dirname,
  "..",
  "storage",
  "chartRenderData.json"
);
const intervalValueData = path.join(
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

let chartGeneratingTimer = null;
const startChartData = () => {
  const intervalValue = JSON.parse(
    fs.readFileSync(intervalValueData).toString()
  );
  const socket = socketConnection.getIO();
  const interval = intervalValue.interval * 1000 || 5000;
  chartGeneratingTimer = setInterval(() => {
    const chartsData = JSON.parse(fs.readFileSync(chartRenderData).toString());
    const updatedChartsData = chartsData.map((chart) => {
      const updatedChart = { ...chart };
      updatedChart.metricData = updatedChart.metricData.map(
        (metric, index) => ({
          Price: Math.trunc(Math.random() * 10000),
          "Previos Price": metric.Price,
          month: monthNames[index],
        })
      );
      return updatedChart;
    });
    socket.emit("getchartdata", updatedChartsData);
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
