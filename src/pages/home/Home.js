import React, { useState, useEffect } from 'react';
import LeftSideBar from '../../components/home/LeftSideBar/LeftSideBar';
import Feed from '../../components/home/Feed/Feed';
import { axiosInstance, axiosTokenInstance } from '../../network/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header/Header';
import RightSideBar from '../../components/home/RightSideBar/RightSideBar';
const Home = () => {
  const [profileData, setProfileData] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    //it will return user profile data
    axiosInstance
      .get("/profile")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [navigate]);
  return (
    <div className="h-full bg-gray-200 dark:bg-darkBgColor">
      <Header />
      <div className="flex dark:bg-darkBgColor">
        <LeftSideBar profileData={profileData} />
        <Feed />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
