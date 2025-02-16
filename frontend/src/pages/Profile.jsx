import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import{ useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUpdatedUser(res.data.user); // Cập nhật user từ API
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile");
        setLoading(false);
      }
    };
  
    if (!user) {
      navigate("/login");
    } else {
      fetchProfile(); // Gọi API để lấy dữ liệu
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "profileImage" && files.length > 0) {
    setUpdatedUser((prev) => ({
      ...prev,
      profileImage: files[0], // Lưu file vào state
    }));
    setImagePreview(URL.createObjectURL(files[0]));
  } else {
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", updatedUser.name);
      formData.append("email", updatedUser.email);
      formData.append("phone", updatedUser.phone);
      if (updatedUser.profileImage) {
        formData.append("profileImage", updatedUser.profileImage);
      }

      const res = await axios.put(
        "http://localhost:4000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Chỉ định kiểu dữ liệu là FormData
          },
        }
      );
      setUpdatedUser(res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile");
    }
  };

  return (
    <div className="container mx-auto p-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">User Profile</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedUser.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={updatedUser.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={updatedUser.phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="profileImage" className="block text-gray-700">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-lg"
              >
                Update Profile
              </button>
            </div>
          </form>

          <Link
  to="/"
  className="mt-4 text-teal-600 hover:text-teal-800"
>
  Home
</Link>

        </div>
      )}
    </div>
  );
};

export default Profile;
