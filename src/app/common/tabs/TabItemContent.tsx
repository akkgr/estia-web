import React from "react";

interface IabItemContent {
  active?: boolean;
  tabId: string
  item: any;
}

const TabItemContent: React.FC<IabItemContent> = ({ active, tabId, item }) => {
  return (
    <React.Fragment>
      <div className={`tab-pane ${active === true ? `active` : ``}`}  id={tabId}>
        {item}
      </div>
    </React.Fragment>
  );
};

export default TabItemContent;
