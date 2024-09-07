"use client";
import React from "react";
import "../Styles/Header.css";
import DateRangeSelector from "./DateRangeSelector.js";

const Header = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthString = months[currentMonth];

  return (
    <div className="header-component">
      <div className="header-content">
        <h1 className="date">{`${date.getDate()} ${currentMonthString}`}</h1>

        <DateRangeSelector />
      </div>
    </div>
  );
};

export default Header;
