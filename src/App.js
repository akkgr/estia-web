import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LoginOutlined
} from "@ant-design/icons";

import UserContext from "./UserContext";
import MainMenu from "./components/MainMenu";
import Callback from "./pages/Callback";
import { BuildingList } from "./pages/BuildingList";
import { Dashboard } from "./pages/Dashboard";

const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const manager = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    manager.getUser().then(u => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  }, [manager]);

  const menuClick = ({ key }) => {
    switch (key) {
      case "login":
        manager.signinRedirect();
        break;
      case "logout":
        manager.signoutRedirect();
        break;

      default:
        break;
    }
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed)
              }
            )}
            <Menu mode="horizontal" onClick={menuClick}>
              <SubMenu
                style={{ float: "right" }}
                key="user"
                title={
                  <span>
                    {" "}
                    <UserOutlined />
                    <span>{user?.profile.name}</span>
                  </span>
                }
              >
                {user ? (
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
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/buildings">
                <BuildingList></BuildingList>
              </Route>
              <Route exact path="/callback">
                <Callback></Callback>
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>Cinnamon ©2020</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
