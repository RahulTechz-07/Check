import React, { useEffect, useState } from "react";
import "./Home.css"; // or wherever your CSS is

function CountdownTimer() {
const targetDate = new Date("2025-08-30T09:00:00");
 // 🎯 Set your event date here
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
     const targetDate = new Date("2025-08-30T09:00:00");
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <section className="countdown-section">
      <h2>Countdown to the Event</h2>
      {timeLeft.total > 0 ? (
        <p>
          🕒 {timeLeft.days} Days | {timeLeft.hours} Hours |{" "}
          {timeLeft.minutes} Minutes | {timeLeft.seconds} Seconds
        </p>
      ) : (
        <p>🎉 The event has started!</p>
      )}
    </section>
  );
}

export default CountdownTimer;
