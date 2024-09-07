"use client";
import React, { useState, useContext } from "react";
import { RecurrenceContext } from "./RecurrenceContext";

const CustomComponent = ({ onClose }) => {
  const { setRecurrence, setX, setSpecificDays } =
    useContext(RecurrenceContext);
  const [customRecurrence, setCustomRecurrence] = useState({
    frequency: { unit: "days", value: "1" },
    specificDays: [],
    nthDay: { n: 1, day: "Monday" },
  });

  const handleSave = () => {
    const { unit, value } = customRecurrence.frequency;
    console.log("Saving specificDays:", customRecurrence.specificDays); // Debugging line
    // Update recurrence and x based on the user's input
    switch (unit) {
      case "days":
        setX(parseInt(value, 10));
        setRecurrence("Every X Days");
        break;
      case "weeks":
        setX(parseInt(value, 10) * 7);
        setRecurrence("Every X Weeks");
        break;
      case "months":
        setX(parseInt(value, 10));
        setRecurrence("Every X Months");
        break;
      case "years":
        setX(parseInt(value, 10) * 365);
        setRecurrence("Every X Years");
        break;
      default:
        setRecurrence("None");
        setX(1);
        break;
    }
    if (customRecurrence.specificDays.length > 0) {
      console.log("length");
      setRecurrence("Specific Days of the Week");
      setSpecificDays(customRecurrence.specificDays);
    }

    onClose(false); // Close the custom recurrence component
  };

  const handleFrequencyChange = (event) => {
    const { name, value } = event.target;
    setCustomRecurrence((prev) => ({
      ...prev,
      frequency: { ...prev.frequency, [name]: value },
    }));
  };

  const handleSpecificDaysChange = (event) => {
    const { value, checked } = event.target;
    setRecurrence("Specific Days of the Week");

    setCustomRecurrence((prev) => {
      const updatedDays = checked
        ? [...prev.specificDays, value]
        : prev.specificDays.filter((day) => day !== value);

      return {
        ...prev,
        specificDays: updatedDays,
      };
    });
  };

  const handleNthDayChange = (event) => {
    const { name, value } = event.target;
    console.log("Current nthDay values:", customRecurrence.nthDay);
    console.log("Changed name:", name, "New value:", value);
    setCustomRecurrence((prev) => ({
      ...prev,
      nthDay: { ...prev.nthDay, [name]: value },
    }));
  };

  const inputStyle = {
    border: "1px solid #ccc",
    padding: "2px",
    borderRadius: "6px",
    outline: "none",
    marginLeft: "8px",
  };

  const inputFocusStyle = {
    borderColor: "#0070f3",
  };

  return (
    <div>
      <h3>
        <strong>Custom Recurrence</strong>
      </h3>
      <div>
        <label>
          Every
          <input
            type="number"
            name="value"
            value={customRecurrence.frequency.value}
            onChange={handleFrequencyChange}
            min="1"
            style={inputStyle}
          />
          <select
            name="unit"
            value={customRecurrence.frequency.unit}
            onChange={handleFrequencyChange}
            style={inputStyle}
          >
            <option value="days">days</option>
            <option value="weeks">weeks</option>
            <option value="months">months</option>
            <option value="years">years</option>
          </select>
        </label>
      </div>

      <div>
        <h4>
          <strong>Specific Days of the Week</strong>
        </h4>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <label key={day} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value={day}
              checked={customRecurrence.specificDays.includes(day)}
              onChange={handleSpecificDaysChange}
            />
            {day}
          </label>
        ))}
      </div>

      <div>
        <h4>
          <strong>The Nth Day of the Month </strong>
        </h4>
        <label>
          <input
            type="number"
            name="n"
            value={customRecurrence.nthDay.n || ""} // Ensure a default value if undefined
            onChange={handleNthDayChange}
            min="1"
            max="5"
            style={inputStyle}
          />
          <select
            name="day"
            value={customRecurrence.nthDay.day || ""} // Ensure a default value if undefined
            onChange={handleNthDayChange}
            style={inputStyle}
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        style={{
          border: "1px solid #ccc",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          alignContent: "center",
        }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default CustomComponent;
