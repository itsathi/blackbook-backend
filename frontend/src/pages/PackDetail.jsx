// filepath: /path/to/your/frontend/components/PackDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext'; // <--- IMPORT useCart

const PackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // <--- USE CART CONTEXT

  useEffect(() => {
    const fetchPack = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setPack(response.data);
      } catch (err) {
        console.error('Error fetching pack details:', err);
        setError('Failed to load pack details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPack();
    }
  }, [id]);

  const handleAddToCart = () => { // <--- New handler for this button
    if (pack) {
      addToCart(pack);
      navigate('/cart'); // Redirect to cart page
    }
  };

  if (loading) {
    return <div className="container mx-auto my-8 p-5 text-center font-sans">Loading pack details...</div>;
  }

  if (error) {
    return <div className="container mx-auto my-8 p-5 text-center text-red-500 font-sans">Error: {error}</div>;
  }

  if (!pack) {
    return <div className="container mx-auto my-8 p-5 text-center font-sans">Pack not found.</div>;
  }

  const fileName = pack.fileUrl ? pack.fileUrl.split('/').pop() : 'N/A';

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
            src={`http://localhost:4000/${pack.coverImage}`}
            alt={pack.name}
            className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4 text-gray-800">
          <h1 className="text-4xl font-bold mb-2">{pack.name}</h1>
          <p className="text-xl font-semibold text-blue-600 mb-4">${pack.price.toFixed(2)}</p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">Description:</h2>
          <p className="text-lg leading-relaxed">{pack.description}</p>

          <p className="text-md text-gray-600 mt-2">
            Uploaded by: <span className="font-medium">{pack.uploadedBy ? pack.uploadedBy.name : 'Unknown Artist'}</span>
          </p>

          <p className="text-md text-gray-600 mt-2">
            File Type: <span className="font-medium">{pack.category === 'pack' || pack.category === 'samplepack' ? 'ZIP Archive' : 'N/A'}</span>
          </p>

          <p className="text-md text-gray-600">
            File Name: <span className="font-medium">{fileName}</span>
          </p>

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

export default PackDetail;