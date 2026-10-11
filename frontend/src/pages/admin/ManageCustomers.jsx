import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await api.get("/users");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load customers.");
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/users/${id}`);
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete customer.");
    }
  };

  return (
    <main className="container">
      <p className="eyebrow">ADMIN</p>
      <h1>Manage Customers</h1>

      {customers.length === 0 ? (
        <div className="empty-state">
          <p>No customers found.</p>
        </div>
      ) : (
        <div className="list">
          {customers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <h3>{customer.name}</h3>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>Role: {customer.role}</p>

              {customer.role !== "ADMIN" && (
                <button
                  className="delete-button"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageCustomers;