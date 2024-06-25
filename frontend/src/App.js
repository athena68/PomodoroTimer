import React from "react";
import { Route, Routes } from "react-router-dom";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
