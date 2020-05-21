import React from "react";

interface TabParams {
  body: any;
}
const Tabs: React.FC<TabParams> = ({ body }) => {
  return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          {body}
        </ul>
      </React.Fragment>
  );
};

export default Tabs
