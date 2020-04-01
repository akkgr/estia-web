import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, DashboardOutlined } from "@ant-design/icons";

const MainMenu = () => {
  let location = useLocation();

  return (
    <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
      <Menu.Item key="/dashboard">
        <Link to={`/dashboard`}>
          <DashboardOutlined />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/buildings">
        <Link to={`/buildings`}>
          <HomeOutlined />
          <span>Κτίρια</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;
