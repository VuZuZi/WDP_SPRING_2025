import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để chuyển trang
import logowelcome from "../home/welcome-hero/banner.jpg";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Thay thế history.push bằng useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", userData);

      if (response.data.success) {
        // Đăng ký thành công, lưu token vào localStorage
        localStorage.setItem("token", response.data.token);
        console.log("Đăng ký thành công:", response.data);

        // Chuyển hướng đến trang đăng nhập
        navigate("/login");
      } else {
        setError(response.data.error || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err.response ? err.response.data : err);
      setError(err.response ? err.response.data.error : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Background Image */}
      <img src={logowelcome} alt="Background" className="background-image" />
      <div className="overlay"></div>

      {/* Login Form */}
      <div className="form-container">
        <h2 className="title-heading">ROOM RENTAL SYSTEM</h2>
        <h3 className="title-subheading">Đăng Ký</h3>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Tên</label>
            <div className="input-icon">
              <FaUser className="icon" />
              <input
                type="text"
                id="name"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-icon">
              <FaLock className="icon" />
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng Ký"}
          </button>
        </form>

        <p className="register-footer">
          Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
