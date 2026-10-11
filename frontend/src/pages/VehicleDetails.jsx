import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [booking, setBooking] = useState(false);
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { /* Handle an invalid saved session. */ }

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async () => {
    if (!user?.id) { navigate("/login"); return; }
    setBooking(true); setBookingMessage("");
    try {
      await api.post("/bookings", { userId: user.id, vehicleId: vehicle.id, startDate, endDate });
      setBookingMessage("Booking request sent. You can follow its status in My Bookings.");
    } catch (error) {
      setBookingMessage(error.response?.data?.message || "Unable to submit your booking. Please try again.");
    } finally { setBooking(false); }
  };

  if (loading) {
    return <main className="container"><p>Loading...</p></main>;
  }

  if (!vehicle) {
    return (
      <main className="container">
        <h2>Vehicle not found</h2>
        <button onClick={() => navigate("/vehicles")}>Back to Vehicles</button>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="details-card">
        {vehicle.imageUrl && (
          <img
            className="details-image"
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
          />
        )}

        <div>
          <p className="eyebrow">VEHICLE DETAILS</p>
          <h1>{vehicle.brand} {vehicle.model}</h1>

          <p><strong>Vehicle Number:</strong> {vehicle.vehicleNumber}</p>
          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
          <p><strong>Seats:</strong> {vehicle.seats}</p>
          <p><strong>Price:</strong> ₹{vehicle.pricePerDay}/day</p>
          <p><strong>Status:</strong> {vehicle.status}</p>

          <div className="button-row">
            <button className="secondary-button" onClick={() => navigate("/vehicles")}>
              Back
            </button>
            {user?.role !== "ADMIN" && vehicle.status === "AVAILABLE" && <>
              <label htmlFor="rental-start">Pickup date</label>
              <input id="rental-start" type="date" value={startDate} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setStartDate(event.target.value)} />
              <label htmlFor="rental-end">Return date</label>
              <input id="rental-end" type="date" value={endDate} min={startDate || new Date().toISOString().slice(0, 10)} onChange={(event) => setEndDate(event.target.value)} />
              <button className="primary-button" disabled={!startDate || !endDate || booking} onClick={createBooking}>{booking ? "Sending…" : "Request booking"}</button>
            </>}
          </div>
          {bookingMessage && <p className="status-message" role="status">{bookingMessage}</p>}
        </div>
      </div>
    </main>
  );
}

export default VehicleDetails;
