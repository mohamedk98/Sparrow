// import logo from './logo.svg';
// import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./network/axiosInstance";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import { addAuthentication } from "./store/userSlice/UserSlice";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

    //check if the data exist in localstorage or not
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
    axiosInstance
      .post("/token", { existingTokenData })
      .then((response) => {
        dispatch(addAuthentication(response.data));
      })
      .catch((error) => {
        navigate
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
