import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer
  },
});
