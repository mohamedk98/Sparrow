import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axiosInstance from '../../network/axiosInstance';
import Cover from "../../components/profile/Cover";
import ProfilePic from "../../components/profile/ProfilePic";
import ProfileMenu from "../../components/profile/ProfileMenu";
import ProfilePhotos from "../../components/profile/ProfilePhotos";
import ProfileFriends from "../../components/profile/ProfileFriends";
import ProfileFooter from "../../components/profile/ProfileFooter";
import CreatePost from "../../components/profile/CreatePost";
import PostView from "../../components/profile/PostView";

function Profile() {
  
  useEffect(() => {
    //axiosInstance.get('/profile').then(res=>console.log(res))
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
        <div className="w-11/12">
          <div className="py-2.5 px-9">
            <div className="grid lg:grid-cols-2 sm:grid-col-1 gap-5">
              {/* bottom left */}
              <div className=" w-5/6 lg:ml-28">
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
                <CreatePost/>
                {/* post view */}
                <PostView/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
