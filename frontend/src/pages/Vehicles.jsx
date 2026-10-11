import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import VehicleForm from "../components/VehicleForm";

function Vehicles() {
  const user = (() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } })();
  const isAdmin = user?.role === "ADMIN";
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await api.get("/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load vehicles. Is Spring Boot running?");
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await api.delete(`/vehicles/${id}`);
      await loadVehicles();
    } catch (error) {
      console.error(error);
      alert("Unable to delete vehicle.");
    }
  };

  const handleAdd = () => {
    setSelectedVehicle(null);
    setShowForm(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  const handleView = (id) => {
    navigate(`/vehicles/${id}`);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedVehicle(null);
    loadVehicles();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedVehicle(null);
  };

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <p className="eyebrow">FLEET</p>
          <h1>Vehicles</h1>
        </div>

        {isAdmin && !showForm && (
          <button className="primary-button" onClick={handleAdd}>
            + Add Vehicle
          </button>
        )}
      </div>

      {showForm && (
        <VehicleForm
          vehicle={selectedVehicle}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {!showForm && (
        <div className="vehicle-grid">
          {vehicles.length === 0 ? (
            <div className="empty-state">
              <h3>No vehicles found</h3>
              <p>Add your first vehicle to the system.</p>
            </div>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={handleEdit}
                onDelete={deleteVehicle}
                onView={handleView}
                isAdmin={isAdmin}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default Vehicles;
