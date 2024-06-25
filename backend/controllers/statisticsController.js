const Statistics = require("../models/Statistics");

exports.getStatistics = async (req, res) => {
  const statistics = await Statistics.find();
  res.json(statistics);
};

exports.addStatistics = async (req, res) => {
  const newStats = new Statistics(req.body);
  await newStats.save();
  res.json(newStats);
};
