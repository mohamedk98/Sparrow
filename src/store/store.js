import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/UserSlice';
import newsFeedReducer from './userSlice/NewsFeedSlice';
import userDataReducer from './userSlice/UserDataSlice';

export const store = configureStore({
  reducer: { user: userReducer, userData: userDataReducer, newsFeed: newsFeedReducer },
});
