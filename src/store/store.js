import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/UserSlice';
import newsFeedReducer from './userSlice/NewsFeedSlice';
import userDataReducer from './userSlice/UserDataSlice';
import OtherUsersData from './userSlice/OtherUsersData';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
    newsFeed: newsFeedReducer,
    otherUserData: OtherUsersData,
  },
});
