import React, { useState } from 'react';
import { FaFacebook, FaSearch, FaFacebookMessenger } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { RiGroupFill } from 'react-icons/ri';
import { BsBellFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsToggleOn } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
import SearchMenu from './SearchMenu';
import { axiosInstance } from '../../../network/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../../../hooks/useDarkMode';
import { removeAuthentication } from '../../../store/userSlice/UserSlice';

const Header = () => {
  const navigate = useNavigate();
  // For home and friends icons active style:
  const location = useLocation();
  const [activeHome, setActiveHome] = useState(false);
  const [activeFriends, setActiveFriends] = useState(false);

  // get loggedInUserData:
  const userState = useSelector(state => state.userData.userData);

  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  // Dark mode:
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
    console.log(result);
  };

  //logout functionality
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeAuthentication());
    axiosInstance.post('/logout').then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="pt-3 px-6 bg-gray-100 text-gray-500 shadow-md flex align-baseline justify-between sticky-top z-60">
      <div className="flex">
        <div className="flex">
          <FaFacebook
            className="text-facebook-blue text-4xl mr-5"
            onClick={() => navigate('/')}
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
              className="px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded-full focus:text-gray-700 focus:bg-white focus:outline-none w-24 md:w-full"
              placeholder="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyUp={searchHandler}
            />
            <FaSearch className="absolute top-1/4 right-3 md:right-5" />
          </div>
        </div>
        {result.length > 0 && showSearchMenu && (
          <SearchMenu setShowSearchMenu={setShowSearchMenu} result={result} />
        )}
      </div>
      {/*End of Search Input */}

      <Link
        to={'/'}
        className={`${
          location.pathname === '/' && 'border-b-2 border-b-blue-500'
        }
        } w-20 -mx-10 md:-mx-20 mt-1.5`}
      >
        <TiHome
          className={`${
            location.pathname === '/' && 'text-facebook-blue hover:bg-inherit'
          } hover:text-facebook-blue text-3xl mr-1 md:mr-10 hover:bg-gray-200 px-5 py-3 w-full h-14 -mt-3`}
        />
      </Link>

      <Link
        to={`/${userState.username}/friends`}
        className={`${
          location.pathname === `/${userState.username}/friends` &&
          'border-b-2 border-b-blue-500'
        } w-20 -mx-10 md:-mx-20 mt-1.5`}
      >
        <RiGroupFill
          className={`${
            location.pathname === `/${userState.username}/friends` &&
            'text-facebook-blue hover:bg-inherit'
          } hover:text-facebook-blue text-3xl hover:bg-gray-200 px-5 py-3 w-full h-14 b -mt-3 `}
        />
      </Link>

      <div className="flex">
        <div className="dropdown relative mr-1 md:mr-10">
          <a
            className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle hidden-arrow flex items-center
        "
            href="/"
            id="dropdownMenuButton1"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center">
              <FaFacebookMessenger className="hover:text-facebook-blue w-11/12 h-6" />
            </div>

            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-9 ml-7 py-0 px-1.5">
              1
            </span>
          </a>
          <ul
            className="dropdown-menu min-w-max absolute hidden bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0
    "
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <div className="relative dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                <input
                  type="text"
                  className="px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded-full focus:text-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Search"
                />
                <FaSearch className="absolute right-7 top-1/3" />
              </div>
            </li>
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to={'/profile'}
              >
                Action
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="/"
              >
                Something else here
              </a>
            </li>
          </ul>
        </div>

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
              <BsBellFill className="hover:text-facebook-blue w-11/12 h-6" />
            </div>
            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-9 ml-7 py-0 px-1.5">
              1
            </span>
          </a>
          <ul
            className="dropdown-menu min-w-max absolute hidden bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0
    "
            aria-labelledby="dropdownMenuButton3"
          >
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to={'/profile'}
              >
                Profile
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="1"
              >
                Another action
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="1"
              >
                Something else here
              </a>
            </li>
          </ul>
        </div>

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
              <img
                src={userState.profileImage}
                className="rounded-full w-10 h-10"
                alt="profile img"
                loading="lazy"
              />
            </div>
          </a>
          <ul
            className="
          dropdown-menu min-w-max absolute hidden bg-white text-base float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to={`/${userState.username}`}
              >
                My Profile
              </Link>
            </li>
            <li>
              <button className="dropdown-item text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 flex">
                Dark mode{' '}
                {darkMode && (
                  <BsToggleOn
                    className="text-facebook-blue text-2xl ml-3 -mt-0.5"
                    onClick={() => {
                      setDarkMode(!darkMode);
                      // setTheme(colorTheme);
                    }}
                  />
                )}
                {!darkMode && (
                  <BsToggle2Off
                    className="text-2xl ml-3 -mt-0.5"
                    onClick={() => {
                      setDarkMode(!darkMode);
                      // setTheme(colorTheme);
                    }}
                  />
                )}
              </button>
            </li>
            <li>
              <button className="dropdown-item text-sm py-2 px-4 font-normal flex w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                <span
                  className={!lang ? 'text-facebook-blue' : ''}
                  onClick={() => {
                    setLang(!lang);
                  }}
                >
                  En
                </span>{' '}
                {lang && (
                  <BsToggleOn
                    className="text-facebook-blue text-2xl mx-3 -mt-0.5"
                    onClick={() => {
                      setLang(!lang);
                    }}
                  />
                )}
                {!lang && (
                  <BsToggle2Off
                    className="text-facebook-blue text-2xl mx-3 -mt-0.5"
                    onClick={() => {
                      setLang(!lang);
                    }}
                  />
                )}{' '}
                <span
                  className={lang ? 'text-facebook-blue' : ''}
                  onClick={() => {
                    setLang(!lang);
                  }}
                >
                  Ar
                </span>
              </button>
            </li>
            <li
              className="dropdown-item text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 flex cursor-pointer align-baseline justify-cente"
              onClick={() => logoutHandler()}
            >
              {<BiLogOut className="text-xl text-facebook-blue mr-2" />}
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
