import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to update booking.");
    }
  };

  return (
    <main className="container">
      <p className="eyebrow">ADMIN</p>
      <h1>Manage Bookings</h1>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h3>Booking #{booking.id}</h3>
              <p>User ID: {booking.userId}</p>
              <p>Vehicle ID: {booking.vehicleId}</p>
              <p>Start: {booking.startDate}</p>
              <p>End: {booking.endDate}</p>
              <p>Total: ₹{booking.totalAmount}</p>
              <p>Status: {booking.status}</p>

              <div className="button-row">
                <button
                  className="primary-button"
                  onClick={() => updateStatus(booking.id, "APPROVED")}
                >
                  Approve
                </button>

                <button
                  className="delete-button"
                  onClick={() => updateStatus(booking.id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageBookings;