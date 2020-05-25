import React from "react";

interface ITabItem {
  active?: boolean;
  tabId: string;
  item: any;
}

const TabItem: React.FC<ITabItem> = ({ active, tabId, item }) => {
  const handleActive = (active?: boolean) => {
    return active === true ? `active` : ``;
  };

  return (
    <React.Fragment>
      <div className={`tab-pane ${handleActive(active)}`} id={tabId}>
        {item}
      </div>
    </React.Fragment>
  );
};

export default TabItem;
