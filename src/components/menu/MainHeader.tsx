import React, { useContext } from "react";
import { FiMenu, FiLogIn, FiLogOut } from "react-icons/fi";
import UserContext from "UserContext";

function MainHeader(props: any) {
  const manager = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light d-flex justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li>
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
            >
              <FiMenu />
            </button>
          </li>
        </ul>
        <div
          className="my-2 my-lg-0"
          style={{ float: "right" }}
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.user?.profile.name}
        </div>
        &nbsp;
        <div
          className="my-2 my-lg-0 "
          aria-labelledby="navbarDropdown"
          key="user"
          style={{ float: "right" }}
        >
          {props.user ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => manager.signoutRedirect()}
            >
              <FiLogOut />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => manager.signinRedirect()}
            >
              <FiLogIn />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default MainHeader;
