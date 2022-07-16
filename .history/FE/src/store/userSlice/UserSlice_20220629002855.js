import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticationData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuthentication: (state, action) => {
      state.authenticationData = { ...action.payload };
      localStorage.setItem("refreshToken", state.authenticationData.refreshToken);
      localStorage.setItem("refreshTokenId", state.authenticationData.refreshTokenId);
      localStorage.setItem("hasExpiry", state.authenticationData.hasExpiry);
    },
    removeAuthentication: (state) => {
      state.auth = {};
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenId");
      localStorage.removeItem("hasExpiry");
    },
    autoLogin: (state) => {
      let existingRefreshToken = localStorage.getItem("refreshToken");
      let existingRefreshTokenId = localStorage.getItem("refreshTokenId");
      let existingHasExpiry = localStorage.getItem("hasExpiry");
      if (existingRefreshToken && existingRefreshTokenId && existingHasExpiry) {
        state.authenticationData = {
          refreshToken: existingRefreshToken,
          refreshTokenId: existingRefreshTokenId,
          hasExpiry: existingHasExpiry,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuthentication, removeAuthentication, autoLogin } = userSlice.actions;

export default userSlice.reducer;
