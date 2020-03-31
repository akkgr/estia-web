import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import MainMenu from "./components/MainMenu";
import { BuildingList } from "./pages/BuildingList";
import { Dashboard } from "./pages/Dashboard";

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, margin: "16px 0" }}
            >
              <Switch>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/buildings">
                  <BuildingList></BuildingList>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Cinnamon ©2020</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
