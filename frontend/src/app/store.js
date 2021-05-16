import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemsSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/users/userSlice';
export const store = configureStore({
  reducer: {
    products: itemReducer,
    cart: cartReducer,
    user: userReducer
  },
});
