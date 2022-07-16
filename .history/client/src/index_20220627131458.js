import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {Provider} from "react-redux"
import { store } from "../store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </Provider>
);
