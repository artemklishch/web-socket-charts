const path = require("path");
const fs = require("fs");
const Chart = require("../models/Chart");

const chartRenderDataPath = path.join(
  __dirname,
  "..",
  "storage",
  "chartRenderData.json"
);

const MAX_CHARTS_AMOUNT = 10;

exports.createNewChart = (req, res) => {
  let errorText = "Failed to save!";
  try {
    const chartsData = JSON.parse(
      fs.readFileSync(chartRenderDataPath).toString()
    );
    if (chartsData.length === MAX_CHARTS_AMOUNT) {
      errorText =
        "Impossible to add more than 10 charts! You can delete any chart and add new one.";
      throw new Error();
    }
    const { name, priceColor, prevPriceColor, description } = req.body;
    const chart = new Chart(name, priceColor, prevPriceColor, description);
    chart.save(chartsData);
    res.status(200).json(chart);
  } catch (err) {
    res.status(500).json({ message: errorText });
  }
};

exports.deleteChart = (req, res) => {
  let errorMessage = "Failed to delete!";
  try {
    const id = req.params.id;
    const charts = JSON.parse(fs.readFileSync(chartRenderDataPath).toString());
    const deletedChart = charts.find((ch) => String(ch.id) === id);
    if (deletedChart.isReserved) {
      errorMessage = "This chart is reserved and can not be deleted!";
    }
    if (!deletedChart) {
      errorMessage = "This chart has already been deleted!";
    }
    if (!deletedChart || deletedChart.isReserved) {
      throw new Error();
    }
    Chart.delete(id);
    res.status(200).json({ message: "Chart was deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: errorMessage });
  }
};

exports.editChart = (req, res) => {
  try {
    const id = req.params.id;
    Chart.edit(id, req.body);
    res.status(200).json({ message: "Edited successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to edit!" });
  }
};

exports.getInterval = (req, res) => {
  try {
    const interval = Chart.getInterval();
    res.status(200).json({ interval: interval });
  } catch (err) {
    res.status(500).json({ message: "Failed to get data!" });
  }
};

exports.setInterval = (req, res) => {
  try {
    Chart.setInterval(req.body);
    res.status(201).json("Interval updated!");
  } catch (err) {
    res.status(500).json({ message: "Failed to update interval!" });
  }
};
