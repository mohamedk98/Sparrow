import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BsArrowReturnLeft} from 'react-icons/bs';

const AllFriends = ({friendClicked,setFriendClicked}) => {
    const userState = useSelector(state =>state.userData.userData);

  return (

<div className='bg-facebook-grey dark:bg-darkBgSideBar dark:text-white w-[20rem] h-screen p-5 pt-8'>
   <Link to='/friends/friendRequest'>
   <div className='mr-2' >
        <BsArrowReturnLeft className='font-extrabold text-xl cursor-pointer  hover:rounded-full hover:text-2xl text-black'/>
    </div>
   </Link>


{userState.friends?userState.friends.data?.map((el,index)=>
(


  <Link to={`/:${el.userId.username}`}
   key={el.userId._id}
   onClick={()=>{setFriendClicked(true)}}
   >
    <li  

    className=' list-none relative w-full flex items-center text-sm cursor-pointer p-2 hover:bg-gray-200 rounded-md mt-2'>
     
            <img src={el.userId.profileImage} alt="photos" className="rounded-full w-16 h-16 object-cover border border-gray-100"></img>
            <span className='font-semibold text-sm mt-2 pl-2 '>{el.userId.firstName} {el.userId.lastName}</span>
         
    </li>
  </Link>

     ))
     :
     <div className='flex items-center justify-center flex-col  mx-auto'>
     <p>You have no friends yet</p>
    </div>
}
</div> 

  )
}

export default AllFriends