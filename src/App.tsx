import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { ReactQueryConfigProvider } from "react-query";
import "./App.css";
import { BrowserRouter as Router , Link } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "UserContext";
import MainMenu from "components/MainMenu";
import MainHeader from "components/MainHeader";
import Routes from "app/layout/Routes";
import Loading from "app/layout/Loading";

import { FiMenu } from 'react-icons/fi'

const { Content, Footer, Sider } = Layout;

const queryConfig = {
  // Global
  suspense: true,
  refetchOnWindowFocus: false,
  useErrorBoundary: false,
  throwOnError: false,
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
      <Suspense fallback={<Loading />}>
        <Router>
          <ToastContainer position="bottom-right" />
          {/* <Layout style={{ minHeight: "100vh" }}>
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
                <Routes changeUser={changeUser} />
              </Content>
              <Footer style={{ textAlign: "center" }}>Cinnamon ©2020</Footer>
            </Layout>
          </Layout> */}
          <div className="wrapper">
            <MainMenu></MainMenu>
            <div id="content" >
              <MainHeader
                collapsed={collapsed}
                menuClick={menuClick}
                setCollapsed={setCollapsed}
                user={user}
              />
              <br />
              <div id="routes-content" style={{margin: 15 }}>
                <Routes changeUser={changeUser} />
              </div>
            </div>
            </div>
            <div className="footer">
                <div className="media-container-row align-center ">
                        <p className="mbr-text mb-0 mbr-fonts-style display-7 text-center bg-dark text-white ">
                        Copyright © 2020 - GG noob
                    </p>
                </div>
            </div>
        </Router>
      </Suspense>
    </ReactQueryConfigProvider>
  );
}

export default App;
