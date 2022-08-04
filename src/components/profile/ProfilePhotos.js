import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProfilePhotos() {
    const userState = useSelector(state =>state.userData.userData);
    return (
        <div className="bg-white dark:bg-darkBgSideBar dark:text-white my-3 p-4 rounded-xl shadow-md">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Photos
                <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200">
                    <Link to="/profile/photos">See all Photos</Link>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2.5 my-5'>
                {userState?.gallery?.slice(0,9).map((photo, index)=>{
                    return(
                        <img key={index} src={photo} alt="photos" className="w-full h-24 rounded-md"></img>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfilePhotos;