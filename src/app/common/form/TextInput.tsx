import React from "react";
interface InputParams {
  label: string;
  name: string;
  value: string;
  props?: any;
  idElement?: string;
  placeholder?: string;
  required: boolean;
  readOnly?: boolean;
}
const TextInput: React.FC<InputParams> = ({
  label,
  name,
  value,
  props,
  placeholder,
  idElement,
  required,
  readOnly,
}) => {
  return (
    <React.Fragment>
      <label htmlFor={idElement} className="control-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        id={idElement}
        readOnly={readOnly}
        {...props}
      />
    </React.Fragment>
  );
};

export default TextInput;
