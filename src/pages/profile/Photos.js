import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PhotoModal from '../../components/profile/PhotoModal';

function Photos() {
    const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
    const [openPhoto, setOpenPhoto] = useState("");
    const {t}=useTranslation();
    return (
        <div className="mt-3 bg-slate-200 dark:bg-zinc-900 transition duration-700 shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    {t('Photos')}
                                </div>
                                <div className='grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-2.5 m-5'>
                                {otherUserState?.gallery?.map((photo, index)=>{
                                    return(
                                        <div className='h-auto' key={index}>
                                            <img src={photo} alt="photos" 
                                            className="border dark:border-zinc-600 rounded-md w-full h-full"
                                            onClick={()=>setOpenPhoto(index)}
                                            ></img>
                                        </div>
                                    )
                                })}
                                {openPhoto&&<PhotoModal photo={openPhoto} gallery={otherUserState.gallery} setOpenPhoto={setOpenPhoto}/>}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Photos;