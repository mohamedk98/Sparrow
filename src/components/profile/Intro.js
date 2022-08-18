import { t } from 'i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../network/axiosInstance';
import { addOtherUserData } from '../../store/userSlice/OtherUsersData';
import Hobbies from './Hobbies';
import UpdateInfos from './UpdateInfos';

function Intro() {
    const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
    const dispatch = useDispatch();
    const [bioInput, setBioInput] = useState(false);
    const [bio, setBio] = useState("");
    const [showBioButton, setShowBioButton] = useState(true);
    const [updateInfos, setUpdateInfos] = useState(false)
    const [showHobbies, setShowHobbies] = useState(false)

    const introHandler = (e) =>{
        axiosInstance
        .patch("/profile/intro", {intro:bio})
        .then((response) => {
            dispatch(addOtherUserData(response.data))
            setBioInput(false);
            setShowBioButton(true)
        })
        .catch(error => console.log(error));
    }
    return (
        <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl shadow-md">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                {t('Intro')}
            </div>
            {showBioButton&&<div className='text-center m-3'>
                {otherUserState.intro}
            </div>}
            {bioInput&&<div className='w-full'>
                    <div className='flex justify-center'>
                        <textarea rows="3" className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-2 w-full border border-slate-400 resize-none hover:border-indigo-500 focus:border-indigo-500 focus:bg-white"
                                    onChange={(e)=>setBio(e.target.value)}
                        >{otherUserState.intro}</textarea>
                    </div>
                    <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                        <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95" onClick={()=>{setBioInput(false);setShowBioButton(true)}}>
                            <button className="font-semibold ml-1">{t('cancel')}</button>
                        </div>
                        <div className="bg-indigo-500 dark:bg-zinc-700 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                            <button className="font-semibold ml-1" onClick={(e)=>introHandler(e)}>{t('save')}</button>
                        </div>
                    </div>
            </div>}
            { otherUserState.currentLoginAccount&&<div>
                {showBioButton&&<div className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95" onClick={()=>{setBioInput(true);setShowBioButton(false)}}>
                    <span className="font-semibold text-sm ml-1">{t('Edit _bio')}</span>
                </div>}
                <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95" onClick={()=>setUpdateInfos(true)}>
                    <span className="font-semibold text-sm ml-1">{t('Edit_details')}</span>
                </div>
                {updateInfos&&<UpdateInfos updateInfos={updateInfos} setUpdateInfos={setUpdateInfos}/>}
                <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95" onClick={()=>setShowHobbies(true)}>
                    <span className="font-semibold text-sm ml-1">{t('add_hobbies')}</span>
                </div>
                {showHobbies&&<Hobbies showHobbies={showHobbies} setShowHobbies={setShowHobbies}/>}
            </div>}
        </div>
    )
}

export default Intro;