import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import {useDispatch} from "react-redux"
import { autoLogin } from "./store/slicers/user";
function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(autoLogin())
  })
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
