import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userData: []
};

export const userDataSlice = createSlice({
    name:"UserData",
    initialState,
    reducers:{
        //add data to the store and local storage
        addUserData: (state, action) => {
            state.userData=[...action.payload]
        },
        //remove data from storage (used in logout)
        removeUserData: state => {
            state.userData=[];
        }
    }
})


export const {addUserData, removeUserData} = userDataSlice.actions;
export default userDataSlice.reducer;