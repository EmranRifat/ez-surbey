// RangeCalender.jsx
import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const RangeCalender = ({ value, onChange }) => {
  return (
    <div className="range-calendar-container text-gray-700">
      <DateRangePicker
        label="Stay duration"
        color="primary" 
        defaultValue={{
          start: parseDate("2024-04-01"),
          end: parseDate("2024-04-08"),
        }}
        className="max-w-xs custom-date-range-picker"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RangeCalender;
