import React from "react";

interface IButtonSubmit {
  message: string;
}

const ButtonSubmit: React.FC<IButtonSubmit> = ({ message }) => {
  return (
    <React.Fragment>
      <button type="submit" className="btn btn-primary">
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonSubmit;
