import React, { useEffect, useState } from "react";
import {axiosInstance} from '../../network/axiosInstance';
import Cover from "../../components/profile/Cover";
import ProfilePic from "../../components/profile/ProfilePic";
import ProfileMenu from "../../components/profile/ProfileMenu";
import ProfilePhotos from "../../components/profile/ProfilePhotos";
import ProfileFriends from "../../components/profile/ProfileFriends";
import ProfileFooter from "../../components/profile/ProfileFooter";
import PostView from "../../components/profile/PostView";
import Post from "../../components/home/Feed/posts/Post";
import Intro from "../../components/profile/Intro";
import Feed from "../../components/home/Feed/Feed";

function Profile() {
  
  useEffect(() => {
    axiosInstance.get('/profile').then(res=>console.log(res)).catch(err=>console.log(err))
  });
  return (
    <div>
      <div className="lg:w-10/12 sm:w-full m-auto">
        {/* cover */}
        <Cover/>
        {/* profilePicture */}
        <ProfilePic/>
        {/* profile menu */}
        <div className="relative px-10" style={{padding:"0 50px"}}>
          <ProfileMenu/>
        </div>
      </div>
      {/*bottom*/}
      <div className="mt-5 bg-slate-200">
        <div className="w-11/12 m-auto">
          <div className="py-2.5 px-9">
            <div className="grid lg:grid-cols-2 grid-col-1 gap-1">
              {/* bottom left */}
              <div className="lg:w-5/6 w-full xl:ml-20 lg:ml-14">
                <Intro/>
                {/* Profile Photos */}
                <ProfilePhotos/>
                {/* Profile friends */}
                <ProfileFriends/>
                {/* Profile footer */}
                <ProfileFooter/>
              </div>
              {/* bottom right */}
              <div>
                {/* create post */}
                <Feed/>
                {/* post view */}
                <PostView/>
                {/* post */}
                <Post/>
                <Post/>
                <Post/>
                <Post/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
