import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Intro() {
    const userState = useSelector(state =>state.userData.userData);
    const [bio, setBio] = useState(false);
    const [showBioButton, setShowBioButton] = useState(true);
    return (
        <div className="bg-white dark:bg-darkBgSideBar dark:text-white my-3 p-4 rounded-xl shadow-md">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Intro
            </div>
            {showBioButton&&<div className='text-center m-3'>
                {userState.intro}
            </div>}
            {bio&&<div className='w-full'>
                <div className='flex justify-center'>
                    <textarea rows="3" className="bg-slate-200 rounded-lg p-2 w-full border border-slate-400 resize-none hover:border-blue-500 focus:border-blue-500 focus:bg-white">{userState.intro}</textarea>
                </div>
                <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                    <div className="bg-slate-200 rounded-lg p-2 cursor-pointer hover:brightness-95" onClick={()=>{setBio(false);setShowBioButton(true)}}>
                        <span className="font-semibold ml-1">cancel</span>
                    </div>
                    <div className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                        <span className="font-semibold ml-1">Save</span>
                    </div>
                </div>
            </div>}
            <div>
                {showBioButton&&<div className="bg-slate-200 dark:bg-darkBgColor rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95" onClick={()=>{setBio(true);setShowBioButton(false)}}>
                    <span className="font-semibold text-sm ml-1">Edit Bio</span>
                </div>}
                <div className="bg-slate-200 dark:bg-darkBgColor rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Edit details</span>
                </div>
                <div className="bg-slate-200 dark:bg-darkBgColor rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Add Hobbies</span>
                </div>
            </div>
        </div>
    )
}

export default Intro;