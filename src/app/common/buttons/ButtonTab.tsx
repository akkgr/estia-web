import React from "react";

interface IButtonParams {
  href: string;
  message: string;
}

const ButtonTab: React.FC<IButtonParams> = ({ href, message }) => {
  return (
    <React.Fragment>
      <a
        style={{ margin: "20px" }}
        className="btn btn-primary"
        role="button"
        href={href}
        data-toggle="tab"
      >
        {message}
      </a>
    </React.Fragment>
  );
};

export default ButtonTab;
