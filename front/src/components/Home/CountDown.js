import React, { useState, useEffect } from 'react';
import './Countdown.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(361100); // 1 hour in seconds

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad single digits with leading zero
    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      remainingSeconds: String(remainingSeconds).padStart(2, '0'),
    };
  };
  const { days, hours, minutes, remainingSeconds } = formatTime(timeLeft);

  return (
    <div className="countdown-container">
      <div className="top-text">Hurry Up!!! {"  "} Limited time left</div>
      <div className="timer">
        <div className="time-box">
          <div className="time">{days}</div>
          <div className="label">Days</div>
        </div>
        <div className="time-box">
          <div className="time">{hours}</div>
          <div className="label">Hours</div>
        </div>
        <div className="time-box">
          <div className="time">{minutes}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="time-box">
          <div className="time">{remainingSeconds}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
