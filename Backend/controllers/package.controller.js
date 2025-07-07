const frontendData = require("../dataModels/frontendDatas");
const fs = require("fs");
const path = require("path");

exports.getTrendingImages = (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "trendingData.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read Trending Data" });
    }
    res.status(200).json(JSON.parse(data));
  });
};

exports.getPackages = (req, res) => {
  res.status(200).json(frontendData.packageData);
};
