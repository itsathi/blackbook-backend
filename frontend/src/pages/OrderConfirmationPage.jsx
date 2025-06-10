// filepath: /path/to/your/frontend/components/OrderConfirmationPage.jsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get state passed from checkout
  const { success, emailSent, userEmail } = location.state || {};

  useEffect(() => {
    // If not coming from a successful "order placement", redirect home or to cart
    if (!success) {
      navigate('/'); // Or navigate('/cart')
    }
  }, [success, navigate]);

  return (
    <div className="container mx-auto my-16 p-8 font-sans bg-white shadow-lg rounded-lg text-center max-w-md">
      {success ? (
        <>
          <h1 className="text-5xl font-bold text-green-600 mb-4">Order Confirmed! 🎉</h1>
          <p className="text-xl text-gray-700 mb-6">
            Thank you for your order!
            {emailSent && userEmail ? (
                <> Please check your inbox at <span className="font-semibold text-blue-600">{userEmail}</span> for your files and receipt.</>
            ) : (
                <> Your files and receipt will be sent shortly.</>
            )}
          </p>
          <p className="text-lg text-gray-700 mb-8">
            If you don't receive the email within a few minutes, please check your spam folder.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-200 text-lg shadow-md"
          >
            Go to Homepage
          </button>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold text-red-600 mb-4">Order Failed! 😔</h1>
          <p className="text-xl text-gray-700 mb-6">There was an issue processing your order.</p>
          <button
            onClick={() => navigate('/checkout')}
            className="px-8 py-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors duration-200 text-lg shadow-md mr-4"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="px-8 py-4 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors duration-200 text-lg shadow-md"
          >
            Back to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default OrderConfirmationPage;