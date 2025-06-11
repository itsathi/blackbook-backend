import React from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import HeroBackground from './assets/images/hero-bg.jpg'; // Make sure you have a suitable background image
import Releases from './pages/Releases';
import Beats from './pages/Beats';
import About from './pages/About';

function HomePage() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${HeroBackground})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-0 transition-opacity duration-500"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center p-6 sm:p-8 md:p-12 lg:p-16 bg-white bg-opacity-10 rounded-xl shadow-2xl border border-gray-700 transform scale-95 opacity-0 animate-scale-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-300">
          Welcome to Athinam Music
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-down delay-500">
          Dive into a world of vibrant sounds, creative beats, and compelling stories.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-700">
          <button
            onClick={() => handleNavigation('/releases')}
            className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold text-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Our Releases</span>
          </button>
          <button
            onClick={() => handleNavigation('/beats')}
            className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Explore Beats</span>
          </button>
          <button
            onClick={() => handleNavigation('/about')}
            className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold text-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">About Us</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
