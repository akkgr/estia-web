import React from "react";
import DatePicker from "react-datepicker";
import "./form.css";

// WE CAN IMPLEMENT TO HAVE TWO DATEPICKER OR TIMEPICKER docs in https://reactdatepicker.com/
export const DateTimePicker = (props: any) => {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <DatePicker
        selected={props.startDate}
        onChange={(date) => props.setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown={props.showMonthDropdown}
        useShortMonthInDropdown={props.useShortMonthInDropdown}
        {...props}
      />
    </React.Fragment>
  );
};
