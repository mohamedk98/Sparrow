import { createSlice } from "@reduxjs/toolkit";

const getRefreshTokenData = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const refreshTokenId = localStorage.getItem("refreshTokenId");
  const hasExpiry = localStorage.getItem("hasExpiry");
  if (refreshToken && refreshTokenId && hasExpiry) {
    return {
      refreshToken,
      refreshTokenId,
      hasExpiry,
    };
  }

  return {};
};

//authentication and refresh token data reducers
const initialState = {
  authenticationData: getRefreshTokenData(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //add data to the store and local storage
    addAuthentication: (state, action) => {
      state.authenticationData = { ...action.payload };
      localStorage.setItem(
        "refreshToken",
        state.authenticationData.refreshToken
      );
      localStorage.setItem(
        "refreshTokenId",
        state.authenticationData.refreshTokenId
      );
      localStorage.setItem("hasExpiry", state.authenticationData.hasExpiry);
    },
    //remove data from storage (used in logout)
    removeAuthentication: (state) => {
      state.auth = {};
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenId");
      localStorage.removeItem("hasExpiry");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuthentication, removeAuthentication } = userSlice.actions;

export default userSlice.reducer;
