import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MyBookings from "./pages/customer/MyBookings";
import Profile from "./pages/customer/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageVehicles from "./pages/admin/ManageVehicles";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageBookings from "./pages/admin/ManageBookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/customer" element={<ProtectedRoute role="CUSTOMER"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/bookings" element={<ProtectedRoute role="CUSTOMER"><MyBookings /></ProtectedRoute>} />
        <Route path="/customer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/vehicles" element={<ProtectedRoute role="ADMIN"><ManageVehicles /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute role="ADMIN"><ManageCustomers /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute role="ADMIN"><ManageBookings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
