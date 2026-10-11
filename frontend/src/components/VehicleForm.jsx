import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

const emptyVehicle = {
  vehicleNumber: "",
  brand: "",
  model: "",
  type: "",
  pricePerDay: "",
  fuelType: "",
  seats: "",
  status: "AVAILABLE",
  imageUrl: ""
};

function VehicleForm({ vehicle, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(emptyVehicle);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicleNumber: vehicle.vehicleNumber ?? "",
        brand: vehicle.brand ?? "",
        model: vehicle.model ?? "",
        type: vehicle.type ?? "",
        pricePerDay: vehicle.pricePerDay ?? "",
        fuelType: vehicle.fuelType ?? "",
        seats: vehicle.seats ?? "",
        status: vehicle.status ?? "AVAILABLE",
        imageUrl: vehicle.imageUrl ?? ""
      });
    } else {
      setFormData(emptyVehicle);
    }
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (vehicle) {
        await api.put(`/vehicles/${vehicle.id}`, formData);
        alert("Vehicle updated successfully");
      } else {
        await api.post("/vehicles", formData);
        alert("Vehicle added successfully");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Unable to save vehicle. Check the backend and field names.");
    }
  };

  return (
    <div className="form-container">
      <h2>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>

      <form onSubmit={handleSubmit} className="app-form">
        <input name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} required />
        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
        <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
        <input name="type" placeholder="Vehicle Type" value={formData.type} onChange={handleChange} required />

        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />

        <input name="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleChange} required />

        <input
          type="number"
          name="seats"
          placeholder="Number of Seats"
          value={formData.seats}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="RENTED">RENTED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>

        <input name="imageUrl" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={handleChange} />

        <div className="button-row">
          <button className="primary-button" type="submit">
            {vehicle ? "Update Vehicle" : "Add Vehicle"}
          </button>

          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;