import React from 'react';
import { FaFacebook, FaSearch, FaFacebookMessenger } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { RiGroupFill } from 'react-icons/ri';
// import { HiUserGroup } from 'react-icons/hi';
import { BsBellFill } from 'react-icons/bs';
import profileImg from '../../../assets/images/default_profile.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="py-4 px-6 bg-gray-100 text-gray-500 shadow-lg flex align-baseline justify-between">
      <div className="flex">
        <FaFacebook className="text-facebook-blue text-4xl mr-5" />

        <div className="relative mb-4">
          <input
            type="text"
            className="px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded-full focus:text-gray-700 focus:bg-white focus:outline-none w-24 md:w-full"
            placeholder="Search"
          />
          <FaSearch className="absolute top-1/4 right-3 md:right-5" />
        </div>
      </div>

      <div className="flex mt-1">
        <TiHome className="hover:text-facebook-blue text-3xl mr-1 md:mr-10" />

        <RiGroupFill className="hover:text-facebook-blue text-3xl ml-1 md:ml-10" />

        {
          //   <HiUserGroup className="hover:text-facebook-blue text-4xl ml-1 md:ml-20" />
        }
      </div>

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
            className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0
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
                to={"/profile"}
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
            className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0
    "
            aria-labelledby="dropdownMenuButton3"
          >
            <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to={"/profile"}
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
                src={profileImg}
                className="rounded-full"
                alt="profile img"
                loading="lazy"
              />
            </div>
          </a>
          <ul
            className="
          dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="/"
              >
                Action
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="/"
              >
                Another action
              </a>
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
      </div>
    </nav>
  );
};

export default Header;
