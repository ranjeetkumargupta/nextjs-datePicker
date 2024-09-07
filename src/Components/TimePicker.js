"use client";
import { useState } from "react";

const TimePicker = () => {
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const handleOnchangeHour = (event) => {
    setHour(event.target.hour);
  };

  const handleOnchangeMinute = (event) => {
    setMinute(event.target.minute);
  };

  const handleOnchangePeriod = (event) => {
    setPeriod(event.target.period);
  };

  const displayHour = () => {
    const options = [];

    for (let i = 0; i < 12; i++) {
      options.push(
        <option key={i + 1} value={i.toString().padStart(2, "0") + 1}>
          {" "}
          {i + 1}
        </option>
      );
    }

    return options;
  };

  const displayMinute = () => {
    const options = [];
    for (let i = 0; i < 59; i++) {
      options.push(
        <option key={i + 1} value={i.toString().padStart(2, "0")}>
          {i.toString().padStart(2, "0")}
        </option>
      );
    }
    return options;
  };

  return (
    <div> 
      <select value={hour} onChange={handleOnchangeHour}>
        {displayHour()}
      </select>
      <select value={minute} onChange={handleOnchangeMinute}>
        {displayMinute()}
      </select>
      <select value={period} onChange={handleOnchangePeriod}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;
