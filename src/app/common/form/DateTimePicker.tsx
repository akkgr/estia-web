import React from "react";
import DatePicker from "react-datepicker";

// WE CAN IMPLEMENT TO HAVE TWO DATEPICKER OR TIMEPICKER docs in https://reactdatepicker.com/
export const DateTimePicker = (props: any) => {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <DatePicker
        selected={props.startDate}
        onChange={(date) => props.setStartDate(date)}
        showMonthDropdown
        useShortMonthInDropdown
        showYearDropdown
        dropdownMode="select"
        required={true}
        {...props}
      />
    </React.Fragment>
  );
};
