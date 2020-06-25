import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { ReactQueryConfigProvider } from "react-query";
import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "UserContext";
import MainMenu from "components/menu/MainMenu";
import MainHeader from "components/menu/MainHeader";
import Routes from "app/layout/Routes";
import Loading from "app/layout/Loading";

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
          <ToastContainer position="top-right" />
          <div className="wrapper">
            <MainMenu></MainMenu>
            <div id="content">
              <MainHeader
                collapsed={collapsed}
                menuClick={menuClick}
                setCollapsed={setCollapsed}
                user={user}
              />
              <div id="routes-content">
                <Routes changeUser={changeUser} />
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="media-container-row align-center ">
              <p className="mbr-text mb-0 mbr-fonts-style display-7 text-center bg-dark text-white ">
                Copyright © 2020 - ΕΣΤΙΑ City Services
              </p>
            </div>
          </div>
        </Router>
      </Suspense>
    </ReactQueryConfigProvider>
  );
}

export default App;
