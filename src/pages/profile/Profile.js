import React, { useEffect, useState } from "react";
import {axiosInstance} from '../../network/axiosInstance';
import Cover from "../../components/profile/Cover";
import ProfilePic from "../../components/profile/ProfilePic";
import ProfileMenu from "../../components/profile/ProfileMenu";
import ProfilePhotos from "../../components/profile/ProfilePhotos";
import ProfileFriends from "../../components/profile/ProfileFriends";
import ProfileFooter from "../../components/profile/ProfileFooter";
import PostView from "../../components/profile/PostView";
// import Post from "../../components/home/Feed/posts/Post";
import Intro from "../../components/profile/Intro";
import Feed from "../../components/home/Feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "../../store/userSlice/UserDataSlice";
import InputBox from "../../components/home/Feed/InputBox";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import ProfileInfos from "./ProfileInfos";
import ProfilePosts from "./ProfilePosts";
import About from './About';
import Friends from './Friends';
import Photos from './Photos';
import Chat from "../../components/chat/Chat";
import useDarkMode from "../../hooks/useDarkMode";
import Header from "../../components/home/Header/Header";

function Profile() {
  const userState = useSelector(state =>console.log(state.userData.userData));
  const dispatch = useDispatch();
  const {username} = useParams();
  console.log(username)
  console.log(userState)
  useEffect(() => {
    axiosInstance.get(`/${username}`)
    .then(res=>dispatch(addUserData(res.data)))
    .catch(err=>console.log(err))
  },[userState, dispatch, username]);
  const [colorTheme,setTheme] = useDarkMode()
  return (
    <>
    <div className="dark:bg-zinc-800 transition duration-700">
      {/* <button onClick={()=>setTheme(colorTheme)}>dark</button> */}
      <Header/>
      <ProfileInfos/>
      <Outlet/>
      {/* <Chat/> */}
    </div>
      
    </>
  );
}

export default Profile;
