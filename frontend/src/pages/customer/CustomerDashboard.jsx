import React from "react";
import { Link } from "react-router-dom";

function CustomerDashboard() {
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { /* Handle an invalid saved session. */ }

  return (
    <main className="container">
      <p className="eyebrow">CUSTOMER</p>
      <h1>Welcome, {user?.name || "Customer"}</h1>

      <div className="dashboard-grid">
        <Link className="dashboard-card" to="/vehicles">
          <span>🚗</span>
          <h3>Browse Vehicles</h3>
          <p>View available vehicles and their details.</p>
        </Link>

        <Link className="dashboard-card" to="/customer/bookings">
          <span>📋</span>
          <h3>My Bookings</h3>
          <p>View your current and previous bookings.</p>
        </Link>

        <Link className="dashboard-card" to="/customer/profile">
          <span>👤</span>
          <h3>My Profile</h3>
          <p>View your account information.</p>
        </Link>
      </div>
    </main>
  );
}

export default CustomerDashboard;
