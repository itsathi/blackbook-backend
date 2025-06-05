import React, { useState } from "react";

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate successful signup
    setSuccess("Sign up successful!");
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="new-password"
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 12 }}>{success}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4 }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;