import React from "react";

interface ITab {
  tabId?: string;
  content: any;
  tabListItems: any;
  active?: boolean;
  element?: any;
}

const Tab: React.FC<ITab> = ({
  tabId,
  content,
  tabListItems
}) => {
  return (
    <React.Fragment>
      <div id={tabId}>
        <ul className="nav nav-tabs">
          {tabListItems}
        </ul>
        <div id="myTabContent"  className="tab-content">
            {content}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tab;
