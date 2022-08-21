import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./UserSlice/UserDataSlice";
import postDataReducer from "./UserSlice/PostsDataSlice";
import adminDataReducer from "./UserSlice/AdminDataSlice";

export const store= configureStore({
    reducer: {
        userData: userDataReducer, 
        postData:postDataReducer, 
        adminData: adminDataReducer,
    }
});