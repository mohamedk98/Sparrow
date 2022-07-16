import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile(props) {
  const [profileData, setProfileData] = useState();

//   const getProfileData = () => {

//     });

  useEffect(() => {
    axios.get("/profile").then((response) => {
        setProfileData(response.data)
  });
})
  return (
    <>
    {console.log({...profileData})}
      {/* <button className="btn btn-primary" onClick={getProfileData}>Test Profile</button> */}
    </>
  );
}

export default Profile;
