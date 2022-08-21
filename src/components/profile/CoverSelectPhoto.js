import { t } from 'i18next';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';

function CoverSelectPhoto({choosePic, setChoosePic}) {
    const userState = useSelector(state =>state.userData.userData);
    const dispatch = useDispatch();
    const chooseCover = (photo)=>{
        axiosInstance
        .patch(`/profile/coverImage`,{coverPhotoUrl:photo})
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
        setChoosePic(false)
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
            <div className='lg:w-3/5 w-4/5 mx-auto my-32 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100'>
                <div className='relative mb-3'>
                    <div className='text-center text-xl'>{t('Add Cover Photo')}</div>
                    <div className='absolute right-2 top-0 text-xl cursor-pointer'>
                        <AiOutlineClose onClick={()=>setChoosePic(false)}/>
                    </div>
                </div>
                <hr></hr>
                <div className='grid grid-cols-3 gap-3 my-3'>
                {userState?.gallery?.map((photo, index)=>{
                    return(
                        <img key={index} src={photo} alt="photos" className="w-auto h-auto rounded-md"
                                onClick={()=>chooseCover(photo)}></img>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default CoverSelectPhoto;