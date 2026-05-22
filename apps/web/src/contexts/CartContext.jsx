import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (artwork) => {
    const existingItem = cartItems.find(item => item.artworkId === artwork.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.artworkId === artwork.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        artworkId: artwork.id,
        artwork: artwork,
        quantity: 1,
        price: artwork.price
      }]);
    }
  };

  const removeFromCart = (artworkId) => {
    setCartItems(cartItems.filter(item => item.artworkId !== artworkId));
  };

  const updateQuantity = (artworkId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.artworkId === artworkId
        ? { ...item, quantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};