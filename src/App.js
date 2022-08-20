import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { useTranslation } from 'react-i18next';

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    country_code: 'sa',
    dir: 'rtl',
  },
];

function App() {
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(l => l.code === currentLanguageCode);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('app_title');
  }, [currentLanguage, t]);

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
        dispatch(removeAuthentication());
        if (
          location.pathname !== '/resetPassword' &&
          location.pathname !== `/verifyEmail/${location.pathname.slice(13)}`
        ) {
          navigate('/login');
        }
      });
  }, []);
  useEffect(() => {
    axiosInstance.get('/profile').then(res => dispatch(addUserData(res.data)));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/verifyEmail/:email" element={<VerifiyEmail />} />
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
