import axios from "axios";
import React, { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, axiosTokenInstance } from "../network/axiosInstance";

function Profile(props) {
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();
  axiosTokenInstance
  .get("/profile")
  .then((response) => {
    setProfileData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  useEffect(() => {


  }, []);
  return (
    <>
   
    <h1>{profileData?.firstName + " " + profileData?.lastName}</h1>

   
    </>
  );
}

export default Profile;
