import React from "react";

interface IButtonSubmit {
  message?: any;
  classname?: string;
  dataToggle?: string;
  dataPlacement?: string;
  title?: string;
  disable?: boolean;
}

const ButtonSubmit: React.FC<IButtonSubmit> = ({
  message,
  classname,
  dataToggle,
  dataPlacement,
  title,
  disable
}) => {

  const checkClassname = (classname?: string) => {
    return classname === undefined ? `btn btn-primary` : `${classname}`
  }

  const checkDataToggle = (dataToggle?: string) => {
    return dataToggle === undefined ? null : `${dataToggle}`
  }

  const checkPlacement = (dataPlacement?: string) => {
    return dataPlacement === undefined ? null : `${dataPlacement}`
  }

  const checkTitle = (title?: string) => {
    return title === undefined ? undefined : `${title}`
  }

  return (
    <React.Fragment>
      <button
        type="submit"
        className={checkClassname(classname)}
        data-topgle={checkDataToggle(dataToggle)}
        data-placement={checkPlacement(dataPlacement)}
        title={checkTitle(title)}
        disabled={disable}
      >
        {message}
      </button>
    </React.Fragment>
  );
};

export default ButtonSubmit;
