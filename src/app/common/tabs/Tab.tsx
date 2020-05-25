import React from "react";
import TabItemButton from "./TabItemButton";
import TabItemContent from "./TabItemContent";

interface ITab {
  tabId?: string;
  content: any;
  tabListItems: any;
//   items?: [];
  // refId: string;
  // tabMessage: string;
  active?: boolean;
  element?: any;
}

const Tab: React.FC<ITab> = ({
  tabId,
  content,
  tabListItems,
  // refId,
  // tabMessage,
  active,
  element
}) => {
  return (
    <React.Fragment>
      <div id={tabId}>
        <ul className="nav nav-pills">
          {tabListItems}
        </ul>
        <div className="tab-content">
            {content}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tab;
