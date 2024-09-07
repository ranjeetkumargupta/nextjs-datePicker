"use client";
import React, { useState, useEffect, useContext } from "react";
import "../Styles/DatePicker.css";
import { RecurrenceContext } from "./RecurrenceContext";

const DatePicker = () => {
  const { recurrence, x, specificDays } = useContext(RecurrenceContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);

  const dayHash = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  useEffect(() => {
    const convertDayNamesToIndices = (dayNames) => {
      return dayNames.map((dayName) => dayHash[dayName]);
    };

    const specificDaysIndices = convertDayNamesToIndices(specificDays);

    // console.log("Converted specificDays Indices:", specificDaysIndices);

    const getSpecificDaysOfWeek = (specificDaysIndex) => {
      const daysToHighlight = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        );
        if (specificDaysIndex.includes(date.getDay())) {
          daysToHighlight.push(day);
        }
      }
      return daysToHighlight;
    };

    const highlightDates = () => {
      const highlighted = [];
      switch (recurrence) {
        case "Every X Days":
          for (
            let i = selectedDate ? selectedDate.getDate() : 1;
            i <= daysInMonth;
            i += x
          ) {
            highlighted.push(i);
          }
          break;
        case "Every X Weeks":
          for (
            let i = selectedDate ? selectedDate.getDate() : 1;
            i <= daysInMonth;
            i += x * 7
          ) {
            highlighted.push(i);
          }
          break;
        case "Every X Months":
          if (selectedDate) {
            highlighted.push(selectedDate.getDate());
          } else {
            highlighted.push(1);
          }
          break;
        case "Specific Days of the Week":
          highlighted.push(...getSpecificDaysOfWeek(specificDaysIndices));
          break;
        case "Nth Day of the Month":
          const getNthWeekdayOfMonth = (n, dayOfWeek) => {
            const firstDayOfMonth = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              1
            ).getDay();
            const dayOffset = (dayOfWeek - firstDayOfMonth + 7) % 7;
            const nthDay = 1 + dayOffset + (n - 1) * 7;
            return nthDay <= daysInMonth ? nthDay : null;
          };
          const nthDay = getNthWeekdayOfMonth(x, 2); // e.g., the 2nd Tuesday
          if (nthDay) {
            highlighted.push(nthDay);
          }
          break;
        case "Daily":
          for (let i = 1; i <= daysInMonth; i++) {
            highlighted.push(i);
          }
          break;
        case "Weekly":
          for (
            let i = selectedDate ? selectedDate.getDate() : 1;
            i <= daysInMonth;
            i += 7
          ) {
            highlighted.push(i);
          }
          break;
        case "Monthly":
          if (selectedDate) {
            highlighted.push(selectedDate.getDate());
          } else {
            highlighted.push(1);
          }
          break;
        default:
          break;
      }
      setHighlightedDates(highlighted);
    };

    highlightDates();
  }, [recurrence, x, specificDays, daysInMonth, currentMonth, selectedDate]);

  const handleDateClick = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    ) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day, index) => (
      <div key={index} className="week-days">
        {day}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className={`calendar-day ${
            highlightedDates.includes(i) ? "highlighted" : ""
          } ${selectedDate && selectedDate.getDate() === i ? "selected" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar">
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default DatePicker;
