import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
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
      <Menu.Item key="login">
        <LoginOutlined />
        <span>Σύνδεση</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Έξοδος</span>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="buildings">
      <HomeOutlined />
      <span>Κτίρια</span>
    </Menu.Item>
  </Menu>
);

export default MainMenu;
