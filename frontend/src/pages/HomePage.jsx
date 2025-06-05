import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="p-10 border border-gray-200 rounded-xl mx-auto my-10 bg-blue-50 max-w-md text-center">
      <h1 className="text-indigo-900 mb-2 text-3xl font-bold">athinemmusic</h1>
      <h3 className="text-green-700 mb-8 font-normal text-xl">
        create.connect.cinquer
      </h3>
      <button
        onClick={handleGetStarted}
        className="px-8 py-3 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-800 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default GetStartedPage;
