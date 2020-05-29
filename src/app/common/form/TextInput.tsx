import React from "react";
interface InputParams {
  label: string;
  name: string;
  value?: string;
  props?: any;
  // idElement?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  validMessage?: string;
  invalidMessage?: string;
}
const TextInput: React.FC<InputParams> = ({
  label,
  name,
  value,
  placeholder,
  required,
  readOnly,
  disable,
  validMessage,
  invalidMessage,
}) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name} className="control-label">
          {label}
        </label>
        <input
          type="text"
          className="form-control"
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          required={required}
          id={name}
          readOnly={readOnly}
          disabled={disable}
        />
        {required === true ? (
          <React.Fragment>
            <div className="valid-feedback">{validMessage}</div>
            <div className="invalid-feedback">{invalidMessage}</div>
          </React.Fragment>
        ) : (
          <div />
        )}
      </div>
    </React.Fragment>
  );
};

export default TextInput;
