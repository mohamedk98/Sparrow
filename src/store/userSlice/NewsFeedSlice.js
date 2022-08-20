import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postsData: [],
  postsMineData: [],
  profileData: {},
  forceUpdate: 10000000,
  alert: {},
};

export const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,

  //   add posts data to the store/redux:
  reducers: {
    // postsDataHandler: (state, action) => {
    //   state.postsData = [...action.payload];
    // },

    // postsMineDataHandler: (state, action) => {
    //   state.postsMineData = [...action.payload];
    // },

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
  // postsDataHandler,
  // postsMineDataHandler,
  profileDataHandler,
  forceUpdateHandler,
  alertHandler,
} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
