import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/UserSlice';
import newsFeedReducer from './userSlice/NewsFeedSlice';

export const store = configureStore({
  reducer: { user: userReducer, newsFeed: newsFeedReducer },
});
