import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otherUserData: {},
};

export const otherUserDataSlice = createSlice({
  name: 'otherUserData',
  initialState,
  reducers: {
    //add data to the store and local storage
    addOtherUserData: (state, action) => {
      state.otherUserData = { ...action.payload };
    },
    //remove data from storage (used in logout)
    removeOtherUserData: state => {
      state.otherUserData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOtherUserData, removeOtherUserData } =
  otherUserDataSlice.actions;

export default otherUserDataSlice.reducer;
