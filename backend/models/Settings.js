const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  pomodoroDuration: Number,
  shortBreakDuration: Number,
  longBreakDuration: Number,
  notificationsEnabled: Boolean,
  theme: String,
});

module.exports = mongoose.model("Settings", SettingsSchema);
