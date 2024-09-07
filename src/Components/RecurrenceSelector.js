"use client";
import React, { useContext, useState } from "react";
import CustomComponentForm from "./CustomComponentForm";
import Modal from "./Modal";
import { RecurrenceContext } from "./RecurrenceContext";

const RecurrenceSelector = () => {
  const { setRecurrence } = useContext(RecurrenceContext);
  const [selectedOption, setSelectedOption] = useState("None");
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [startDate, setLocalStartDate] = useState("");
  const [endDate, setLocalEndDate] = useState("");

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setLocalStartDate(date);
    setStartDate(date);
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setLocalEndDate(date);
    setEndDate(date);
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setRecurrence(value);

    if (value === "Custom") {
      setIsCustomFormOpen(true);
    } else {
      setIsCustomFormOpen(false);
    }
  };

  const closeCustomForm = () => {
    setIsCustomFormOpen(false);
  };

  const generateRecurrenceOptions = () => {
    const options = ["None", "Daily", "Monthly", "Weekly", "Custom"];
    return options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleOnChange}>
          {generateRecurrenceOptions()}
        </select>

        <Modal isOpen={isCustomFormOpen} onClose={closeCustomForm}>
          <CustomComponentForm onClose={closeCustomForm} />
        </Modal>
      </div>
    </div>
  );
};

export default RecurrenceSelector;
