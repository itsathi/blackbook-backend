// filepath: /path/to/your/frontend/components/ShowAllBeats.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <--- IMPORT useNavigate
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Remove useAudioPlayer import if you are purely using per-card players and no global player
// import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const ShowAllBeats = () => {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <--- INITIALIZE useNavigate

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/products/beats');
        setBeats(response.data);
      } catch (err) {
        console.error('Error fetching beats:', err);
        setError('Failed to load beats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  const handleBuyNow = (beatId) => { // <--- Changed to take beatId
    // Redirect to the dynamic beat detail page
    navigate(`/beats/${beatId}`);
    // console.log(`Attempting to navigate to detail for beat ID: ${beatId}`); // For debugging
  };

  if (loading) {
    return <div className="container mx-auto my-8 p-5 font-sans">Loading beats...</div>;
  }

  if (error) {
    return <div className="container mx-auto my-8 p-5 text-red-500 font-sans">Error: {error}</div>;
  }

  if (beats.length === 0) {
    return <div className="container mx-auto my-8 p-5 font-sans">No beats available yet.</div>;
  }

  return (
    <div className="container mx-auto my-8 p-5 font-sans">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Our Beats</h2>
      <div className="flex flex-row overflow-x-auto gap-6 pb-4">
        {beats.map(beat => (
          <div
            key={beat._id}
            className="flex-none w-72 border border-gray-200 rounded-lg p-4 text-center shadow-md flex flex-col justify-between transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <img
              src={`http://localhost:4000/${beat.coverImage}`}
              alt={beat.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold my-2 text-gray-700 min-h-[3rem] overflow-hidden text-ellipsis">
              {beat.name}
            </h3>
            <p className="text-lg font-bold text-blue-600 mb-2">
              ${beat.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {beat.description}
            </p>

            {/* Per-Card Audio Player (Option A) */}
            <div className="mb-4 mt-2">
              <AudioPlayer
                src={`http://localhost:4000/${beat.fileUrl}`}
                onPlay={() => console.log('Playing:', beat.name)}
                onPause={() => console.log('Paused:', beat.name)}
              />
            </div>

            <button
              onClick={() => handleBuyNow(beat._id)} // <--- Pass beat._id to the handler
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

export default ShowAllBeats;