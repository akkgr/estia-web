import React, { useEffect } from "react";

export const Dashboard = (props: any) => {
  const { changeUser } = props;

  useEffect(() => {
    changeUser();
  }, [changeUser]);

  return <h1>Dashboard</h1>;
};
