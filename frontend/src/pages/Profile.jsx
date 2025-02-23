import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpdatedUser(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error);
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    if (!user) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files.length > 0) {
      const file = files[0];
      setUpdatedUser((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUpdatedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem có thay đổi gì không
    if (updatedUser.name === user.name && updatedUser.email === user.email && updatedUser.phone === user.phone && !updatedUser.profileImage) {
      alert("No changes made to the profile!");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    formData.append("phone", updatedUser.phone);

    if (updatedUser.profileImage instanceof File) {
      formData.append("profileImage", updatedUser.profileImage);
    }

    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUpdatedUser(res.data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile");
      console.error("Error updating profile:", error.response ? error.response.data : error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedUser({ ...user });
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
            <div className="mb-4 flex items-center">
              <div className="mr-6">
                {updatedUser.profileImage && !isEditing ? (
                  <img
                    src={imagePreview || updatedUser.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleChange}
                    className="hidden"
                  />
                )}
              </div>

              <div className="flex flex-col w-full">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={updatedUser.name || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  ) : (
                    <p>{updatedUser.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={updatedUser.email || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  ) : (
                    <p>{updatedUser.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={updatedUser.phone || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  ) : (
                    <p>{updatedUser.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6 flex justify-between">
              {isEditing ? (
                <div className="flex space-x-4 w-full">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-lg"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </form>

          <Link to="/change-password" className="text-blue-500 hover:underline">
            Đổi Mật Khẩu
          </Link>

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
