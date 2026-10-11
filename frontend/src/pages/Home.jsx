import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="hero">
      <div className="hero-content">
        <p className="eyebrow">SMART • SIMPLE • FAST</p>
        <h1>Vehicle Rental System</h1>
        <p>
          Find a vehicle, check its availability, and manage your rental
          from one simple application.
        </p>

        <button className="primary-button" onClick={() => navigate("/vehicles")}>
          Browse Vehicles
        </button>
      </div>
    </main>
  );
}

export default Home;