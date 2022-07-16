import axios from "axios";
import React, { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, axiosTokenInstance } from "../network/axiosInstance";

function Profile(props) {
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axiosTokenInstance
      .get("/profile")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    <Suspense fallback={<h1 className="text-4xl font-bold text-red-500">Loading....</h1>}>
    <h1>{profileData?.firstName + " " + profileData?.lastName}</h1>
    </Suspense>
   
    </>
  );
}

export default Profile;
