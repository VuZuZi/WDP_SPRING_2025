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
        console.error(
          "API Error:",
          error.response ? error.response.data : error
        );
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

    // Check if there are any changes
    if (
      updatedUser.name === user.name &&
      updatedUser.email === user.email &&
      updatedUser.phone === user.phone &&
      !updatedUser.profileImage
    ) {
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
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedUser({ ...user });
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-8">
            <h2 className="text-3xl font-bold text-white text-center">
              User Profile
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 border-l-4 border-red-600 my-4 mx-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Image Section */}
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative group">
                {imagePreview || updatedUser.profileImage ? (
                  <div className="relative">
                    <img
                      src={imagePreview || updatedUser.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-200"
                    />
                    {isEditing && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                        onClick={() =>
                          document.getElementById("profileImage").click()
                        }
                      >
                        <span className="text-white text-sm font-medium">
                          Change Photo
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-teal-200"
                    onClick={() =>
                      isEditing &&
                      document.getElementById("profileImage").click()
                    }
                  >
                    <span className="text-4xl text-gray-400">
                      {updatedUser.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                        <span className="text-white text-sm font-medium">
                          Add Photo
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="flex-1 w-full space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={updatedUser.name || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      required
                    />
                  ) : (
                    <p className="text-lg font-medium">
                      {updatedUser.name || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={updatedUser.email || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="text-lg">
                      {updatedUser.email || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={updatedUser.phone || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="text-lg">
                      {updatedUser.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              {isEditing ? (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>

          {/* Footer Links */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
            <Link
              to="/change-password"
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              Đổi Mật Khẩu
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 font-medium mt-2 sm:mt-0"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
