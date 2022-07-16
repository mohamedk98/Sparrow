import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = { ...action.payload };
      localStorage.setItem("userId", state.auth.userId);
      localStorage.setItem("username", state.auth.username);
      localStorage.setItem("email", state.auth.email);
    },
    removeAuth: (state) => {
      state.auth = {};
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
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
