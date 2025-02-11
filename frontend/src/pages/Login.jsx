import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logowelcome from "../home/welcome-hero/banner.jpg";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
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

      {/* Login Form */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      <h2 className="title-heading">ROOM RENTAL SYSTEM</h2>
      <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <i><FaEnvelope /></i>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <i><FaLock /></i>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
    </div>
    </div>
    );
};

export default Login;
