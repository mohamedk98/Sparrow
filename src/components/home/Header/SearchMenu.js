import React, { useRef } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useClickOutside from '../../clickOutside';
import profileImg from '../../../assets/images/default_profile.png';

const SearchMenu = ({ setShowSearchMenu, result }) => {
  const menu = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  return (
    <div
      className="bg-white dark:bg-zinc-800 transition duration-700 dark:text-white pt-1.5 px-4 absolute top-14 left-10 -mt-1 shadow-lg shadow-gray-500 items-start flex-col gap-1.5 rounded-lg  z-10 min-h-[400px] max-h-[70vh] overflow-y-auto p-10"
      ref={menu}
    >
      <div className="flex items-center pt-2.5 pb-2 pl-2.5 pr-3 w-64 ">
        <div className="mr-2" onClick={() => setShowSearchMenu(false)}>
          <BsArrowReturnLeft className="font-extrabold text-xl cursor-pointer hover:bg-gray-100 hover:rounded-lg text-black" />
        </div>
      </div>
      {/* Search History */}

      {result && result.length>0 ? (
        result.map((user, index) => (
          <Link
            to={`/${user.username}`}
            key={index}
            className="relative w-full flex items-center hover:bg-gray-100 gap-2 p-1 rounded-lg"
          >
            <div className="inline-flex w-full">
              <img
                src={user.profileImage ? user.profileImage : profileImg}
                className="rounded-full w-9 h-9 object-cover border border-gray-100 "
                alt="profile_pic"
              />
              <span className="font-semibold text-sm mt-2 pl-2 ">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <div className="inline-flex w-full">
          <span className="font-semibold text-sm mt-2 pl-2 ">No result</span>
        </div>
      )}
    </div>
  );
};

export default SearchMenu;
