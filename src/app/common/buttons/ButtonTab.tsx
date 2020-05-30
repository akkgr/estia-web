import React from "react";

interface IButtonParams {
  activeButton?: boolean;
  href: string;
  message: string;
  onclick: () => void;
}

const ButtonTab: React.FC<IButtonParams> = ({
  activeButton,
  href,
  onclick,
  message,
}) => {

  const handleActive = (a: boolean | undefined) => {
    return a === true ? `active` : null
  }

  return (
    <React.Fragment>
      <a
        className={`nav-link ${handleActive(activeButton)}`}
        data-toggle="tab"
        href={`#${href}`}
        onClick={onclick}
      >
        {message}
      </a>
    </React.Fragment>
  );
};

export default ButtonTab;