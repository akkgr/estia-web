import React from "react";
interface CheckboxParams {
  name?: string;
  label: string;
  required?: boolean;
  validMessage?: string;
  invalidMessage?: string;
}
const Checkbox: React.FC<CheckboxParams> = ({
  name,
  label,
  required,
  validMessage,
  invalidMessage,
}) => {
  return (
    <React.Fragment>
      <div className="custom-control custom-checkbox mb-3">
        <input
          id={name}
          type="checkbox"
          className="custom-control-input"
          name={name}
          required={required}
        />
        <label className="custom-control-label" htmlFor={name}>
          {label}
          {required === true ? (
            <React.Fragment>
              <div className="valid-feedback">{validMessage}</div>
              <div className="invalid-feedback">{invalidMessage}</div>
            </React.Fragment>
          ) : (
            <div />
          )}
        </label>
      </div>
    </React.Fragment>
  );
};

export default Checkbox;
