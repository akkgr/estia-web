import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { Menu } from "antd";
// import { HomeOutlined, DashboardOutlined } from "@ant-design/icons";
import {FaRegBuilding} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'

const MainMenu = () => {
  // let location = useLocation();

  return (
    // <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
    //   <Menu.Item key="/dashboard">
    //     <Link to={`/dashboard`}>
    //       <DashboardOutlined />
    //       <span>Dashboard</span>
    //     </Link>
    //   </Menu.Item>
    //   <Menu.Item key="/buildings">
    //     <Link to={`/buildings`}>
    //       <HomeOutlined />
    //       <span>Κτίρια</span>
    //     </Link>
    //   </Menu.Item>
    // </Menu>
    <div>
      <nav id="sidebar">
            <div className="sidebar-header">
                  <h4>ΕΣΤΙΑ City Services</h4>
              </div>
              <ul className="list-unstyled components">
                  <li>
                    <Link to={`/dashboard`}>
                      <MdDashboard/>
                      &nbsp;
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/buildings`}>
                      <FaRegBuilding />
                      &nbsp;
                      <span>Κτίρια</span>
                    </Link>
                  </li>
              </ul>
            </nav>
    </div>
  );
};

export default MainMenu;
