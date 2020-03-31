import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

const MainMenu = () => (
  <Menu theme="dark" defaultSelectedKeys={["buildings"]} mode="inline">
    <SubMenu
      key="user"
      title={
        <span>
          {" "}
          <UserOutlined />
          <span>username</span>
        </span>
      }
    >
      {/* <Menu.Item key="login">
        <LoginOutlined />
        <span>Σύνδεση</span>
      </Menu.Item> */}
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Έξοδος</span>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="dashboard">
      <Link to={`/dashboard`}>
        <DashboardOutlined />
        <span>Dashboard</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="buildings">
      <Link to={`/buildings`}>
        <HomeOutlined />
        <span>Κτίρια</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export default MainMenu;
