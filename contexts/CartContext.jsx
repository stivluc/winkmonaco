import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state for the cart
const initialCartState = {
  items: [], // Array of items in the cart
};

// Create the CartContext
const CartContext = createContext();

// Define actions to modify the cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[itemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'REMOVE_ITEM':
      // Find the item in the cart
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id || item.size !== action.payload.size
      );
      return { ...state, items: updatedItems };
    case 'UPDATE_QUANTITY':
      // Update the quantity of a specific item in the cart
      const updatedCart = state.items.map((item) => {
        if (item.id === action.payload.id && item.size === action.payload.size) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: updatedCart };
    case 'CLEAR_CART':
      // Clear all items from the cart
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Create a CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
