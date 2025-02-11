import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để chuyển trang

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
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacifico text-4xl text-white font-bold">
        Employee Management System
      </h2>
      <h2 className="text-white">Đăng Ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-white">Tên</label>
          <input
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-white">
          Đã có tài khoản? <a href="/login" className="text-teal-400">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
