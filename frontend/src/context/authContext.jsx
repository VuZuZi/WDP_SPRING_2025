import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Thêm import PropTypes

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state for handling failures
useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
    };

    fetchUser();
  }, []);
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("http://localhost:4000/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.success && response.data.user) {
                        setUser(response.data.user); // Lưu thông tin người dùng vào state
                    } else {
                        setUser(null); // Clear user data if the response is invalid
                    }
                } else {
                    setUser(null); // Clear user data if no token is found
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                setUser(null); // Clear user data on error
                setError("Failed to verify user. Please try again.");
            } finally {
                setLoading(false); // Set loading to false when finished
            }
        };

        verifyUser();
    }, []);

    const login = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token); // Save token in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token"); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {!loading ? children : <div>Loading...</div>} {/* Only render children when not loading */}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate the children prop type
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;