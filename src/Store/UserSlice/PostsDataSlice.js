import { createSlice } from "@reduxjs/toolkit";


const initialState={
    postData: []
};

export const postDataSlice = createSlice({
    name:"PostData",
    initialState,
    reducers:{
        //add data to the store and local storage
        addPostData: (state, action) => {
            state.postData=[...action.payload]
        },
        //remove data from storage (used in logout)
        removePostData: state => {
            state.postData=[];
        }
    }
})


export const {addPostData, removePostData} = postDataSlice.actions;
export default postDataSlice.reducer;