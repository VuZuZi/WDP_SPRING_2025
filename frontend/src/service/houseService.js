import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getHouseByUser = async () => {
  try {
    // Retrieve token from localStorage or fallback to static token
    const token = localStorage.getItem("token");

    // If no token is found, throw an error before making the request
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    const response = await axios.get(`${API_URL}/house`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
