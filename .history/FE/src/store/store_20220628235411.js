import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice/UserSlice";

export const store=configureStore({
    reducer:{
         user:UserReducer
    }
});