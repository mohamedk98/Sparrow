import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAuth: (state) => {

      state.value += 1
    },

  },
})

// Action creators are generated for each case reducer function
export const { addAuth } = counterSlice.actions

export default userSlice.reducer