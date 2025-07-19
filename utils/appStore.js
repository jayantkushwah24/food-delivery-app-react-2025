import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice.js'

// creating a redux store
const appStore = configureStore({
  reducer:{
    cart : cartReducer,
  }
});

export default appStore;