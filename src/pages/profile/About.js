import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaGraduationCap } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import UpdateInfos from '../../components/profile/UpdateInfos';
import { MdWork } from 'react-icons/md';

function About() {
    const userState = useSelector((state) => state.userData.userData);
    const dispatch = useDispatch();
    const [updateInfos, setUpdateInfos] = useState(false)
    
    return (
        <div className="mt-3 bg-slate-200 dark:bg-zinc-900 transition duration-700 shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    About
                                </div>
                                {userState.currentLoginAccount&&(<div className='flex gap-2.5 items-center w-3/4 mx-auto mt-4 text-xl text-blue-500 cursor-pointer' onClick={()=>setUpdateInfos(true)}>
                                    <IoIosAddCircle className='text-2xl'/>
                                    <span className='hover:underline underline-offset-4'>Update your Details</span>
                                </div>)}
                                {updateInfos&&<UpdateInfos updateInfos={updateInfos} setUpdateInfos={setUpdateInfos}/>}
                                <div className='w-3/4 m-auto p-3 text-gray-600 dark:text-slate-100'>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <MdWork className='text-xl'/>
                                            <span className='text-lg mx-2'>Works at <span className='underline'>{userState.work}</span></span>
                                        </div>
                                       {/*  <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div> */}
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <FaGraduationCap className='text-2xl'/>
                                            <span className='text-lg mx-2'>Studied <span className='underline'>{userState.major}</span> at <span className='underline'>{userState.university}</span></span>
                                        </div>
                                        {/* <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div> */}
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHome className='text-xl'/>
                                            <span className='text-lg mx-2'>Lives in <span className='underline'>{userState.town}</span></span>
                                        </div>
                                       {/*  <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div> */}
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHeart className='text-xl'/>
                                            <span className='text-lg mx-2 underline'>{userState.relationship}</span>
                                        </div>
                                       {/*  <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div> */}
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <BsFillTelephoneFill className='text-xl'/>
                                            <span className='text-lg mx-2'>Mobile <span className='underline'>{userState.mobile}</span></span>
                                        </div>
                                        {/* <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    Hobbies
                                </div>
                                <div className='flex flex-wrap gap-2.5 border my-3 rounded-lg p-3'>
                                    {userState?.hobbies?.map((hobby, index)=>{
                                        return (
                                            <div key={index} className='flex h-fit items-center text-base py-2 px-3 rounded-3xl w-fit border bg-blue-500 dark:bg-zinc-500 text-white'>
                                                <span>{hobby}</span>
                                            </div>)
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

export default About;