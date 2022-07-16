import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuth } = userSlice.actions;

export default userSlice.reducer;
