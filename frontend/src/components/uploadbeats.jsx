// filepath: /path/to/your/frontend/components/ShowAllBeats.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // This imports the default styles for the player

const ShowAllBeats = () => {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // This state is not strictly needed by react-h5-audio-player itself,
  // but it helps you know which player is currently active if you need that info elsewhere.
  const [currentPlayingBeatId, setCurrentPlayingBeatId] = useState(null);

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        setLoading(true);
        // Fetch all beats from your backend's dedicated beats endpoint
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
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleBuyNow = (product) => {
    // This is a placeholder for your "Add to Cart" logic.
    // In a real application, you would:
    // 1. Add the product to a global cart state (e.g., using React Context API, Redux).
    // 2. Possibly make an API call to a backend /cart/add endpoint.
    // 3. Provide more sophisticated user feedback (e.g., a toast notification, redirect to cart).
    console.log(`Adding "${product.name}" (ID: ${product._id}) to cart. Price: $${product.price}`);
    alert(`"${product.name}" added to cart! (This is a placeholder action)`);
  };

  if (loading) {
    return (
      <div className="container mx-auto my-8 p-5 font-sans text-center text-lg text-gray-700">
        Loading beats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-8 p-5 font-sans text-center text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  if (beats.length === 0) {
    return (
      <div className="container mx-auto my-8 p-5 font-sans text-center text-lg text-gray-700">
        No beats available yet. Upload some!
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-5 font-sans">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Our Beats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {beats.map(beat => (
          <div
            key={beat._id}
            className="border border-gray-200 rounded-lg p-4 text-center shadow-md flex flex-col justify-between
                       transition-transform duration-200 ease-in-out hover:scale-105 bg-white"
          >
            {/* Cover Image */}
            <img
              src={`http://localhost:4000/${beat.coverImage}`} // Construct image URL
              alt={beat.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {/* Product Details */}
            <h3 className="text-xl font-semibold my-2 text-gray-700 min-h-[3rem] overflow-hidden text-ellipsis">
              {beat.name}
            </h3>
            <p className="text-lg font-bold text-blue-600 mb-2">
              ${beat.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {beat.description}
            </p>

            {/* Audio Player */}
            <div className="mb-4 mt-2">
              <AudioPlayer
                src={`http://localhost:4000/${beat.fileUrl}`} // Source for the audio file
                onPlay={() => setCurrentPlayingBeatId(beat._id)} // Update state when this player plays
                onPause={() => {
                  if (currentPlayingBeatId === beat._id) {
                    setCurrentPlayingBeatId(null); // Clear state if this player pauses
                  }
                }}
                onEnded={() => {
                  if (currentPlayingBeatId === beat._id) {
                    setCurrentPlayingBeatId(null); // Clear state when this player ends
                  }
                }}
                // Customization props (optional)
                showJumpControls={true} // Shows 10-second forward/backward buttons
                showSkipControls={false} // Hides next/previous buttons (useful for playlists)
                autoPlayAfterSrcChange={false} // Prevents autoplay when source changes (e.g., if re-rendered)
                preload="metadata" // Preload enough to know duration, but not full file
                layout="stacked" // Stacks controls vertically if preferred, "horizontal" is default
                // Add className to player wrapper for custom Tailwind styling
                className="rounded-lg overflow-hidden bg-gray-50 p-2"
              />
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() => handleBuyNow(beat)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer
                         transition-colors duration-200 ease-in-out mt-auto" // mt-auto pushes button to bottom
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