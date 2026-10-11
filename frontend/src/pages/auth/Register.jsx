import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <main className="auth-page">
      <div className="form-container">
        <p className="eyebrow">NEW CUSTOMER</p>
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit} className="app-form">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button className="primary-button" type="submit">
            Register
          </button>
        </form>

        <p className="form-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;