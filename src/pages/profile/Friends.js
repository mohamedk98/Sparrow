import React from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';

function Friends() {
    const userState = useSelector(state =>state.userData.userData);
    return (
        <div className="mt-3 bg-slate-200 shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white my-3 p-4 rounded-xl">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    Friends
                                </div>
                                <div className='grid grid-cols-2 gap-2.5 my-5'>
                                    {userState?.friends?.data?.map((friend, index)=>{
                                        return(
                                            <div className='flex  justify-between  rounded-lg p-3 border gap-2.5 h-32'>
                                                <div className='flex items-center'>
                                                    <img key={index} src={friend.profileImage} alt="photos" className="w-full rounded-md"></img>
                                                    <span className='text-md font-semibold'>{friend.userId.firstName} {friend.userId.lastName}</span>
                                                </div>
                                                <div className='flex items-center cursor-pointer'>
                                                    <BsThreeDots className='text-xl font-semibold rounded-full w-8 h-8 p-1 hover:bg-slate-200'/>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends;