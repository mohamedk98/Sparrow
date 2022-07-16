import axios from "axios";
import React, { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance, axiosTokenInstance } from "../network/axiosInstance";

function Profile(props) {
  const [profileData, setProfileData] = useState();
  const authenticationData = useSelector(
    (state) => state.user.authenticationData
  );
  const navigate = useNavigate();

  useEffect(async () => {
    const refreshTokenHandler = await axiosTokenInstance.post("/token", {
      authenticationData,
    });

    const getProfileData = await axiosTokenInstance.post("/token", {
      authenticationData,
    });

    getProfileData
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1>{profileData?.firstName + " " + profileData?.lastName}</h1>
    </>
  );
}

export default Profile;
