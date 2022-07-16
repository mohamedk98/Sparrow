// import logo from './logo.svg';
// import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axiosInstance from "./network/axiosInstance";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import { addAuthentication } from "./store/userSlice/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //check if the refresh token data exist in localstorage or not
  const checkStoredLogin = () => {
    let existingRefreshToken = localStorage.getItem("refreshToken");
    let existingRefreshTokenId = localStorage.getItem("refreshTokenId");
    let existingHasExpiry = localStorage.getItem("hasExpiry");

    if (existingRefreshToken && existingRefreshTokenId && existingHasExpiry) {
      return {
        refreshToken: existingRefreshToken,
        refreshTokenId: existingRefreshTokenId,
        hasExpiry: existingHasExpiry,
      };
    } else {
      return null;
    }
  };
  useEffect(() => {
    const existingTokenData = checkStoredLogin();
    //if there is data, just refresh the token and add it to the the store
    //otherwise navigate to the login page
    axiosInstance
      .post("/token", { existingTokenData })
      .then((response) => {
        dispatch(addAuthentication(response.data));
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
