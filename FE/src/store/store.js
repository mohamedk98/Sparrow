import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/UserSlice';
export const store = configureStore({
  reducer: { user: userReducer },
});
