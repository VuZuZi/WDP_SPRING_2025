import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const authContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:4000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (response.data.success && response.data.user) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);  // In case the user data is missing or the response is unsuccessful
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);  // Ensure user is set to null if there's an error
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);  // Add dependency array to avoid infinite loop

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{user, login, logout, loading}}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);
export default authContext;
