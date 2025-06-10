// filepath: /path/to/your/frontend/components/CheckoutPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalAmount, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

 const handlePlaceOrder = async () => {
  setLoading(true);
  setMessage(null);

  // Get email from localStorage
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    setMessage("You must be logged in to place an order.");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post('http://localhost:4000/api/place-order-and-email', {
      orderDetails: {
        items: cartItems.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalAmount()
      },
      userEmail: userEmail
    });

    if (response.data.success) {
      setMessage("Order placed successfully! Check your email for files and receipt.");
      clearCart();
      navigate('/order-confirmation', { state: { success: true, emailSent: true, userEmail: userEmail } });
    } else {
      setMessage(response.data.message || "Failed to place order.");
    }
  } catch (error) {
    console.error("Error placing order:", error.response ? error.response.data : error.message);
    setMessage(error.response?.data?.message || "An error occurred while placing your order.");
  } finally {
    setLoading(false);
  }
};

  if (cartItems.length === 0 && !loading && !message) {
    return (
      <div className="container mx-auto my-8 p-5 text-center font-sans">
        <p>Your cart is empty. Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-5 font-sans bg-white shadow-lg rounded-lg max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Checkout</h1>

      {loading && <div className="text-center text-blue-500 mb-4">Processing order...</div>}
      {message && (
        <div className={`p-3 mb-4 rounded-md text-center ${message.includes("success") ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{item.name} x {item.quantity}</span>
            <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-300">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${getTotalAmount().toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Order</h2>

        <button
          type="button"
          onClick={handlePlaceOrder} // Call the new handler
          disabled={loading || cartItems.length === 0}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-200 ease-in-out text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Confirming Order..." : `Confirm Order & Receive Files`}
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/cart')}
          className="px-6 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors duration-200 ease-in-out"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;