import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => { // <--- This is your component
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
      <form className="space-y-5">
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  </div>

  );
};



export default HomePage;