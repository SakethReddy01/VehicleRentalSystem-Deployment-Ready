import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password
      });

      const user = response.data;

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your backend.");
    }
  };

  return (
    <main className="auth-page">
      <div className="form-container">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="app-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;