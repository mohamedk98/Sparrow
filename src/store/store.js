import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/UserSlice';
import userDataReducer from './userSlice/UserDataSlice';

export const store = configureStore({
  reducer: { user: userReducer, userData: userDataReducer },
});
