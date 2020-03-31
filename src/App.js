import React from "react";
import "./App.css";

import { Layout } from "antd";

import MainMenu from "./components/MainMenu";
import { BuildingList } from "./components/BuildingList";

const { Content, Footer, Sider } = Layout;

function App() {
  return (
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
            <BuildingList></BuildingList>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Cinnamon ©2020</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
