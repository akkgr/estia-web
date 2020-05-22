import React from "react";

interface IButtonSuccess {
  message: string;
}

const ButtonSuccess: React.FC<IButtonSuccess> = ({ message }) => {
  return (
    <React.Fragment>
      <button type="button" className="btn btn-success">
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonSuccess;
