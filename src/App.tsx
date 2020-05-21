import React, { useState, useContext, useEffect, useCallback } from "react";
import { ReactQueryConfigProvider } from "react-query";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, notification } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserContext from "UserContext";
import MainMenu from "components/MainMenu";
import MainHeader from "components/MainHeader";
import Routes from "app/layout/Routes";

const { Content, Footer, Sider } = Layout;


const notify = (text: any) =>
  toast.error(
  <div>
    <p>Σφάλμα !</p>
    <p>{text}</p>
  </div>, {
  position: "top-right",
  autoClose: 6000
  }); 

const queryConfig = {
  // Global
  suspense: false,
  refetchOnWindowFocus: false,
  onError: (error: any) =>
    // notification["error"]({
    //   message: "Σφάλμα !!!",
    //   description: error.message,
    //   duration: 10,
    // }),
    notify(error.message),
  // useQuery
  retry: false,
};

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
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <MainMenu></MainMenu>
          </Sider>
          <Layout className="site-layout">
            <MainHeader
              collapsed={collapsed}
              menuClick={menuClick}
              setCollapsed={setCollapsed}
              user={user}
            />
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <ToastContainer/>
              <Routes changeUser={changeUser} />
            </Content>
            <Footer style={{ textAlign: "center" }}>Cinnamon ©2020</Footer>
          </Layout>
        </Layout>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export default App;
