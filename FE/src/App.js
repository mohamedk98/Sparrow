// import logo from './logo.svg';
// import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { axiosInstance } from "./network/axiosInstance";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import Profile from "./pages/profile/Profile";
import {
  addAuthentication,
  removeAuthentication,
} from "./store/userSlice/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationData = useSelector(
    (state) => state.user.authenticationData
  );
  //DON"T UNCOMMENT, USED IN TESTING AUTHENTICATION ONLY

  useEffect(() => {
    //if there is data, just refresh the token and add it to the the store
    //otherwise navigate to the login page
    axiosInstance
      .get("/autologin")
      .then((response) => {
        dispatch(addAuthentication(response.data));
        navigate("/");
      })
      .catch((error) => {
        if (Object.keys(authenticationData).length === 0) {
          dispatch(removeAuthentication());
          navigate("/login");
        } else {
          navigate("/");
        }
      });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
