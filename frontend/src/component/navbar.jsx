import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Đảm bảo tạo file CSS này
const Navbar = ({ role }) => {
  // Lấy role từ localStorage (hoặc từ Context, Redux)
  console.log("Role:", role);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <span className="text-black">List</span>
          <span className="text-red">ROOM RENT</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/room">ROOM</Link>
        {(role === "customer" || role === undefined) && (
          <>
            <Link to="#">EXPLORE</Link>
            <Link to="#">REVIEW</Link>
            <Link to="#">BLOG</Link>
            <Link to="#">CONTACT</Link>
          </>
        )}

        {/* Nếu là HOST */}
        {role === "host" && (
          <>
            <Link to="/my-rooms">MY ROOMS</Link>
            <Link to="/add-room">MANAGER ROOM</Link>
            <Link to="/add-room">REVIEW ROOM</Link>

          </>
        )}

        {/* Nếu là ADMIN */}
        {role === "admin" && (
          <>
            <Link to="/dashboard">DASHBOARD</Link>
            <Link to="/manage-users">MANAGE USERS</Link>
            <Link to="/manage-rooms">MANAGE ROOMS</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
