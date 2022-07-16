import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../network/axiosInstance";

function Profile(props) {
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();
  //   const getProfileData = () => {

  //     });

  useEffect(() => {
    axiosInstance
      .get("/profile")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);
  return (
    <>
      {console.log({ ...profileData })}
    </>
  );
}

export default Profile;
