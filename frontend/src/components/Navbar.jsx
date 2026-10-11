import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { /* Handle an invalid saved session. */ }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Vehicle Rental
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/vehicles">Vehicles</Link>

        {user?.role === "CUSTOMER" && (
          <>
            <Link to="/customer">Dashboard</Link>
            <Link to="/customer/bookings">My Bookings</Link>
            <Link to="/customer/profile">Profile</Link>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/vehicles">Vehicles</Link>
            <Link to="/admin/customers">Customers</Link>
            <Link to="/admin/bookings">Bookings</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="nav-logout" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
