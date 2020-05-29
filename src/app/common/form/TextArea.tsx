import React from "react";
interface TextAreaParams {
  name: string;
  label: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  required?: boolean;
  validMessage?: string;
  invalidMessage?: string;
}
const TextArea: React.FC<TextAreaParams> = ({
  name,
  label,
  rows,
  cols,
  placeholder,
  required,
  validMessage,
  invalidMessage,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        className="form-control"
        rows={rows}
        cols={cols}
        placeholder={placeholder}
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
  );
};

export default TextArea;
