const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  sessionsCompleted: Number,
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
