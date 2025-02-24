import axios from "axios";
import PropTypes from "prop-types"; // Thêm import PropTypes
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Kiểm tra và lấy thông tin user từ API profile
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:4000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (error) {
                console.error("🚨 Lỗi khi lấy thông tin user:", error?.response?.data || error.message);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    // ✅ Xác minh người dùng từ API
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:4000/api/auth/verify", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data?.success && response.data?.user) {
                    setUser(response.data.user);
                } else {
                    console.warn("⚠️ Phản hồi API verify không hợp lệ:", response.data);
                    setUser(null);
                }
            } catch (error) {
                console.error("🚨 Lỗi xác minh user:", error?.response?.data || error.message);
                setUser(null);
                setError("Xác minh thất bại, vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    // ✅ Hàm đăng nhập
    const login = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token);
    };

    // ✅ Hàm đăng xuất
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {!loading ? children : <div>🔄 Đang tải...</div>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
