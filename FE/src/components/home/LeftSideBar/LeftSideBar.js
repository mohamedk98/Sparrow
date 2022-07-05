import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { BsFillAlarmFill } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import profileImg from "../../../assets/images/default_profile.png";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { axiosInstance, axiosTokenInstance } from "../../../network/axiosInstance";
import { removeAuthentication } from "../../../store/userSlice/UserSlice";
const LeftSideBar = () => {
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
=======
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()

>>>>>>> 75490d39f5605ba82617366d7fbfc1d5adcbd429
  const Menus = [
    { id: 1, title: "Friends", icon: { iconTitle: FaUserAlt } },
    { id: 2, title: "Groups", icon: { iconTitle: FaUserFriends } },
    { id: 3, title: "Saved", icon: { iconTitle: MdGroups } },
    { id: 4, title: "Events", icon: { iconTitle: BsFillCalendarEventFill } },
    { id: 5, title: "Most recent", icon: { iconTitle: BsFillAlarmFill } },
    { id: 6, title: "Favourites", icon: { iconTitle: BsStarFill } },


  ];

  const logoutHandler = ()=>{
axiosTokenInstance.post("/logout").then(()=>{
  dispatch(removeAuthentication())
  navigate("/login")
})
  }

  return (
    <div className="flex">
      <div
        className={`bg-facebook-grey h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300  relative`}
      >
        <BsFillArrowLeftCircleFill
          onClick={() => setOpen(!open)}
          className={`bg-facebook-grey text-facebook-blue  text-3xl rounded-full cursor-pointer ${
            !open && "rotate-180"
          } absolute -right-3 top-9 border border-facebook-grey`}
        />
        <ul>
          <li className="flex items-center gap-x-4 cursor-pointer p-2 hover:bg-facebook-greyHover rounded-md mt-2 ">
            <img src={profileImg} alt="profile" className="rounded-full" />
            <span
              className={`text-black origin-left font-bold text-sm mt-3 ml-2 duration-300 ${
                !open && "scale-0"
              }`}
            >
              User Name
            </span>
          </li>
        </ul>

        <ul className="pt-2">
          {Menus.map((menu) => (
            <li
              key={menu.id}
              className=" text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-facebook-greyHover rounded-md mt-2"
            >
              <span className="text-2xl block float-left text-facebook-blue">
                <menu.icon.iconTitle />
              </span>
              <span
                className={`text-base font-medium text-black flex-1 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
            </li>
          ))}
              {/* Just added logout for testing and future use (Mohamed Khaled) */}
          <li className=" text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-facebook-greyHover rounded-md mt-2"
          onClick={logoutHandler}>
            <span className="text-2xl block float-left text-facebook-blue">
              <BiLogOut />
            </span>
            <span
              className={`text-base font-medium text-black flex-1 ${
                !open && "hidden"
              }`}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default LeftSideBar;
