import React from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiSticker } from "react-icons/bi";
import { AiOutlineFileGif } from "react-icons/ai";
import { useSelector } from 'react-redux';

function Chat() {
    const userState = useSelector(state =>state.userData.userData);
    return (
        <div className='fixed bottom-0 right-3 w-80 h-96 rounded-t-xl bg-white shadow-lg shadow-gray-500'>
            <div className='flex justify-between p-2 border-b-2 border-slate-200'>
                <div className='flex'>
                    <img className="w-8 h-8 rounded-full cursor-pointer" src={userState?.friends?.data?.userId?.firstName} alt="profilePic"></img>
                    <div className='flex mx-1 px-2 cursor-pointer rounded-lg hover:bg-slate-200'>
                        <span>Name</span>
                        <MdKeyboardArrowDown className='text-lg text-blue-500 m-1'/>
                    </div>
                </div>
                <div className='flex text-lg py-1.5 text-blue-500'>
                    <BsFillTelephoneFill className='mx-1 cursor-pointer'/>
                    <BsFillCameraVideoFill className='mx-1 cursor-pointer'/>
                    <AiOutlineMinus className='mx-1 cursor-pointer'/>
                    <AiOutlineClose className='mx-1 cursor-pointer'/>
                </div>
            </div>
            <div className='h-72'>
                
            </div>
            <div className='flex justify-between p-1.5 border-t-2 border-slate-200'>
                <div className='flex text-blue-500 text-xl'>
                    <AiFillPlusCircle className='mr-1 cursor-pointer'/>
                    <MdPhotoLibrary className='mr-1 cursor-pointer'/>
                    <BiSticker className='mr-1 cursor-pointer'/>
                    <AiOutlineFileGif className='cursor-pointer'/>
                </div>
                <div className='flex mx-2 bg-slate-200 rounded-2xl w-40'>
                    <input type="text" className='bg-slate-200 rounded-2xl w-32'></input>
                    <BsFillEmojiSmileFill className='text-xl text-blue-500 m-1 cursor-pointer'/>
                </div>
                <div className='flex'>
                    <AiFillLike className='text-xl text-blue-500 m-1 cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

export default Chat;