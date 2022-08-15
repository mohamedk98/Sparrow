import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postsData: [],
  profileData: {},
  forceUpdate: false,
  alert: {},
};

export const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,

  //   add posts data to the store/redux:
  reducers: {
    postsDataHandler: (state, action) => {
      state.postsData = [...action.payload];
    },

    profileDataHandler: (state, action) => {
      state.profileData = { ...action.payload };
    },

    forceUpdateHandler: (state, action) => {
      state.forceUpdate = action.payload;
    },

    alertHandler: (state, action) => {
      state.alert = { ...action.payload };
    },
  },
});

export const {
  postsDataHandler,
  profileDataHandler,
  forceUpdateHandler,
  alertHandler,
} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
