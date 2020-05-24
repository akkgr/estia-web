import React, { useEffect } from "react";

const Dashboard = (props: any) => {
  const { changeUser } = props;

  useEffect(() => {
    changeUser();
  }, [changeUser]);

  return <h1>Dashboard</h1>;
};

export default Dashboard;
