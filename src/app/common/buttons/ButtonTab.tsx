import React from "react";

interface IButtonParams {
  classname?: string;
  href: string;
  message: string;
  onclick: () => void;
}

const ButtonTab: React.FC<IButtonParams> = ({
  classname,
  href,
  onclick,
  message,
}) => {
  return (
    <React.Fragment>
      <a
        className={classname}
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
