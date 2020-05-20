import React from "react";
interface RadioParams {
  label: string;
  choices: string[];
  type: string; //string need from input
  name: string; //name of radio input group
  required: boolean;
  disabled?: boolean; //if we want to make radio input disabled
  props?: any; //any other prop
}
//IF WE NEED TO USE IN COLUMN THE RADIO INPUTS(NOT INLINE) only let className="form-check"
const SelectInputSearch: React.FC<RadioParams> = ({
  label,
  choices,
  type,
  disabled,
  name,
  required,
  props,
}) => {
  return (
    <React.Fragment>
      <div className="custom-control custom-radio ">
        <label>{label}</label>
        {choices.map((choice) => {
          return (
            <div>
              <input
                type={type}
                className="custom-control-input"
                name={name}
                id={choice}
                value={choice}
                disabled={disabled}
                required={required}
                {...props}
              />
              <label className="custom-control-label" htmlFor={choice}>
                {choice}
              </label>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SelectInputSearch;
