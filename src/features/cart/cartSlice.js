import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  //   cart: [],
  cart: [
    {
      pizzaId: 12,
      name: "Vietnamsee",
      quantity: 2,
      unitPrice: 6,
      totalPrice: 32,
    },
  ],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      let item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice += item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      let item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice -= item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;