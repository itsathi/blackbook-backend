// filepath: /path/to/your/frontend/components/ShowAllPacks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <--- IMPORT useNavigate

const ShowAllPacks = () => {
  const [samplePacks, setSamplePacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <--- INITIALIZE useNavigate

  useEffect(() => {
    const fetchSamplePacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/products/samplepacks');
        setSamplePacks(response.data);
      } catch (err) {
        console.error('Error fetching sample packs:', err);
        setError('Failed to load sample packs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSamplePacks();
  }, []);

  const handleBuyNow = (packId) => { // <--- Changed to take packId
    // Redirect to the dynamic pack detail page
    navigate(`/packs/${packId}`);
    // console.log(`Attempting to navigate to detail for pack ID: ${packId}`); // For debugging
  };

  if (loading) {
    return <div className="container mx-auto my-8 p-5 font-sans">Loading sample packs...</div>;
  }

  if (error) {
    return <div className="container mx-auto my-8 p-5 text-red-500 font-sans">Error: {error}</div>;
  }

  if (samplePacks.length === 0) {
    return <div className="container mx-auto my-8 p-5 font-sans">No sample packs available yet.</div>;
  }

  return (
    <div className="container mx-auto my-8 p-5 font-sans">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Our Sample Packs</h2>
      {/* Horizontal Layout Container - same as ShowAllBeats */}
      <div className="flex flex-row overflow-x-auto gap-6 pb-4">
        {samplePacks.map(pack => (
          <div key={pack._id}
               className="flex-none w-72 border border-gray-200 rounded-lg p-4 text-center shadow-md flex flex-col justify-between transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <img
              src={`http://localhost:4000/${pack.coverImage}`}
              alt={pack.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold my-2 text-gray-700 min-h-[3rem] overflow-hidden text-ellipsis">
              {pack.name}
            </h3>
            <p className="text-lg font-bold text-blue-600 mb-2">
              ${pack.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {pack.description}
            </p>
            {/* No audio player for packs, as it's a zip file */}
            <button
              onClick={() => handleBuyNow(pack._id)} // <--- Pass pack._id to the handler
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 ease-in-out mt-auto"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllPacks;