import React from "react";
interface InputParams {
  type?: string;
  label: string;
  name: string;
  value?: any;
  prepend?: string;
  append?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  validMessage?: string;
  invalidMessage?: string;
  min?: number;
  max?: number;
  step?: number | string;
}
const TextInput: React.FC<InputParams> = ({
  type,
  label,
  name,
  value,
  prepend,
  append,
  placeholder,
  required,
  readOnly,
  disable,
  validMessage,
  invalidMessage,
  min,
  max,
  step,
}) => {
  const checkInputType = (type?: string) => {
    return type === undefined ? "text" : type;
  };
  // const input = React.createRef();
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name} className="control-label">
          {label}
        </label>
        <div className="input-group">
          {prepend !== undefined && (
            <div className="input-group-prepend">
              <span className="input-group-text">{prepend}</span>
            </div>
          )}
          <input
            type={checkInputType(type)}
            className="form-control"
            name={name}
            id={name}
            defaultValue={value}
            //ref={input}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            disabled={disable}
            min={min}
            max={max}
            step={step}
          />
          {required === true && (
            <React.Fragment>
              <div className="valid-feedback">{validMessage}</div>
              <div className="invalid-feedback">{invalidMessage}</div>
            </React.Fragment>
          )}
          {append !== undefined && (
            <div className="input-group-append">
              <span className="input-group-text">{append}</span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TextInput;
