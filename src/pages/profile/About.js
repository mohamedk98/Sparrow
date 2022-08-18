import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaGraduationCap } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import UpdateInfos from '../../components/profile/UpdateInfos';
import { MdWork } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

function About() {
    const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
    const [updateInfos, setUpdateInfos] = useState(false)
    const {t}=useTranslation();
    return (
        <div className="mt-3 bg-slate-200 dark:bg-zinc-900 transition duration-700 shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                   {t('About')}
                                </div>
                                {otherUserState.currentLoginAccount&&(<div className='flex gap-2.5 items-center w-3/4 mx-auto mt-4 text-xl text-indigo-500 cursor-pointer' onClick={()=>setUpdateInfos(true)}>
                                    <IoIosAddCircle className='text-2xl'/>
                                    <span className='hover:underline underline-offset-4'>{t('Update your Details')}</span>
                                </div>)}
                                {updateInfos&&<UpdateInfos updateInfos={updateInfos} setUpdateInfos={setUpdateInfos}/>}
                                <div className='w-3/4 m-auto p-3 text-gray-600 dark:text-slate-100'>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <MdWork className='text-xl'/>
                                            <span className='text-lg mx-2'>{t('Works at')} <span className='underline'>{otherUserState.work}</span></span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <FaGraduationCap className='text-2xl'/>
                                            <span className='text-lg mx-2'>{t('Studied')} <span className='underline'>{otherUserState.major}</span> at <span className='underline'>{otherUserState.university}</span></span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHome className='text-xl'/>
                                            <span className='text-lg mx-2'>{t('Lives in')} <span className='underline'>{otherUserState.town}</span></span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <AiFillHeart className='text-xl'/>
                                            <span className='text-lg mx-2 underline'>{otherUserState.relationship}</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-3 p-2'>
                                        <div className='flex items-center'>
                                            <BsFillTelephoneFill className='text-xl'/>
                                            <span className='text-lg mx-2'>{t('Mobile')} <span className='underline'>{otherUserState.mobile}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    {t('Hobbies')}
                                </div>
                                <div className='flex flex-wrap gap-2.5 border my-3 rounded-lg p-3'>
                                    {otherUserState?.hobbies?.map((hobby, index)=>{
                                        return (
                                            <div key={index} className='flex h-fit items-center text-base py-2 px-3 rounded-3xl w-fit border bg-indigo-500 dark:bg-zinc-500 text-white'>
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