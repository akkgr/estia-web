import React from "react";
import ButtonTab from "../buttons/ButtonTab";

interface ITabItemButton {
  active?: boolean;
  reference: string;
  message: string;
}

const TabItemButton: React.FC<ITabItemButton> = ({ active, reference, message }) => {
  return (
    <React.Fragment>
      <li className={active === true ? "active" : ""}>
        <ButtonTab href={`#${reference}`} message={message} />
      </li>
    </React.Fragment>
  );
};

export default TabItemButton;