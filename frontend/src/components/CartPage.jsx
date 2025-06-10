// filepath: /path/to/your/frontend/components/CartPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import cart context

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  // The updateQuantity function is no longer called from the UI,
  // but it remains in CartContext if needed elsewhere or for future features.

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="container mx-auto my-8 p-5 font-sans bg-white shadow-lg rounded-lg">
      {/* --- ADDED BACK TO PREVIOUS PAGE LINK --- */}
      <button
        onClick={() => navigate(-1)} // Navigate back one step in history
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 ease-in-out"
      >
        &larr; Back to Previous Page
      </button>
      {/* -------------------------------------- */}

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate('/home')} // You can change this to /beats or /samplepacks
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-200 ease-in-out"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 border-b border-gray-200 w-20"></th>
                  <th className="py-3 px-4 border-b border-gray-200">Product</th>
                  <th className="py-3 px-4 border-b border-gray-200 text-center w-24">Price</th>
                  {/* <th className="py-3 px-4 border-b border-gray-200 text-center w-32">Quantity</th> <--- REMOVED */}
                  <th className="py-3 px-4 border-b border-gray-200 text-center w-24">Subtotal</th>
                  <th className="py-3 px-4 border-b border-gray-200 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <img
                        src={`http://localhost:4000/${item.coverImage}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-800 font-medium">
                      {item.name} x {item.quantity} {/* Display quantity with product name */}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      ${item.price.toFixed(2)}
                    </td>
                    {/* <td className="py-4 px-4 text-center"> <--- REMOVED QUANTITY CONTROLS
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-t border-b border-gray-200 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </td> */}
                    <td className="py-4 px-4 text-center text-gray-800 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-8 gap-4">
            <span className="text-2xl font-bold text-gray-800">Total:</span>
            <span className="text-3xl font-bold text-blue-600">${getTotalAmount().toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => clearCart()}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out"
            >
              Clear Cart
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-200 ease-in-out text-lg shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;