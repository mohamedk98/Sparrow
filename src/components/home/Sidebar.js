import React from "react";
import {
  MdDashboard,
  MdOutlineAdminPanelSettings,
  MdPostAdd,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/axiosInstance";
import { addToken, removeAdminData } from "../../Store/UserSlice/AdminDataSlice";
import myLogo from "../../assets/logo_sparrow.png";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminState = useSelector((state) => state.adminData.adminData);


  const logoutHandler = () => {
    dispatch(removeAdminData());
    axiosInstance
      .get("/admin/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(removeAdminData())
        navigate("/");
      });
  };

  return (
    <div className="border-r-2 fixed top-0 bottom-0 left-0 min-h-screen ">
      <div className="h-20 flex justify-center items-center border-b-2">
        <img
          src={myLogo}
          alt="logo"
          className="w-40 pt-2 pb-2 font-bold text-indigo-500"
        />
      </div>
      <div className="ml-5">
        <ul className="p-2">
          <li className="text-xl text-center font-extrabold text-indigo-500">
            {adminState?.adminData.fullName ? (
              <span>{adminState.adminData.fullName}</span>
            ) : (
              ""
            )}
          </li>
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive
                ? "flex p-5 text-lg text-indigo-500 font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
                : "flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
            }
          >
            <MdDashboard className="text-indigo-500" />
            <span className="mx-4">Dashboard</span>
          </NavLink>

          <NavLink
            to={"/admins"}
            className={({ isActive }) =>
              isActive
                ? "flex p-5 text-lg text-indigo-500 font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
                : "flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
            }
          >
            <MdOutlineAdminPanelSettings className="text-indigo-500" />
            <span className="mx-4">Admins</span>
          </NavLink>
          <NavLink
            to={"/users"}
            className={({ isActive }) =>
              isActive
                ? "flex p-5 text-lg text-indigo-500 font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
                : "flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
            }
          >
            <AiOutlineUser className="text-indigo-500" />
            <span className="mx-4">Users</span>
          </NavLink>
          <NavLink
            to={"/posts"}
            className={({ isActive }) =>
              isActive
                ? "flex p-5 text-lg text-indigo-500 font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
                : "flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
            }
          >
            <MdPostAdd className="text-indigo-500" />
            <span className="mx-4">Posts</span>
          </NavLink>

          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "flex p-5 text-lg text-indigo-500 font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
                : "flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100"
            }
          >
            <CgProfile className="text-indigo-500" />
            <span className="mx-4">Profile</span>
          </NavLink>
          <li className="flex p-5 text-lg font-semibold items-center rounded-lg cursor-pointer hover:bg-indigo-100">
            <BiLogOut className="text-indigo-500" />
            <span className="mx-4" onClick={logoutHandler}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
