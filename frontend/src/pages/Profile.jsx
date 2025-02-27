import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

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
      setUpdatedUser((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">User Profile</div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <div className="profile-image-container">
            <img
              src={imagePreview || updatedUser.profileImage}
              alt="Profile"
              className="profile-image"
            />
            {isEditing && (
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
              />
            )}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={updatedUser.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div className="profile-buttons">
              {isEditing ? (
                <>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="profile-footer">
          <Link to="/change-password">Change Password</Link> |{" "}
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
