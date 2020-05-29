import React from "react";

interface ITabItem {
  active?: boolean;
  tabId: string;
  item: any;
}

const TabItem: React.FC<ITabItem> = ({ active, tabId, item }) => {
  const handleActive = (a: boolean | undefined) => {
    return a === true ? "active" : ""
  }
  
  return (
    <React.Fragment>
      <div className={`tab-pane fade show ${handleActive(active)}`} id={tabId}>
        <br />
        {item}
      </div>
    </React.Fragment>
  );
};

export default TabItem;
