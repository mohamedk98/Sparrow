import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import Sidebar from "../../components/home/Sidebar";
import Widget from "../../components/home/Widget";
import Statistics from "../../components/statistics/Statistics";
import { axiosInstance } from "../../network/axiosInstance";
import { addAdminData } from "../../Store/UserSlice/AdminDataSlice";

function Home() {
  const userState = useSelector((state) => state.userData.userData);
  const postState = useSelector((state) => state.postData.postData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigate("/");
    }
    axiosInstance
      .get("/admin/users",{    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },})
      .then((res) => {
        setAllUsers(res.data);
        axiosInstance.get("/admin/profile").then((response) => {
          dispatch(addAdminData(response.data));
          axiosInstance
            .get("/admin/posts")
            .then((res) => setAllPosts(res.data));
        });
      })
      .catch((err) => navigate("/"));


  }, []);
  return (
    <div className="grid grid-cols-12 bg-gray-100">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Navbar />
        <div className="flex justify-around my-8">
          <Widget number={allUsers.length} title={"users"} />

          <Widget number={allPosts.length} title={"posts"} />
        </div>
        <div className="flex flex-row justify-center my-6">
          <div className="w-4/5 ">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
