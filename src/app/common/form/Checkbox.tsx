import React from "react";
interface CheckboxParams {
  label: string;
  required: boolean;
  props?: any;
}
const TextInput: React.FC<CheckboxParams> = ({ label, required, props }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customCheck1"
        required={required}
        {...props}
      />
      <label className="custom-control-label" htmlFor="customCheck1">
        {label}
      </label>
    </div>
  );
};

export default TextInput;
