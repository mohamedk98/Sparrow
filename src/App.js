// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from './network/axiosInstance';
import {
  addAuthentication,
  removeAuthentication,
} from './store/userSlice/UserSlice';
import { addUserData } from './store/userSlice/UserDataSlice';

import Error from './pages/error/Error';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Reset from './pages/reset/Reset';
import ResetPassword from './pages/reset/ResetPassword';
import Profile from './pages/profile/Profile';
import ProfilePosts from './pages/profile/ProfilePosts';
import About from './pages/profile/About';
import Friends from './pages/profile/Friends';
import Photos from './pages/profile/Photos';
import VerifiyEmail from './pages/verifyEmail/VerifiyEmail';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //DON"T UNCOMMENT, USED IN TESTING AUTHENTICATION ONLY

  useEffect(() => {
    //if there is data, just refresh the token and add it to the the store
    //otherwise navigate to the login page

    axiosInstance
      .get('/autologin')
      .then(response => {
        dispatch(addAuthentication(response.data));
      })
      .catch(error => {
        // console.log(error);
        dispatch(removeAuthentication());
        if (
          location.pathname !== '/resetPassword' &&
          location.pathname !== '/verifyEmail'
        ) {
          navigate('/login');
        }
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .get('/profile')
      .then(res => dispatch(addUserData(res.data)))
      .catch(err => console.log(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/verifyEmail" element={<VerifiyEmail />} />
      <Route path="/:username" element={<Profile />}>
        <Route index element={<ProfilePosts />} />
        <Route path="posts" element={<ProfilePosts />} />
        <Route path="about" element={<About />} />
        <Route path="friends" element={<Friends />} />
        <Route path="photos" element={<Photos />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
