import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loginimg from "../assets/images/getstarted.jpg";
const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/auth/login`,
  { email, password }
);
      const { token } = res.data;
      localStorage.setItem("jwt", token);
      localStorage.setItem("userEmail", email); 
      window.location.href = "/home";
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), url(${loginimg})`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl p-6 bg-white/10 backdrop-blur-md rounded-4xl shadow-lg animate-fade-in gap-6">
        <div className="p-10 border border-gray-100/20 shadow-2xl rounded-4xl bg-white/10 max-w-md text-center backdrop-blur-md animate-slide-in w-full">
          <h1 className="text-indigo-900 mb-2 text-4xl font-extrabold tracking-tight drop-shadow-lg text-center">
            Athinemmusic
          </h1>
          <h3 className="text-green-700 mb-8 font-medium text-2xl italic text-center animate-slide-in-slow">
            Create.Connect.Conquer
          </h3>
        </div>
        <div className="bg-gradient-to-bl from-gray-700/25 to-purple-800/40 p-8 rounded-4xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
