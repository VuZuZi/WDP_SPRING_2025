import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import "./host_page.css";
import Header from "../component/header";
import { useAuth } from "../context/AuthContext";
const HostLayout = () => {
  const { user, logout } = useAuth();
  return (
    <div className="host-container">
      <Header user={user} name={user?.name} logout={logout} />
      <Navbar role={user.role} />
      <main className="host-main">
        <div className="host-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HostLayout;
