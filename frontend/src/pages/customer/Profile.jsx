import React from "react";
import { useState } from "react";
import api from "../../services/api";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function Profile() {
  const [user, setUser] = useState(getStoredUser);
  const [formData, setFormData] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: ""
  }));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?.id) {
      setMessage("Please sign in again before editing your profile.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const payload = { name: formData.name.trim(), email: formData.email.trim(), phone: formData.phone.trim() };
      if (formData.password) payload.password = formData.password;
      const response = await api.put(`/users/${user.id}`, payload);
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setFormData((current) => ({ ...current, ...payload, password: "" }));
      setMessage("Your profile has been updated.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update your profile. Please check your details and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <main className="container narrow"><h1>My Profile</h1><p>Please sign in to view your profile.</p></main>;
  }

  return (
    <main className="container narrow">
      <p className="eyebrow">ACCOUNT</p>
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Account type:</strong> {user.role}</p>
        <form onSubmit={handleSubmit} className="app-form">
          <label htmlFor="profile-name">Full name</label>
          <input id="profile-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required maxLength="100" />
          <label htmlFor="profile-email">Email address</label>
          <input id="profile-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required maxLength="150" />
          <label htmlFor="profile-phone">Phone number</label>
          <input id="profile-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} required maxLength="20" />
          <label htmlFor="profile-password">New password <span className="muted">(leave blank to keep current)</span></label>
          <input id="profile-password" name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} minLength="6" />
          {message && <p className="status-message" role="status">{message}</p>}
          <button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
        </form>
      </div>
    </main>
  );
}

export default Profile;
