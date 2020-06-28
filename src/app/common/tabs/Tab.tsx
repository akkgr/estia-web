import React from "react";

interface ITab {
  tabId?: string;
  content: any;
  tabListItems: any;
  active?: boolean;
  element?: any;
}

const Tab: React.FC<ITab> = ({ tabId, content, tabListItems }) => {
  return (
    <React.Fragment>
      <ul id="tabs" className="nav nav-tabs">
        {tabListItems}
      </ul>
      <br />
      <div className="tab-content" id="tabsContent">
        {content}
      </div>
    </React.Fragment>
  );
};

export default Tab;
