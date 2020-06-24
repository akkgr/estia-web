import React from "react";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
const MainMenu = () => {
  // let location = useLocation();
  return (
    <div>
      <nav id="sidebar">
        <div className="sidebar-header">
          <h4>ΕΣΤΙΑ City Services</h4>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to={`/dashboard`}>
              <MdDashboard />
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
