import { Link, Outlet } from "react-router-dom";
import "./host_page.css";

const HostLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/host/room" className="sidebar-link">
              Rooms
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content - Thêm class main-content */}
      <div className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HostLayout;
