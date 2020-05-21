import React from "react";
interface TextAreaParams {
  label: string;
  rows: number;
  placeholder?: string;
}
const TextArea: React.FC<TextAreaParams> = ({ label, rows, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor="FormControlTextarea1">{label}</label>
      <textarea
        className="form-control"
        id="FormControlTextarea1"
        rows={rows}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
