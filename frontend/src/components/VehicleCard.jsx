import React from "react";
function VehicleCard({ vehicle, onEdit, onDelete, onView, isAdmin = false }) {
  return (
    <div className="vehicle-card">
      {vehicle.imageUrl && (
        <img
          className="vehicle-image"
          src={vehicle.imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
        />
      )}

      <div className="vehicle-card-body">
        <h2>{vehicle.brand} {vehicle.model}</h2>

        <p><strong>Vehicle No:</strong> {vehicle.vehicleNumber}</p>
        <p><strong>Type:</strong> {vehicle.type}</p>
        <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
        <p><strong>Seats:</strong> {vehicle.seats}</p>
        <p><strong>Price:</strong> ₹{vehicle.pricePerDay}/day</p>
        <p><strong>Status:</strong> {vehicle.status}</p>

        <div className="button-row">
          <button onClick={() => onView(vehicle.id)}>View</button>
          {isAdmin && <button className="edit-button" onClick={() => onEdit(vehicle)}>Edit</button>}
          {isAdmin && <button className="delete-button" onClick={() => onDelete(vehicle.id)}>Delete</button>}
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
