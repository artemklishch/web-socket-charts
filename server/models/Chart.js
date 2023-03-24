const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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

module.exports = class Chart {
  constructor(name, priceColor, prevPriceColor, description) {
    this.id = uuidv4();
    this.name = name;
    this.priceColor = priceColor;
    this.prevPriceColor = prevPriceColor;
    this.description = description;
    this.priceTitle = "Price";
    this.prevPriceTitle = "Previos Price";
    this.isReserved = false;
    this.mentricDataKey = "month";
    const monthIndex = new Date().getMonth();
    this.metricData = new Array(3).fill(null).map((_, index) => ({
      Price: Math.trunc(Math.random() * 10000),
      "Previos Price": null,
      month: monthNames[monthIndex + index],
    }));
  }
  save(chartsData) {
    chartsData.unshift(this);
    fs.writeFileSync(chartRenderDataPath, JSON.stringify(chartsData));
  }
  static edit(id, updatedData) {
    const chartsData = JSON.parse(
      fs.readFileSync(chartRenderDataPath).toString()
    );
    const editingChartIndex = chartsData.findIndex(
      (ch) => String(ch.id) === id
    );
    const updatedChart = { ...chartsData[editingChartIndex], ...updatedData };
    chartsData[editingChartIndex] = updatedChart;
    fs.writeFileSync(chartRenderDataPath, JSON.stringify(chartsData));
  }
  static delete(id) {
    const chartsData = JSON.parse(
      fs.readFileSync(chartRenderDataPath).toString()
    );
    const updatedCharts = chartsData.filter((ch) => ch.id !== id);
    fs.writeFileSync(chartRenderDataPath, JSON.stringify(updatedCharts));
  }
  static getInterval() {
    const interval =
      JSON.parse(fs.readFileSync(intervalValueDataPath).toString()).interval ||
      5000;
    return interval;
  }

  static setInterval(newIntervalData) {
    fs.writeFileSync(intervalValueDataPath, JSON.stringify(newIntervalData));
  }
};
