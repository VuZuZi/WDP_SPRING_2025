import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    profileImage: false,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUpdatedUser(parsedUser);
          setImagePreview(parsedUser.profileImage);
        } else {
          const res = await axios.get("http://localhost:4000/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUpdatedUser(res.data.user);
          setImagePreview(res.data.user.profileImage);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error);
        setError("Error fetching profile");
      } finally {
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

  const handleEditField = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSaveChanges = async (field) => {
    try {
      const updatedUserCopy = { ...updatedUser };

      if (field === "profileImage") {
        const formData = new FormData();
        formData.append("profileImage", updatedUser.profileImage);

        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:4000/api/user/upload-avatar", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        updatedUserCopy.profileImage = res.data.imageUrl;
      }

      setUpdatedUser(updatedUserCopy);
      localStorage.setItem("user", JSON.stringify(updatedUserCopy));

      setIsEditing((prev) => ({
        ...prev,
        [field]: false,
      }));

      setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="profile-form">
          <h3>User Profile</h3>
          <hr />

          {/* Profile Image */}
          <div className="form-group">
            <div className="profile-image">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <p>No Profile Image</p>
              )}

              <button type="button" onClick={() => handleEditField("profileImage")} className="edit-btn">
                <FaPen />
              </button>

              {isEditing.profileImage && (
                <div>
                  <input type="file" name="profileImage" onChange={handleChange} className="form-control" />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover mt-2" />
                  )}
                  <button type="button" onClick={() => handleSaveChanges("profileImage")} className="btn btn-primary">
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            {isEditing.name ? (
              <div className="input-group">
                <input type="text" id="name" name="name" value={updatedUser.name || ""} onChange={handleChange} className="form-control" />
                <button type="button" onClick={() => handleSaveChanges("name")} className="btn btn-primary">
                  Save
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <p>{updatedUser.name}</p>
                <button type="button" onClick={() => handleEditField("name")} className="edit-btn">
                  <FaPen />
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <p>{updatedUser.email}</p>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            {isEditing.phone ? (
              <div className="input-group">
                <input type="text" id="phone" name="phone" value={updatedUser.phone || ""} onChange={handleChange} className="form-control" />
                <button type="button" onClick={() => handleSaveChanges("phone")} className="btn btn-primary">
                  Save
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <p>{updatedUser.phone}</p>
                <button type="button" onClick={() => handleEditField("phone")} className="edit-btn">
                  <FaPen />
                </button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Links */}
          <div className="form-group">
            <Link to="/change-password" className="btn btn-outline-warning btn-lg btn-block">
              Change Password
            </Link>
          </div>

          <div className="form-group">
            <Link to="/" className="btn btn-outline-primary btn-lg btn-block">
              Home
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
