import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token');

const initialState={
    adminData:{token,adminData:{}},
  
};



export const adminDataSlice = createSlice({
    name:"AdminData",
    initialState,
    reducers:{
        //add data to the store and local storage
        addAdminData: (state, action) => {
           
             state.adminData.adminData = action.payload;
           
        
        },
        addToken:(state,action)=>{
          localStorage.setItem("token",action.payload)
          state.adminData.token=action.payload;
        },
        //remove data from storage (used in logout)
        removeAdminData:  state => {
            state.adminData.adminData = {};
            state.adminData.token='';
            localStorage.removeItem('token');

          },
    },

    
})


export const {addAdminData, removeAdminData,addToken} = adminDataSlice.actions;
export default adminDataSlice.reducer;