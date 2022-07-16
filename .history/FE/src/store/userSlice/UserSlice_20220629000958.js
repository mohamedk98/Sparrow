import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.authData = { ...action.payload };
      localStorage.setItem("refreshToken", state.authData.refreshToken);
      localStorage.setItem("refreshTokenId", state.authData.refreshTokenId);
      localStorage.setItem("hasExpiry", state.authData.hasExpiry);
    },
    removeAuth: (state) => {
      state.auth = {};
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenId");
      localStorage.removeItem("hasExpiry");
    },
    autoLogin: (state) => {
      let existingUserId = localStorage.getItem("userId");
      let existingUsername = localStorage.getItem("username");
      let existingEmail = localStorage.getItem("email");
      if (existingEmail && existingUserId && existingUsername) {
        state.auth = {
          userId: existingUserId,
          username: existingUsername,
          email: existingEmail,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuth, removeAuth, autoLogin } = userSlice.actions;

export default userSlice.reducer;
