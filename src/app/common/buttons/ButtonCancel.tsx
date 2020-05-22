import React from "react";

interface IButtonCancel {
  message: string;
}

const ButtonCancel: React.FC<IButtonCancel> = ({message}) => {
  return (
    <React.Fragment>
      <button type="button" className="btn btn-warning">
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonCancel;
