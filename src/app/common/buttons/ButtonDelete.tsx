import React from "react";

interface IButtonDelete {
  message: string;
}

const ButtonDelete: React.FC<IButtonDelete> = ({ message }) => {
  return (
    <React.Fragment>
      <button type="button" className="btn btn-danger">
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonDelete;
