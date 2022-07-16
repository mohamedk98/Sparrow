import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile(props) {
  const [profileData, setProfileData] = useState();

  const getProfileData = () => {
    axios.get("http://localhost:4000/books",{withCredentials:true}).then((response) => {
      console.log(response);
    });
  };
  useEffect(() => {});
  return (
    <>
      <button className="btn btn-primary" onClick={getProfileData}>Test Profile</button>
    </>
  );
}

export default Profile;
