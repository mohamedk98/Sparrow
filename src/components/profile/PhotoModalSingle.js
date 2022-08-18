import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

function PhotoModalSingle({photo,setOpenPhoto}) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto">
            <div className="lg:w-9/12 w-11/12 h-fit mx-auto my-5 p-3 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100">
                <div className="relative mb-0">
                    <button className="absolute right-2 top-0 text-xl"  
                        onClick={() => {
                                setOpenPhoto(false);
                            }}>
                        <AiOutlineClose className='bg-slate-200 text-indigo-500 dark:text-gray-500 rounded-lg mt-2'/>
                    </button>
                </div>
                <div className='flex justify-center'>
                    <img className='rounded-lg w-auto h-screen' src={photo} alt="photos"></img>       
                </div>
            </div>
        </div>
    )
}

export default PhotoModalSingle