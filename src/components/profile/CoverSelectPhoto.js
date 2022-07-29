import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';

function CoverSelectPhoto() {
    const userState = useSelector(state =>state.userData.userData);
    const chooseCover = ()=>{
        
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
            <div className='w-2/4 mx-auto my-32 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white'>
                <div className='relative mb-3'>
                    <div className='text-center text-xl'>Select Photo</div>
                    <div className='absolute right-2 top-0 text-xl'>
                        <AiOutlineClose onClick={()=>{}}/>
                    </div>
                </div>
                <hr></hr>
                <div className='grid grid-cols-3 gap-3 my-3'>
                {userState?.gallery?.map((photo, index)=>{
                    return(
                        <img key={index} src={photo} alt="photos" className="w-full h-24 rounded-md"
                                onClick={()=>chooseCover()}></img>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default CoverSelectPhoto;