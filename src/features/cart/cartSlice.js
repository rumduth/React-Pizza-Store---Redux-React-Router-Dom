// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

const initialState = {
  cart: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseItemQuantity(state, action) {
      let item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice += item.unitPrice;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseItemQuantity(state, action) {
      let item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice -= item.unitPrice;
      if (item.quantity === 0)
        state.cart = state.cart.filter(
          (pizza) => pizza.pizzaId !== action.payload,
        );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
