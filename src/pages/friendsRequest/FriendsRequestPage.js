import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import Header from '../../components/home/Header/Header';
import { axiosInstance } from '../../network/axiosInstance';
import FriendRequests from '../../components/friends/FriendRequests';
import SideBarFriends from '../../components/friends/SideBarFriends';

const FriendsRequestPage = () => {

  const dispatchOne=useDispatch();

  useEffect(()=>{
     axiosInstance.get('/friends/friendRequest')
     .then(res=>{
      console.log(res);
      dispatchOne(addUserData(res.data));
      
     })
     .catch(err=>console.log(err));
  
  });


  return (
    <>
    <Header/>     
    <div className='flex fixed z-10 w-full bg-gray-200 dark:bg-darkBgColor dark:text-white '>
    <SideBarFriends/>
    <div className='block relative h-full w-full mt-5 '>
       
  
        <div className='flex font-bold text-xl ml-6  '>
          Friend requests
        </div>
        <FriendRequests/>
 
    </div>   
  
</div>
 
    </>
 
  )
}

export default FriendsRequestPage;