// import logo from './logo.svg';
// import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { axiosInstance } from './network/axiosInstance';
import Error from './pages/error/Error';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Reset from './pages/reset/Reset';
import Profile from './pages/profile/Profile';
import {
  addAuthentication,
  removeAuthentication,
} from './store/userSlice/UserSlice';
import ProfilePosts from './pages/profile/ProfilePosts';
import About from './pages/profile/About';
import Friends from './pages/profile/Friends';
import Photos from './pages/profile/Photos';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        navigate('/login');
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/profile" element={<Profile />} >
        <Route path="/profile" element={<ProfilePosts />} />
        <Route path="about" element={<About />}/>
        <Route path="friends" element={<Friends />}/>
        <Route path="photos" element={<Photos />}/>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
