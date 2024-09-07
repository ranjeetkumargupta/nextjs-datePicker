"use client";
import React, { useState } from "react";
import "../Styles/DateRangeSelector.css"; // Assuming you have some basic styles here

const DateRangeSelector = () => {
  const [isOpen, setIsOpen] = useState(false); // To control the visibility of the dropdown
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown visibility
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value); // Update start date
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value); // Update end date
  };

  return (
    <div className="date-range-selector">
      <div className="ellipsis" onClick={toggleDropdown}>
        &#x22EE; {/* Unicode for vertical ellipsis */}
      </div>
      {isOpen && (
        <div className="dropdown">
          <div style={{ color: "black" }}>
            <label>Start Date: </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div style={{ color: "black" }}>
            <label>End Date: </label>
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
