import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

function MyBookings() {
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { /* Handle an invalid saved session. */ }
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.id) loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <p className="eyebrow">CUSTOMER</p>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings found</h3>
          <p>Your booking history will appear here.</p>
        </div>
      ) : (
        <div className="list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h3>Booking #{booking.id}</h3>
              <p>Vehicle ID: {booking.vehicleId}</p>
              <p>Start: {booking.startDate}</p>
              <p>End: {booking.endDate}</p>
              <p>Total: ₹{booking.totalAmount}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;
