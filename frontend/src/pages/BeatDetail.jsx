// filepath: /path/to/your/frontend/components/BeatDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useCart } from '../contexts/CartContext'; // <--- IMPORT useCart

const BeatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beat, setBeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // <--- USE CART CONTEXT

  useEffect(() => {
    const fetchBeat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setBeat(response.data);
      } catch (err) {
        console.error('Error fetching beat details:', err);
        setError('Failed to load beat details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBeat();
    }
  }, [id]);

  const handleAddToCart = () => { // <--- New handler for this button
    if (beat) {
      addToCart(beat);
      navigate('/cart'); // Redirect to cart page
    }
  };

  if (loading) {
    return <div className="container mx-auto my-8 p-5 text-center font-sans">Loading beat details...</div>;
  }

  if (error) {
    return <div className="container mx-auto my-8 p-5 text-center text-red-500 font-sans">Error: {error}</div>;
  }

  if (!beat) {
    return <div className="container mx-auto my-8 p-5 text-center font-sans">Beat not found.</div>;
  }

  return (
    <div className="container mx-auto my-8 p-5 font-sans bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 ease-in-out"
      >
        &larr; Back to Home
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={`http://localhost:4000/${beat.coverImage}`}
            alt={beat.name}
            className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4 text-gray-800">
          <h1 className="text-4xl font-bold mb-2">{beat.name}</h1>
          <p className="text-xl font-semibold text-blue-600 mb-4">${beat.price.toFixed(2)}</p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">Description:</h2>
          <p className="text-lg leading-relaxed">{beat.description}</p>

          <p className="text-md text-gray-600 mt-2">
            Uploaded by: <span className="font-medium">{beat.uploadedBy ? beat.uploadedBy.name : 'Unknown Artist'}</span>
          </p>

          <div className="mt-6 w-full">
            <AudioPlayer
              src={`http://localhost:4000/${beat.fileUrl}`}
              onPlay={() => console.log('Playing:', beat.name)}
              onPause={() => console.log('Paused:', beat.name)}
              autoPlay
              showSkipControls={true}
              showJumpControls={false}
              layout="horizontal"
            />
          </div>

          <button
            onClick={handleAddToCart} // <--- Call new handler
            className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-200 ease-in-out text-lg shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatDetail;