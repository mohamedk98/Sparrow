import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../../store/userSlice/UserDataSlice";
import { AiOutlineClose } from 'react-icons/ai';
import { axiosInstance } from '../../network/axiosInstance';
import { t } from 'i18next';

function UpdateInfos({updateInfo, setUpdateInfos}) {
    const userState = useSelector((state) => state.userData.userData);
    const dispatch = useDispatch();
    const [infosInput, setInfosInput] =useState({
        work:"",
        major:"",
        university:"",
        town:"",
        relationship:"",
        mobile:""
    })

    const infosHandler = (e) =>{
        e.preventDefault();
        axiosInstance
        .patch("/profile/about", {data:infosInput})
        .then((response) => {
            dispatch(addUserData(response.data))
            setUpdateInfos(false)
        })
        .catch(error => console.log(error));
    }
    return (
    <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
        <div className='lg:w-3/5 w-4/5 mx-auto mt-5 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100'>
            <div className='relative mb-3 text-black dark:text-slate-100'>
                <div className='text-center text-xl font-semibold'>{t('Update your Infos')}</div>
                <button className='absolute right-2 top-0 text-xl' onClick={()=>setUpdateInfos(false)}>
                    <AiOutlineClose/>
                </button>
            </div>
            <hr></hr>
            <div className='text-lg my-4'>
                <form>
                    <div className='m-2'>
                        <span className='ml-2 text-indigo-300 dark:text-slate-100'>{t('Work')}</span>
                        <input
                        type="text"
                        defaultValue={userState.work}
                        className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400' 
                        placeholder='Add work place'
                        onChange={(e)=>setInfosInput({...infosInput, work:e.target.value})}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='ml-2 text-indigo-300 dark:text-slate-100'>{t('Major')}</span>
                        <input
                        type="text"
                        defaultValue={userState.major}
                        className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400' 
                        placeholder='Add Major'
                        onChange={(e)=>setInfosInput({...infosInput, major:e.target.value})}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='ml-2 text-indigo-300 dark:text-slate-100'>{t('University')}</span>
                        <input
                        type="text"
                        defaultValue={userState.university}
                        className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400' 
                        placeholder='Add University'
                        onChange={(e)=>setInfosInput({...infosInput, university:e.target.value})}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='ml-2 text-indigo-300 dark:text-slate-100'>{t('Town')}</span>
                        <input
                        type="text"
                        defaultValue={userState.town}
                        className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400' 
                        placeholder='Add Town'
                        onChange={(e)=>setInfosInput({...infosInput, town:e.target.value})}
                        />
                    </div>
                    <div className='m-2 text-indigo-500'>
                        <label className='block text-indigo-300 dark:text-slate-100' htmlFor="relationship">Relationship</label>
                        <select className='w-full dark:text-slate-100 dark:bg-zinc-500 text-black text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400'
                                name="relationship"
                                defaultValue={userState.relationship}
                                id="relationship"
                                onChange={(e)=>setInfosInput({...infosInput, relationship:e.target.value})}>
                            <option value="" disabled defaultValue>{t('Your Relationship')}</option>
                            <option value="Single">{t('Single')}</option>
                            <option value="Married">{t('Married')}</option>
                            <option value="Divorced">{t('Divorced')}</option>
                            <option value="Widowed">{t('Widowed')}</option>
                            <option value="In a Relationship">{t('In a Relationship')}</option>
                            <option value="It's Complicated">{t("It's Complicated")}</option>
                        </select>
                    </div>
                    <div className='m-2'>
                        <span className='ml-2 text-indigo-300 dark:text-slate-100'>{t('Mobile')}</span>
                        <input
                        type="text"
                        defaultValue={userState.mobile}
                        className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400' 
                        placeholder='Add Mobile'
                        onChange={(e)=>setInfosInput({...infosInput, mobile:e.target.value})}
                        />
                    </div>
                    <div className='mx-2'>
                        <button  
                                className='text-white bg-indigo-500 p-2 rounded-lg m-2 hover:brightness-95'
                                onClick={(e)=>infosHandler(e)}
                                >{t('save')}</button>
                        <button className=' dark:bg-zinc-500 dark:hover:brightness-95 hover:bg-slate-200 p-2 rounded-lg m-2'
                                onClick={()=>setUpdateInfos(false)}
                        >{t('cancel')}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default UpdateInfos;