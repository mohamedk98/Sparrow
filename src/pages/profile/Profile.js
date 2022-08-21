import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import Sidebar from "../../components/home/Sidebar";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import { axiosInstance } from "../../network/axiosInstance";
import { addAdminData } from "../../Store/UserSlice/AdminDataSlice";

function Profile() {
  const adminState = useSelector((state) => state.adminData.adminData);
  const dispatch = useDispatch();
    const navigate = useNavigate()
  useEffect(() => {
    axiosInstance
      .get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(addAdminData(res.data));
      })
      .catch((error) => navigate("/"));
  }, [dispatch]);
  return (
    <div className="grid grid-cols-12  bg-gray-100">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Navbar />
      </div>
      <div className="col-span-12">
        <ProfilePic />
      </div>
    </div>
  );
}

export default Profile;
