import React, { useEffect, useState } from 'react'
// import axiosInstance from '../../network/axiosInstance';
import cover from '../../assets/stories/2.png'

function Profile() {
    const [showCoverMenu, setShowCoverMenu] = useState(true)
    useEffect(()=>{
        //axiosInstance.get('/profile').then(res=>console.log(res))
    })
    return (
        <div>
            <div>
                <div className='max-w-5xl mx-auto'>
                    <div className='bg-slate-100 relative w-full h-96 rounded-t-none rounded-b-md'>
                        <img className='relative w-full h-96 rounded-t-none rounded-b-md' src={cover} alt="cover"></img>
                        <div className='absolute bottom-4 right-4'>
                            <div className='bg-white p-2 flex items-center text-sm font-semibold rounded-lg cursor-pointer' onClick={()=>{setShowCoverMenu(prev => !prev)}}>
                                <i></i>
                                Add Cover Photo
                            </div>
                            {showCoverMenu && (
                            <div className='bg-white p-2 rounded-lg absolute right-0 w-80 shadow shadow-slate-400'>
                                <div className='flex items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200'>
                                    <i></i>
                                    Select Photo
                                </div>
                                <div className='flex items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200'>
                                    <i></i>
                                    Upload Photo
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
