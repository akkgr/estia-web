import React from "react";
interface CheckboxParams {
  id: string;
  label: string;
  required: boolean;
  props?: any;
}
const Checkbox: React.FC<CheckboxParams> = ({ id, label, required, props }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        id={id}
        type="checkbox"
        className="custom-control-input"
        required={required}
        {...props}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
