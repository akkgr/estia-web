import React, { useEffect } from "react";
import { DashboardBuildings } from "./dashboard/DashboardBuildings";
import { DashboardSettings } from "./dashboard/DashboardSettings";
import { DashboardCategory1 } from "./dashboard/DashboardCategory1";
import { DashboardCategory2 } from "./dashboard/DashboardCategory2";

const Dashboard = (props: any) => {
  const { changeUser } = props;

  useEffect(() => {
    changeUser();
  }, [changeUser]);

  return (
    <div>
      <div className="row flow-offset-1 text-xs-center">
        <div className="col-md-6 col-xs-6">
          <DashboardBuildings />
        </div>
        <div className="col-md-6 col-xs-6">
          <DashboardSettings />
        </div>
      </div>
      <br />
      <div className="row flow-offset-1 text-xs-center">
        <div className="col-md-6 col-xs-6">
          <DashboardCategory1 />
        </div>
        <div className="col-md-6 col-xs-6">
          <DashboardCategory2 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
