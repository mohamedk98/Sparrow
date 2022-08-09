import React from 'react';
import {RiUserShared2Fill} from 'react-icons/ri';
import {FaUserFriends} from 'react-icons/fa';
import {Link} from 'react-router-dom';


const SideBarFriends = () => {
  return (
    <div className='bg-facebook-grey dark:bg-darkBgSideBar dark:text-white w-64 h-screen p-5 pt-8'>
    <div className='friends_left_header'>
      <h2 className='text-2xl font-bold flex items-center gap-x-4 cursor-pointer p-2  rounded-md mt-2 '>Friends</h2>
    </div>
    <ul className='list-none'>

      <Link to='/friends/friendRequest'>
      <li
      className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 rounded-md mt-2'>
      <span className="text-2xl block float-left text-facebook-blue">
        <RiUserShared2Fill/>
      </span>
        Friend requests
      </li>
      </Link>

     
     <Link to='/friends'>
      <li 
      className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 rounded-md mt-2'>
        <span className="text-2xl block float-left text-facebook-blue">
          <FaUserFriends/>
        </span>
        All Friends
      </li>
      </Link>

    </ul>
    </div>  
  )
}

export default SideBarFriends