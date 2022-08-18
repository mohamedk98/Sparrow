import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';

import { BiLogOut } from 'react-icons/bi';
import { axiosInstance } from '../../../network/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthentication } from '../../../store/userSlice/UserSlice';
import { useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
  const userState = useSelector(state => state.userData.userData);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate('/');
  };

  const profileHandler = () => {
    navigate(`/${userState.username}/friends`);
  };

  //logout functionality
  const logoutHandler = () => {
    dispatch(removeAuthentication());
    axiosInstance.post('/logout').then(() => {
      navigate('/login');
    });
  };

  const Menus = [
    {
      id: 1,
      title: 'Home',
      icon: { iconTitle: AiFillHome },
      handler: homeHandler,
    },
    {
      id: 2,
      title: 'Friends',
      icon: { iconTitle: FaUserAlt },
      handler: profileHandler,
    },
    {
      id: 3,
      title: 'Logout',
      icon: { iconTitle: BiLogOut },
      handler: logoutHandler,
    },
  ];

  return (
    <div className="hidden lg1:flex fixed z-10">
      <div
        className={`bg-facebook-grey h-screen p-5 pt-8 ${
          open ? 'w-38' : 'w-24'
        } duration-300  relative`}
      >
        <BsFillArrowLeftCircleFill
          onClick={() => setOpen(!open)}
          className={`bg-facebook-grey text-indigo-500 text-3xl rounded-full cursor-pointer ${
            !open && 'rotate-180'
          } absolute -right-3 top-9 border border-facebook-grey`}
        />
        <ul>
          <li
            className={`flex items-center gap-x-4 cursor-pointer  hover:bg-facebook-greyHover rounded-md mt-2 ${
              open ? 'p-2' : 'p-'
            }`}
            onClick={() => navigate(`/${userState.username}`)}
          >
            <img
              src={userState.profileImage}
              alt="profile"
              className={`rounded-full ${
                open ? 'w-12 h-12' : 'w-11 h-11 ml-1.5 px-0.5'
              }`}
            />

            <span
              className={`text-black origin-left font-bold text-sm mt-3 ml-1 duration-300 ${
                !open && 'scale-0 -mb-7'
              }`}
            >
              {userState.firstName} {userState.lastName}
            </span>
          </li>
        </ul>

        <ul className={`pt-2 ${!open && 'ml-1.5'}`}>
          {Menus.map(menu => (
            <li
              key={menu.id}
              className=" text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-facebook-greyHover rounded-md my-5"
              onClick={menu.handler}
            >
              <span className="text-2xl block float-left text-indigo-500">
                <menu.icon.iconTitle />
              </span>
              <span
                className={`text-base font-medium text-black flex-1 ${
                  !open && 'hidden'
                }`}
              >
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
