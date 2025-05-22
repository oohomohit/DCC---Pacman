import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import useAppNavigation from "../src/components/Navigation";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enroll, setEnroll] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { goToLogin } = useAppNavigation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/start");
    }
  }, [navigate]);

  function validatePassword(pw) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userName || !email || !password || !enroll || !phone) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must contain at least 8 characters, including uppercase, lowercase, number and special character");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/v1/users/register", {
        userName,
        email,
        password,
        enroll,
        phone
      }, {
        headers: { "Content-Type": "application/json" }
      });
      
      setSuccess("Registration successful! Redirecting to login...");
      
      // Enhanced navigation with fallbacks
      setTimeout(() => {
        try {
          // Primary method: React Router navigation
          navigate("/");
          
          // Backup method after a delay
          setTimeout(() => {
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
          }, 100);
        } catch (error) {
          console.error("Navigation error:", error);
          // Final fallback
          window.location.href = "/";
        }
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="login-card">
        <div className="row">
          <div className="col-md-6 col-lg-5 d-none d-md-block">
            <img
              src="https://imgs.search.brave.com/bgkyyiKg8U7hQzORqygYvLImsJ3AZ1hVtwRZg-nYjvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvcGFjbWFuL3Nt/YWxsL3BhY21hbl9Q/Tkc5OC5wbmc"
              alt="pacman"
              className="login-image"
            />
          </div>
          <div className="col-md-6 col-lg-7 d-flex align-items-center">
            <div className="form-container">
              <h5 className="login-heading">Create Your Account</h5>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Choose a username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                  <small className="form-text text-muted">
                    Password must be at least 8 characters long and include uppercase, lowercase, number and special character
                  </small>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="enrollment">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    id="enrollment"
                    className="form-control"
                    value={enroll}
                    onChange={(e) => setEnroll(e.target.value.toUpperCase())}
                    placeholder="Enter enrollment number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="button-primary">
                    Register
                  </button>
                </div>

                <div className="text-center mt-5">
                  <div className="login-container">
                    <p className="login-text">Already have an account?</p>
                    <button 
                      type="button"
                      onClick={goToLogin} 
                      className="login-button-standalone"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 