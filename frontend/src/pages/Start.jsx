import React from 'react';
import { useNavigate } from 'react-router-dom';
import startupage from '../assets/images/startupage.jpg'

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), url(${startupage})`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="p-20 border border-gray-100/20 shadow-2xl rounded-4xl mx-auto my-10 bg-white/10 max-w-md text-center backdrop-blur-md animate-slide-in">
        <h1 className="text-indigo-900 mb-2 text-4xl font-extrabold tracking-tight drop-shadow-lg">
          Athinemmusic
        </h1>
        <h3 className="text-green-700 mb-8 font-medium text-2xl italic animate-slide-in-slow">
          Create.Connect.Conquer
        </h3>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          <span className="hover:inline-block animate-bounce">Get Started</span>
        </button>
      </div>
    </div>
  );
};

export default GetStartedPage;
