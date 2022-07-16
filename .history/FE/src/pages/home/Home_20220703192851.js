import React,{useState} from "react";
import LeftSideBar from "../../components/home/LeftSideBar/LeftSideBar";
import { axiosTokenInstance } from "../../network/axiosInstance";
import {useNavigate} from "react-router-dom"
const Home = () => {
  const [profileData,setProfileData] = useState('')
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
  }, []);
  return (

     
      <LeftSideBar />

  );
};

export default Home;
