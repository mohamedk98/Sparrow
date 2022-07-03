import React, { useState, useEffect } from "react";
import LeftSideBar from "../../components/home/LeftSideBar/LeftSideBar";
import Feed from "../../components/home/Feed/Feed";
import { axiosTokenInstance } from "../../network/axiosInstance";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header/Header";
const Home = () => {
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axiosTokenInstance
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
    <div className="h-screen bg-facebook-grey overflow-hidden">
      <Header/>
      {console.log(profileData)}
      <div className="flex">
        <LeftSideBar />
          <Feed/>
      </div>
    </div>
  );
};

export default Home;
