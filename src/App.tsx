import React, { useState, useContext, useEffect, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import UserContext from "./UserContext";
import MainMenu from "./components/MainMenu";
import Callback from "./pages/Callback";
import { BuildingList } from "./pages/buildings/BuildingList";
import { Dashboard } from "./pages/Dashboard";
import { Building } from "./pages/buildings/Building";
import Silent from "./pages/Silent";
import { NewBuilding } from "./pages/buildings/NewBuilding";
import { Apartment } from "./pages/apartments/Apartment";
import { NewApartment } from "./pages/apartments/NewApartment";

const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const manager = useContext(UserContext);
  const [user, setUser] = useState<Oidc.User | null>(null);

  const changeUser = useCallback(() => {
    manager.getUser().then((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  }, [manager]);

  useEffect(() => {
    changeUser();
  }, [changeUser]);

  const menuClick = (value: { key: string }) => {
    switch (value.key) {
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
                onClick: () => setCollapsed(!collapsed),
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
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard changeUser={changeUser} />
              </Route>
              <Route exact path="/buildings">
                <BuildingList></BuildingList>
              </Route>
              <Route exact path="/buildings/new">
                <NewBuilding></NewBuilding>
              </Route>
              <Route exact path="/buildings/:id">
                <Building></Building>
              </Route>
              <Route exact path="/buildings/:id/apartments/new">
                <NewApartment></NewApartment>
              </Route>
              <Route exact path="/buildings/:id1/apartments/:id2">
                <Apartment></Apartment>
              </Route>
              <Route exact path="/callback">
                <Callback></Callback>
              </Route>
              <Route exact path="/callback">
                <Silent></Silent>
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
