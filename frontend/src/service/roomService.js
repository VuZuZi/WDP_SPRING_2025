import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRoomsByFilter = async (params) => {
  try {
    // Retrieve token from localStorage or fallback to static token
    const token = localStorage.getItem("token");

    // If no token is found, throw an error before making the request
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    const response = await axios.get(`${API_URL}/rooms`, {
      params,
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

export const createRoom = async (roomData) => {
  try {
    // Retrieve token from localStorage or fallback to static token
    const token = localStorage.getItem("token");

    // If no token is found, throw an error before making the request
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    const res = await axios.post(`${API_URL}/rooms/create`, roomData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    // Retrieve token from localStorage or fallback to static token
    const token = localStorage.getItem("token");

    // If no token is found, throw an error before making the request
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    console.log("check id: ", roomData);

    await axios.put(`${API_URL}/rooms/update/${id}`, roomData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteRoomById = async (roomData) => {
  try {
    // Retrieve token from localStorage or fallback to static token
    const token = localStorage.getItem("token");

    // If no token is found, throw an error before making the request
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    await axios.delete(`${API_URL}/rooms/delete/${roomData._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: true, message: error.message };
  }
};
