"use client";
import React, { createContext, useState } from "react";
//create a context
export const RecurrenceContext = createContext();

export const RecurrenceProvider = ({ children }) => {
  const [recurrence, setRecurrence] = useState("None");
  const [specificDays, setSpecificDays] = useState([]);
  const [x, setX] = useState(1);

  return (
    <RecurrenceContext.Provider
      value={{
        recurrence,
        setRecurrence,
        x,
        setX,
        specificDays,
        setSpecificDays,
      }}
    >
      {children}
    </RecurrenceContext.Provider>
  );
};
