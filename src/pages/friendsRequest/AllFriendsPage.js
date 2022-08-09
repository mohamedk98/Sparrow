import React,{useEffect,useState} from 'react';
import AllFriends from '../../components/friends/AllFriends';
import { useDispatch,useSelector } from 'react-redux';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import Header from '../../components/home/Header/Header';
import {MdPeople} from 'react-icons/md';
import Profile from '../profile/Profile';
import ProfilePosts from '../profile/ProfilePosts';
import SideBarFriends from '../../components/friends/SideBarFriends';



const AllFriendsPage = () => {

    const [friendClicked,setFriendClicked]=useState(false);

    const dispatch=useDispatch();

    useEffect(() => {
        axiosInstance.get('/friends')
        .then(res=>{
         console.log(res);
         dispatch(addUserData(res.data));
         
        })
        .catch(err=>console.log(err));
    });
    return (
        <>
        <Header/>     
        <div className='flex  fixed z-10 w-full h-screen overflow-y-scroll bg-gray-200 dark:bg-darkBgColor dark:text-white '>
        
        <AllFriends friendClicked={friendClicked} setFriendClicked={setFriendClicked}/>
        { friendClicked?
        <div className="w-full bg-slate-200 dark:bg-darkBgColor">
  
                <div className='w-full'>
                  <Profile/>
                    <ProfilePosts/>
               
                </div>
    
        </div>
       :(

        <div className='flex items-center justify-center flex-col  mx-auto '>
          <div className='md:text-5xl sm:text-xl  text-facebook-blue'>
          <MdPeople/>
          </div> 
       
        <div className='md:text-xl sm:text-sm mx-auto text-gray-500  font-bold p-2'>
           Select people's names to Go to their profile.
        </div>
        </div> 
  )}

        </div>
    </>
    );
}

export default AllFriendsPage;
