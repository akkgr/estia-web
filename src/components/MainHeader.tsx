import PropTypes from "prop-types";
import React , {  useContext } from "react";
import { Layout, Menu } from "antd";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   LogoutOutlined,
//   LoginOutlined,
// } from "@ant-design/icons";
import { FiMenu ,FiLogIn, FiLogOut } from 'react-icons/fi'
import UserContext from "UserContext";

// const { Header } = Layout;
// const { SubMenu } = Menu;

function MainHeader(props: any) {
  const manager = useContext(UserContext);

  return (
    // <Header className="site-layout-background" style={{ padding: 0 }}>
    //   {/* {React.createElement(
    //     props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    //     {
    //       className: "trigger",
    //       onClick: () => props.setCollapsed(!props.collapsed),
    //     }
    //   )} */}
    //   <Menu mode="horizontal" onClick={props.menuClick}>
   
    //     <SubMenu
    //       style={{ float: "right" }}
    //       key="user"
    //       title={
    //         <span>
    //           {" "}
    //           <i className="fas fa-user"></i>
    //           <span>{props.user?.profile.name}</span>
    //         </span>
    //       }
    //     >
    //       {props.user ? (
    //         <Menu.Item key="logout">
    //           <LogoutOutlined />
    //           <span>Έξοδος</span>
    //         </Menu.Item>
    //       ) : (
    //         <Menu.Item key="login">
    //           <LoginOutlined />
    //           <span>Είσοδος</span>
    //         </Menu.Item>
    //       )}
    //     </SubMenu>
    //   </Menu>
    // </Header>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light d-flex justify-content-between">
          <ul className="navbar-nav mr-auto">
            <li>
              <button type="button" id="sidebarCollapse" className="btn btn-primary">
                  <FiMenu />
              </button>
            </li>
            </ul> 
               <a className="my-2 my-lg-0" style={{float:'right'}} aria-haspopup="true" aria-expanded="false">
              {props.user?.profile.name}
            </a>
          &nbsp;
            <div className="my-2 my-lg-0 " aria-labelledby="navbarDropdown" key="user" style={{float:'right'}}>
            {props.user ? (
                 <button type="button" className="btn btn-primary" onClick={() => manager.signoutRedirect()} >
                   <FiLogOut /></button>
                 ) : (
                  <button type="button" className="btn btn-primary" onClick={() => manager.signinRedirect()} ><FiLogIn/></button>
                  )}
            </div>
      </nav>
    </div>
  );
}

MainHeader.propTypes = {
  collapsed: PropTypes.any,
  menuClick: PropTypes.any,
  setCollapsed: PropTypes.func,
  user: PropTypes.any,
};

export default MainHeader;
