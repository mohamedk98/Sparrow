// import logo from './logo.svg';
// import './App.css';
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { axiosInstance, axiosTokenInstance } from "./network/axiosInstance";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import {
  addAuthentication,
  removeAuthentication,
} from "./store/userSlice/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationData = useSelector((state)=>state.user.authenticationData)
  //DON"T UNCOMMENT, USED IN TESTING AUTHENTICATION ONLY

  useEffect(() => {
    //if there is data, just refresh the token and add it to the the store
    //otherwise navigate to the login page
    axiosTokenInstance
      .get("/autologin")
      .then((response) => {
        dispatch(addAuthentication(response.data));
        navigate("/")
      })
      .catch((error) => {

          dispatch(removeAuthentication);
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
