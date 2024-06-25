import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState({
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    notificationsEnabled: true,
    theme: "Light",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/settings")
      .then((response) => setSettings(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleToggle = () => {
    setSettings({
      ...settings,
      notificationsEnabled: !settings.notificationsEnabled,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/settings", settings)
      .then((response) => console.log("Settings updated"))
      .catch((error) => console.log(error));
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label>
        Pomodoro Duration:
        <input
          type="number"
          name="pomodoroDuration"
          value={settings.pomodoroDuration}
          onChange={handleChange}
        />
      </label>
      <label>
        Short Break Duration:
        <input
          type="number"
          name="shortBreakDuration"
          value={settings.shortBreakDuration}
          onChange={handleChange}
        />
      </label>
      <label>
        Long Break Duration:
        <input
          type="number"
          name="longBreakDuration"
          value={settings.longBreakDuration}
          onChange={handleChange}
        />
      </label>
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={settings.notificationsEnabled}
          onChange={handleToggle}
        />
      </label>
      <label>
        Theme:
        <select name="theme" value={settings.theme} onChange={handleChange}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
