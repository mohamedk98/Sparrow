import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';

function About() {
    return (
        <div className="mt-3 bg-slate-200 shadow-md dark:bg-darkBgColor">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white dark:bg-darkBgSideBar dark:text-white my-3 p-4 rounded-xl">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    About
                                </div>
                                <div className='w-3/4 m-auto p-3 dark:text-white text-gray-600'>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <FaGraduationCap className='text-2xl'/>
                                            <span className='text-lg mx-2'>Studied ... at ...</span>
                                        </div>
                                        <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHome className='text-xl'/>
                                            <span className='text-lg mx-2'>Lives in ...</span>
                                        </div>
                                        <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHeart className='text-xl'/>
                                            <span className='text-lg mx-2'>single ...</span>
                                        </div>
                                        <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <BsFillTelephoneFill className='text-xl'/>
                                            <span className='text-lg mx-2'>Mobile 01002215252...</span>
                                        </div>
                                        <div className='flex'>
                                            <BiEditAlt className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                            <RiDeleteBin5Line className='text-lg mx-1 cursor-pointer rounded-full hover:bg-slate-200'/>
                                        </div>
                                    </div>
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