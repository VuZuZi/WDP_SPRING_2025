import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");

  //     console.log("🔹 Token từ localStorage:", token);

  //     if (!token) {
  //       setUser(null);
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // Gửi token lên server để xác minh
  //       const verifyResponse = await axios.post(
  //         "http://localhost:4000/api/auth/verify",
  //         {}, // Body rỗng
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       console.log("✅ Phản hồi xác minh:", verifyResponse.data);

  //       if (verifyResponse.data.success && verifyResponse.data.user) {
  //         // Nếu token hợp lệ, lấy hồ sơ người dùng đầy đủ
  //         try {
  //           const profileResponse = await axios.get(
  //             "http://localhost:4000/api/user/profile",
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           );

  //           console.log("✅ Phản hồi hồ sơ:", profileResponse.data);
  //           setUser(profileResponse.data); // Lưu hồ sơ đầy đủ vào state
  //         } catch (profileError) {
  //           console.error("⚠️ Lỗi khi lấy hồ sơ người dùng:", profileError);
  //           setUser(verifyResponse.data.user); // Sử dụng dữ liệu từ verify làm dự phòng
  //         }
  //       } else {
  //         console.log("⚠️ Token không hợp lệ, nhưng không xóa ngay.");
  //       }
  //     } catch (error) {
  //       console.error("❌ Lỗi khi xác minh token:", error);

  //       // Kiểm tra nếu lỗi là 401 (Unauthorized) thì mới xóa token
  //       if (error.response && error.response.status === 401) {
  //         console.log("❌ Token hết hạn! Xóa token khỏi localStorage.");
  //         localStorage.removeItem("token");
  //         setUser(null);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   verifyUser();
  // }, []);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token }); // Giữ trạng thái user đơn giản, có thể mở rộng sau
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    console.log("🔹 Đang lưu token:", token);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", userData.name);
    setUser({ token });
  };

  const logout = () => {
    console.log("🔹 Đăng xuất, xóa token khỏi localStorage.");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {!loading ? children : <div>Đang tải...</div>}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
