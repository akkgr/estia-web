import React from "react";
import ButtonTab from "../buttons/ButtonTab";

interface ITabItemButton {
  tabClassName?: string;
  reference: string;
  message: string;
  tabOnClick: () => void;
}

const TabItemButton: React.FC<ITabItemButton> = ({
  tabClassName,
  tabOnClick,
  reference,
  message,
}) => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <ButtonTab
          href={reference}
          onclick={tabOnClick}
          classname={tabClassName}
          message={message}
        />
      </li>
    </React.Fragment>
  );
};

export default TabItemButton;
