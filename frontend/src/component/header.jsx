import React from "react";
import { Link } from "react-router-dom";
import "./header.css"; // Đảm bảo tạo file CSS này

function Header({ user, name, logout }) {
  return (
    <header id="header-top" className="header-area">
      <div className="header-container">
        <div className="header-row">
          <div className="header-left-section">
            <div className="language-currency-section">
              <div className="select-container">
                <select
                  name="language"
                  id="language"
                  className="language-select"
                >
                  <option value="default">EN</option>
                  <option value="Bangla">BN</option>
                  <option value="Arabic">AB</option>
                </select>
                <div className="dropdown-arrow">
                  <svg
                    className="dropdown-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="select-container">
                <select
                  name="currency"
                  id="currency"
                  className="currency-select"
                >
                  <option value="usd">USD</option>
                  <option value="euro">Euro</option>
                  <option value="bdt">BDT</option>
                </select>
                <div className="dropdown-arrow">
                  <svg
                    className="dropdown-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="search-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="header-right-section">
            <div className="user-controls">
              <div className="contact-info">+84 0908 290 345</div>

              {user ? (
                <div className="user-logged-in">
                  <div className="welcome-message">Hello {name}</div>
                  <Link to="/profile" className="profile-link">
                    My Profile
                  </Link>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="user-guest">
                  <Link to="/login" className="login-link">
                    Sign In
                  </Link>
                  <Link to="/register" className="register-btn">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
