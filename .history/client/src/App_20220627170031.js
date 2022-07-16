import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import {useDispatch, useSelector} from "react-redux"
import { autoLogin } from "./store/slicers/user";
import axiosInstance from "./network/axiosInstance";
function App() {
  const dispatch = useDispatch()
  const authState = useSelector(state=>state.user.auth)
  useEffect(()=>{
   if (Object.keys(authState).length !== 0 ){
    dispatch(autoLogin())
   }
  },[])
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
