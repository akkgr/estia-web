import React from "react";

interface IButtonCancel {
  message?: any;
  classname?: string;
  dataToggle?: string;
  dataPlacement?: string;
  title?: string;
  onclick?: (e: any) => void;
}

const ButtonCancel: React.FC<IButtonCancel> = ({
  message,
  classname,
  onclick,
  dataToggle,
  dataPlacement,
  title,
}) => {
  const checkClassname = (classname?: string) => {
    return classname === undefined ? `btn btn-warning` : `${classname}`;
  };

  const checkDataToggle = (dataToggle?: string) => {
    return dataToggle === undefined ? null : `${dataToggle}`;
  };

  const checkPlacement = (dataPlacement?: string) => {
    return dataPlacement === undefined ? null : `${dataPlacement}`;
  };

  const checkTitle = (title?: string) => {
    return title === undefined ? undefined : `${title}`;
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={checkClassname(classname)}
        onClick={onclick}
        data-toogle={checkDataToggle(dataToggle)}
        data-placement={checkPlacement(dataPlacement)}
        title={checkTitle(title)}
      >
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonCancel;
