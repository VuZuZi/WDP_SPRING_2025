import React, { useState } from "react";
import { FaLock, FaKey } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logowelcome from "../home/welcome-hero/banner.jpg";  // Background image

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận không khớp.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:4000/api/user/change-password",
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Đổi mật khẩu thành công!");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Lỗi khi đổi mật khẩu.");
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={logowelcome}
        alt="Background"
        className="w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Change Password Form */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h2 className="title-heading">ROOM RENTAL SYSTEM</h2>
        <div className="login-container">
          <h2 className="login-title">Đổi Mật Khẩu</h2>
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          {success && <p className="text-green-500 text-center font-semibold">{success}</p>}
          <form onSubmit={handleSubmit}>
            {/* Old Password Field */}
            <div className="input-group">
              <label htmlFor="oldPassword">Mật khẩu cũ</label>
              <i><FaKey /></i>
              <input
                type="password"
                id="oldPassword"
                placeholder="Nhập mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password Field */}
            <div className="input-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <i><FaLock /></i>
              <input
                type="password"
                id="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm New Password Field */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <i><FaLock /></i>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Change Password Button */}
            <button type="submit" className="login-button">
              Đổi Mật Khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
