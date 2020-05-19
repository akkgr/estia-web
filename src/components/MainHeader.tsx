import PropTypes from "prop-types";
import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

function MainHeader(props: any) {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => props.setCollapsed(!props.collapsed),
        }
      )}
      <Menu mode="horizontal" onClick={props.menuClick}>
        <SubMenu
          style={{ float: "right" }}
          key="user"
          title={
            <span>
              {" "}
              <i className="fas fa-user"></i>
              <span>{props.user?.profile.name}</span>
            </span>
          }
        >
          {props.user ? (
            <Menu.Item key="logout">
              <LogoutOutlined />
              <span>Έξοδος</span>
            </Menu.Item>
          ) : (
            <Menu.Item key="login">
              <LoginOutlined />
              <span>Είσοδος</span>
            </Menu.Item>
          )}
        </SubMenu>
      </Menu>
    </Header>
  );
}

MainHeader.propTypes = {
  collapsed: PropTypes.any,
  menuClick: PropTypes.any,
  setCollapsed: PropTypes.func,
  user: PropTypes.any,
};

export default MainHeader;
