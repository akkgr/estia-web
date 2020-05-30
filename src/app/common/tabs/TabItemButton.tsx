import React from "react";
import ButtonTab from "app/common/buttons/ButtonTab";

interface ITabItemButton {
  activeTabButton?: boolean;
  reference: string;
  message: string;
  tabOnClick: () => void;
}

const TabItemButton: React.FC<ITabItemButton> = ({
  activeTabButton,
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
          activeButton={activeTabButton}
          message={message}
        />
      </li>
    </React.Fragment>
  );
};

export default TabItemButton;
