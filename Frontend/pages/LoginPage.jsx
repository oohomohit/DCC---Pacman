import React, { useEffect, useState } from "react";
// import { useGame } from "../src/contexts/GameContext"; // Removed as not directly used for login fields
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import useAppNavigation from "../src/components/Navigation";

function LoginPage() {
  // const { userName, setUserName, enroll, setEnroll, phone, setPhone } = useGame(); // Removed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { goToRegister } = useAppNavigation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/start");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (email.trim() === "" || password.trim() === "") {
      // alert("Please fill all the fields"); // Replaced with setError
      setError("Email and Password are required.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        // { userName, enroll, phone }, // Changed to email and password
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      localStorage.setItem("token", res.data.data.accessToken);
      // Optionally, store user info in context or local storage if needed globally
      // For example: localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      navigate("/start");
    } catch (err) {
      console.error("Login failed:", err);
      // alert("Login failed. Please try again."); // Replaced with setError
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
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
              <form onSubmit={handleSubmit}>
                <h5 className="login-heading">Login to Play Game</h5>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="text-center mt-4">
                  <button className="button-primary" type="submit">
                    Login
                  </button>
                </div>

                <div className="text-center mt-5">
                  <div className="register-container">
                    <p className="register-text">Don't have an account?</p>
                    <button 
                      type="button"
                      onClick={goToRegister} 
                      className="register-button-standalone"
                    >
                      Register
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

export default LoginPage;
