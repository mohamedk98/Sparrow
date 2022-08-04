import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProfileFriends() {
    const userState = useSelector(state =>state.userData.userData);
    return (
        <div className="bg-white dark:bg-darkBgSideBar dark:text-white my-3 p-4 rounded-xl shadow-md">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Friends
                <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200">
                    <Link to="/profile/friends">See all Friends</Link>
                </div>
            </div>
            <div>
                <span>{userState?.friends?.data?.length} friends</span>
            </div>
            <div className='grid grid-cols-3 gap-2.5 my-5'>
                {userState?.friends?.data?.slice(0,9).map((friend, index)=>{
                    return(
                        <div className='h-32'>
                            <img key={index} src={friend.profileImage} alt="photos" className="w-full h-24 rounded-md"></img>
                            <span className='text-sm mt-3'>{friend.userId.firstName} {friend.userId.lastName}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfileFriends;