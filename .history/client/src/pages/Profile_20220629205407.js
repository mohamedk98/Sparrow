import axios from "axios";
import React, { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance, axiosTokenInstance } from "../network/axiosInstance";

function Profile(props) {
  //Profile data state
  const [profileData, setProfileData] = useState();
  //Authentication data from use store to be used to generate token
  const authenticationData = useSelector(
    (state) => state.user.authenticationData
  );
  const navigate = useNavigate();

  useEffect(() => {
    axiosTokenInstance
      .post("/token")
      .then(() => {
        axiosTokenInstance.get("/profile").then((response) => {
          setProfileData(response.data);
        });
      })

      .catch((error) => {
        navigate("/login")
      });
  }, []);
  return (
    <>
      <h1>{profileData?.firstName + " " + profileData?.lastName}</h1>
    </>
  );
}

export default Profile;
