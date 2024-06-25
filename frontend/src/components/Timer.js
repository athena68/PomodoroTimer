import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            setSessionsCompleted((prevSessions) => prevSessions + 1);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused]);

  const handleStartPause = () => {
    if (isActive) {
      setIsPaused(!isPaused);
    } else {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="timer">
          <div className="time-display">{formatTime(time)}</div>
          <div className="buttons">
            <button className="start-button" onClick={handleStartPause}>
              {isActive && !isPaused ? "Pause" : "Start"}
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="sessions">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <span
                  key={index}
                  className={
                    index < sessionsCompleted ? "session-completed" : ""
                  }
                ></span>
              ))}
          </div>
          <p className="quote">"Stay focused and productive!"</p>
        </div>
      </main>
    </div>
  );
};

export default Timer;
