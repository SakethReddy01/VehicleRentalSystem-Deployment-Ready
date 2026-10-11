import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <main className="container">
      <p className="eyebrow">ADMINISTRATION</p>
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        <Link className="dashboard-card" to="/admin/vehicles">
          <span>🚘</span>
          <h3>Manage Vehicles</h3>
          <p>Add, edit, view and delete vehicles.</p>
        </Link>

        <Link className="dashboard-card" to="/admin/customers">
          <span>👥</span>
          <h3>Manage Customers</h3>
          <p>View and manage registered customers.</p>
        </Link>

        <Link className="dashboard-card" to="/admin/bookings">
          <span>📑</span>
          <h3>Manage Bookings</h3>
          <p>Approve or reject rental bookings.</p>
        </Link>
      </div>
    </main>
  );
}

export default AdminDashboard;