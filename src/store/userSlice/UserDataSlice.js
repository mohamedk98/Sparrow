import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    //add data to the store and local storage
    addUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
    //remove data from storage (used in logout)
    removeUserData: state => {
      state.userData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserData, removeUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
