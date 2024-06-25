const Settings = require("../models/Settings");

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none are found
      settings = new Settings({
        pomodoroDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        notificationsEnabled: true,
        theme: "Light",
      });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
