// filepath: /path/to/your/frontend/contexts/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// Custom hook for easy consumption
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return []; // Return empty array if localStorage parsing fails
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Ensure product has necessary properties (e.g., _id, name, price, coverImage)
    if (!product || !product._id || !product.name || product.price === undefined) {
        console.error("Invalid product data for adding to cart:", product);
        return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);

      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item is new, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalAmount,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};