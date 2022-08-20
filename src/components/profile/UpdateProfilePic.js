import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { BiCrop } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import { t } from 'i18next';

function UpdateProfilePic({pic, newImage,setPic, formData, setUpdate, setChoosePic}) {
    const userState = useSelector((state) => state.userData.userData);
    const dispatch = useDispatch();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);
    const slider = useRef(null);

    const profilePicHandler = (pic)=>{

        let formData = new FormData();
        formData.append("profileImage", newImage);
        axiosInstance
        .post("/upload/profileImage", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            dispatch(addUserData(response.data.newProfile))
            setPic(userState.profileImage)})
        setUpdate(false)
        setChoosePic(false)
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setcroppedAreaPixels(croppedAreaPixels);
    }, [])

    const zoomOut = () =>{
        slider.current.stepDown();
        setZoom(slider.current.value);
    }

    const zoomIn = () =>{
        slider.current.stepUp();
        setZoom(slider.current.value);
    }

    const getCroppedImage = useCallback(async ()=>{
        try{
            const img = await getCroppedImg(pic, croppedAreaPixels);
            setZoom(1);
            setCrop({x:0, y:0})
            setPic(img);
            return img;
        } catch (error){
            console.log(error)
        }
    },[croppedAreaPixels, pic, setPic])

    return (
        <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
            <div className='lg:w-3/5 w-4/5 mx-auto mt-5 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100'>
                <div className='relative mb-3'>
                    <div className='text-center text-xl'>{t('Update Picture')}</div>
                    <button className='absolute right-2 top-0 text-xl'>
                        <AiOutlineClose onClick={()=>{setUpdate("")}}/>
                    </button>
                </div>
                <hr></hr>
                <div className='relative h-full w-full p-2'>
                    <div className='relative flex justify-center h-80 w-full'>
                        <Cropper
                            image={pic}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape="round"
                            />
                    </div>
                    <div className='w-3/5 mx-auto mt-4 flex justify-between items-center'>
                        <div onClick={()=> zoomOut()}>
                            <AiOutlineMinus className='text-xl cursor-pointer'/>
                        </div>
                        <div>
                            <input type="range" min={1} max={3} step={0.1} value={zoom} ref={slider} onChange={e => setZoom(e.target.value)} className='w-11/12 lg:w-96 cursor-pointer'></input>
                        </div>
                        <div onClick={()=> zoomIn()}>
                            <AiOutlinePlus className='text-xl cursor-pointer'/>
                        </div>
                    </div>
                    <div className='flex justify-center gap-2.5 w-1/3 m-auto'>
                        <div className='flex justify-between items-center gap-2 my-3 p-2 cursor-pointer bg-slate-200 rounded-lg hover:brightness-95 dark:bg-zinc-500 dark:hover:brightness-95' onClick={()=>getCroppedImage()}>
                            <BiCrop className='text-lg'/>
                            <span>{t('Crop Photo')}</span>
                        </div>
                    </div>
                </div>
                <div className='relative h-20'>
                    <div className='absolute right-2 flex justify-end gap-2.5 w-1/3'>
                        <div className='flex justify-between items-center gap-2 my-3 p-2 cursor-pointer text-indigo-500 dark:text-slate-100 rounded-lg hover:brightness-95' onClick={()=>setUpdate(false)}>
                            <span>{t('cancel')}</span>
                        </div>
                        <div className='flex justify-between items-center gap-2 my-3 py-2 px-8 cursor-pointer bg-indigo-500 text-white rounded-lg hover:brightness-95 dark:bg-zinc-500 dark:hover:brightness-95'>
                            <button onClick={()=>profilePicHandler(pic)}>{t('save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfilePic;