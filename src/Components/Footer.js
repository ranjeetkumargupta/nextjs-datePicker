"use client";
import React, { useState } from "react";
import "../Styles/Footer.css";
import TimePicker from "./TimePicker";
import RecurrenceSelector from "./RecurrenceSelector";

const Footer = ({}) => {
  return (
    <div className="footer-style">
      <div style={{ display: "flex", flexDirection: "row" }}>
        {" "}
        SetTime :
        <span style={{ marginLeft: "10px" }}>
          <TimePicker />{" "}
        </span>
      </div>
      <div> SetReminder</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {" "}
        SetRepeat:
        <span style={{ marginLeft: "10px" }}>
          <RecurrenceSelector />
        </span>
      </div>
    </div>
  );
};
export default Footer;
