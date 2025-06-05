import React, { useState } from "react";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual admin credentials check or API call
    if (form.username === "admin" && form.password === "admin123") {
      // Redirect or set admin session here
      alert("Login successful!");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;