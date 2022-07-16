import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile(props) {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    axios.get("http://localhost:4000/profile").then((response) => {
      console.log(response);
    });
  });
  return <div></div>;
}

export default Profile;
