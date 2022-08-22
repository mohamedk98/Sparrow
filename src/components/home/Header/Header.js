import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { RiGroupFill } from 'react-icons/ri';
import { BsBellFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { GrLanguage } from 'react-icons/gr';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsToggleOn } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
import SearchMenu from './SearchMenu';
import { axiosInstance } from '../../../network/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../../../hooks/useDarkMode';
import { removeAuthentication } from '../../../store/userSlice/UserSlice';
import logo from '../../../assets/images/Sparrow_Sub.png';
import i18next, { t } from 'i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { addUserData } from '../../../store/userSlice/UserDataSlice';

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    country_code: 'sa',
    dir: 'rtl',
  },
];

const Header = () => {
  const navigate = useNavigate();
  // For home and friends icons active style:
  const location = useLocation();

  // get loggedInUserData:
  const userState = useSelector(state => state.userData.userData);

  const [darkMode, setDarkMode] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  // Search:
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);

  const searchHandler = async () => {
    if (searchTerm === '') {
      setResult('');
    } else {
      const res = await axiosInstance.get(`/search/:${searchTerm}`);
      setResult(res.data);
    }
  };

  //logout functionality
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeAuthentication());
    axiosInstance.post('/logout').then(() => {
      navigate('/login');
    });
  };

  const acceptFriendRequest = friendId => {
    axiosInstance.patch(`/friends/friendRequest/${friendId}`).then(response => {
      dispatch(addUserData(response.data));
    });
  };

  const removeFriendRequest = friendId => {
    axiosInstance
      .delete(`/friends/friendRequest/${friendId}`)
      .then(response => {
        dispatch(addUserData(response.data));
      });
  };

  //Start change Language
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';

  //End change language

  return (
    <nav
      dir="ltr"
      id="header"
      className="pt-3 px-6 dark:bg-zinc-800 transition duration-700  bg-slate-100 text-gray-500 shadow-md flex align-baseline justify-between sticky-top z-60"
    >
      <div className="flex">
        <div className="flex items-center">
          <img
            alt="logo"
            src={logo}
            className="text-indigo-500 text-4xl mr-5 h-14 w-14 -mt-5  rounded-full hover:cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              navigate('/');
            }}
          />
          {/*Start Search Input */}
          <div
            className="relative mb-4"
            onClick={() => {
              setShowSearchMenu(true);
            }}
          >
            <input
              type="text"
              className="px-3 py-1.5 text-gray-700  bg-white border border-solid border-gray-300 rounded-full focus:text-gray-700 focus:bg-white focus:outline-none w-24 md:w-full"
              placeholder={`${t('Search')}`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyUp={searchHandler}
            />
            <FaSearch className="absolute top-1/4 right-3 md:right-5" />
          </div>
        </div>
        {showSearchMenu && (
          <SearchMenu setShowSearchMenu={setShowSearchMenu} result={result} />
        )}
      </div>
      {/*End of Search Input */}

      <Link
        to={'/'}
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        className={`${
          location.pathname === '/' && 'border-b-2 border-b-blue-500'
        }
        } w-20 -mx-10 md:-mx-20 mt-1.5`}
      >
        <TiHome
          className={`${
            location.pathname === '/' && 'text-indigo-500 hover:bg-inherit'
          } hover:text-indigo-500 text-3xl mr-1 md:mr-10 hover:bg-gray-200 px-5 py-3 w-full h-14 -mt-3`}
        />
      </Link>

      {/* <Link
        to={`/${userState.username}/friends`}
        className={`${
          location.pathname === `/${userState.username}/friends` &&
          ' border-b-2 border-b-blue-500'
        } w-20 -mx-10 md:-mx-20 mt-1.5`}
      >
        <RiGroupFill
          className={`${
            location.pathname === `/${userState.username}/friends` &&
            'text-indigo-500 hover:bg-inherit'
          }  hover:text-indigo-500 text-3xl hover:bg-gray-200 px-5 py-3 w-full h-14 b -mt-3 `}
        />
      </Link> */}
      {/* Friends Request */}
      <div className="dropdown relative mr-1 md:mr-10 mt-2">
        <a
          className="border-b-2 border-b-blue-500 "
          href="/"
          id="friendRequests"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <RiGroupFill
            className={`hover:text-indigo-500 text-3xl hover:bg-gray-200 px-5 py-3 w-full h-14 b -mt-3 `}
          />
          <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-5 ml-12 py-0 px-1.5">
            {userState?.friendsRequests?.length === 0
              ? ''
              : userState?.friendsRequests?.length}
          </span>
        </a>
        <ul
          className="dropdown-menu min-w-max absolute hidden  bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0 overflow-y-auto max-h-72
    "
          aria-labelledby="friendRequests"
        >
          {userState?.friendsRequests?.length > 0 ? (
            userState?.friendsRequests?.map((friendRequest, idx) => (
              <li key={idx}>
                <div className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 ">
                  <div className="flex flex-row items-center ">
                    <img
                      alt="notifications"
                      src={friendRequest?.userId?.profileImage}
                      className="h-12 w-12 rounded-full mx-2"
                    />
                    <span className="font-bold">
                      {` ${friendRequest?.userId?.firstName} 
                    ${friendRequest.userId.lastName}`}
                      <span className="font-normal">
                        {' '}
                        has sent you a friend request
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-4">
                    <button
                      className="bg-indigo-500 py-2 px-4 rounded-lg text-white"
                      onClick={() =>
                        acceptFriendRequest(friendRequest?.userId?._id)
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-gray-200 py-2 px-4 rounded-lg text-black"
                      onClick={() =>
                        removeFriendRequest(friendRequest.userId._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-5 font-bold">No Friends requests available</li>
          )}
        </ul>
      </div>
      {/* Friends Request */}
      <div className="flex">
        {/* Messanger Menu */}

        {/* Notifications */}
        <div className="dropdown relative mr-1 md:mr-10">
          <a
            className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle hidden-arrow flex items-center"
            href="/"
            id="dropdownMenuButton3"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center">
              <BsBellFill className="hover:text-indigo-500 w-11/12 h-6" />
            </div>
            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-9 ml-7 py-0 px-1.5">
              {userState?.notifcations?.length === 0
                ? ''
                : userState?.notifcations?.length}
            </span>
          </a>
          <ul
            className="dropdown-menu min-w-max absolute hidden  bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0 overflow-y-auto max-h-72
    "
            aria-labelledby="dropdownMenuButton3"
          >
            {userState?.notifcations?.length > 0 ? (
              userState?.notifcations?.map((singleNotification, idx) => (
                <li key={idx}>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                    to={'/profile'}
                  >
                    <div className="flex flex-row items-center ">
                      <img
                        alt="notifications"
                        src={
                          singleNotification.notificationId.from.profileImage
                        }
                        className="h-12 w-12 rounded-full mx-2"
                      />
                      {` ${singleNotification.notificationId.from.firstName} 
                    ${singleNotification.notificationId.from.lastName} ${singleNotification.notificationId.message}`}
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-5 font-bold">No Notifications available</li>
            )}
          </ul>
        </div>
        {/* Notifications */}
        <div className="dropdown relative">
          <a
            className="dropdown-toggle flex items-center hidden-arrow"
            href="/"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="w-10">
              {userState?.profileImage ? (
                <img
                  src={userState.profileImage}
                  className="rounded-full w-10 h-10"
                  alt="profile img"
                  loading="lazy"
                />
              ) : (
                <Skeleton
                  circle
                  containerClassName="avatar-skeleton"
                  className="dark:bg-zinc-700 w-10 h-10"
                  highlightColor={`${
                    localStorage.theme === 'dark' && '#3f3f46'
                  }`}
                />
              )}
            </div>
          </a>
          <ul
            className="
          dropdown-menu min-w-max absolute hidden dark:bg-zinc-800 transition duration-700  bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <Link
                className="dropdown-item  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:text-zinc-800"
                to={`/${userState.username}`}
              >
                {t('profile')}
              </Link>
            </li>
            <li>
              <button className="dropdown-item dark:text-white text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 dark:hover:text-zinc-800  flex">
                {t('Dark_mode')}
                {darkMode && (
                  <BsToggleOn
                    className="text-indigo-500 text-2xl ml-3 -mt-0.5"
                    onClick={() => {
                      localStorage.theme === 'dark' && setDarkMode(!darkMode);
                      setTheme(colorTheme);
                    }}
                  />
                )}
                {!darkMode && (
                  <BsToggle2Off
                    className="text-2xl ml-3 -mt-0.5"
                    onClick={() => {
                      setDarkMode(!darkMode);
                      setTheme(colorTheme);
                    }}
                  />
                )}
              </button>
            </li>
            <li
              className="dropdown-item dark:text-white text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 flex cursor-pointer align-baseline justify-center"
              onClick={() => logoutHandler()}
            >
              {<BiLogOut className="text-xl  text-indigo-500 mr-2" />}
              Logout
            </li>
          </ul>
        </div>

        <div className="dropdown  relative mr-1 pl-5 md:mr-10">
          <a
            className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle hidden-arrow flex items-center
        "
            href="/"
            id="dropdownMenuButton1"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className=" w-10 h-10 dark:bg-slate-100 rounded-full flex justify-center items-center">
              <GrLanguage className="w-11/12 h-6 font-bold text-2xl" />
            </div>
          </a>
          <ul
            className="dropdown-menu min-w-max absolute hidden dark:bg-zinc-800 transition duration-150 bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton1"
          >
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <button
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}
                  className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
