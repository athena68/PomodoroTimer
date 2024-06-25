import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Pomodoro App";
      case "/settings":
        return "Settings";
      case "/statistics":
        return "Statistics";
      default:
        return "Pomodoro App";
    }
  };

  return (
    <nav className="nav">
      <div className="nav-content">
        <h1 className="nav-title">{getTitle()}</h1>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/statistics" className="nav-link">
              Statistics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
