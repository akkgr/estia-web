import React, { useState } from "react";
interface CheckboxParams {
  name?: string;
  label: string;
  checked?: boolean;
  required?: boolean;
  validMessage?: string;
  invalidMessage?: string;
}
const Checkbox: React.FC<CheckboxParams> = ({
  name,
  label,
  checked,
  required,
  validMessage,
  invalidMessage,
}) => {
  const [check, setCheck] = useState<any>(checked);
  const handleChange = () => {
    setCheck(!check);
  };

  return (
    <React.Fragment>
      <div className="custom-control custom-checkbox mb-3">
        <input
          id={name}
          type="checkbox"
          value={check}
          defaultChecked={check}
          className="custom-control-input"
          name={name}
          required={required}
          onClick={handleChange}
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
