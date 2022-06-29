import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './userSlice/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
