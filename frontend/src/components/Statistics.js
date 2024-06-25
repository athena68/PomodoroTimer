import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [dailySessions, setDailySessions] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/statistics")
      .then((response) => {
        if (response.data) {
          setStatistics(response.data);
          calculateDailySessions(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const calculateDailySessions = (stats) => {
    const today = new Date().toISOString().split("T")[0];
    const todaySessions = stats
      .filter((stat) => stat.date.startsWith(today))
      .reduce((acc, stat) => acc + stat.sessionsCompleted, 0);
    setDailySessions(todaySessions);
  };

  const getWeeklyData = (stats) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = new Array(7).fill(0);
    stats.forEach((stat) => {
      const day = new Date(stat.date).getDay();
      weeklyData[day] += stat.sessionsCompleted;
    });
    return daysOfWeek.map((day, index) => (
      <div
        key={index}
        className="bar"
        style={{ height: `${weeklyData[index] * 20}px` }}
      >
        <span>{day}</span>
      </div>
    ));
  };

  const getMonthlyData = (stats) => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const monthlyData = new Array(daysInMonth).fill(0);
    stats.forEach((stat) => {
      const day = new Date(stat.date).getDate();
      monthlyData[day - 1] += stat.sessionsCompleted;
    });
    return monthlyData.map((count, index) => (
      <div key={index} className="calendar-day">
        {index + 1} <span>({count})</span>
      </div>
    ));
  };

  return (
    <div className="statistics">
      <h2>Today:</h2>
      <p>Pomodoro Sessions: {dailySessions}</p>
      <h3>Weekly Summary:</h3>
      <div className="chart">{getWeeklyData(statistics)}</div>
      <h3>Monthly Summary:</h3>
      <div className="calendar">{getMonthlyData(statistics)}</div>
      <h3>Achievements:</h3>
      <div className="achievements">
        <span className="badge">🏅 Early Bird</span>
        <span className="badge">🏅 Consistency</span>
        {/* Add more badges as needed */}
      </div>
    </div>
  );
};

export default Statistics;
