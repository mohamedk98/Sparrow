import { createSlice } from '@reduxjs/toolkit';
//authentication and refresh token data reducers

// const getStorageData = () => {
//   let storageRefreshToken = localStorage.getItem("refreshToken");
//   let storageHasExpiry = localStorage.getItem("hasExpiry");

//   if (storageRefreshToken === undefined || storageHasExpiry === undefined) {
//     return {};
//   }

//   return { refreshToken: storageRefreshToken, hasExpiry: storageHasExpiry };
// };
const initialState = {
  authenticationData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //add data to the store and local storage
    addAuthentication: (state, action) => {
      state.authenticationData = { ...action.payload };
      localStorage.setItem(
        'refreshToken',
        state.authenticationData.refreshToken
      );
      localStorage.setItem('hasExpiry', state.authenticationData.hasExpiry);
      localStorage.setItem('accessToken', state.authenticationData.accessToken);
    },
    //remove data from storage (used in logout)
    removeAuthentication: state => {
      state.auth = {};
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('hasExpiry');
      localStorage.removeItem('accessToken');
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuthentication, removeAuthentication } = userSlice.actions;

export default userSlice.reducer;
