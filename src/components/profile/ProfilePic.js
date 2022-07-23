import React, { useState } from 'react';
import profilePic from "../../assets/stories/profile5.png";
import defaultPic from "../../assets/images/default_pic.png";
import { AiFillCamera } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import PicUploadModal from './PicUploadModal';

function ProfilePic() {
    const [choosePic, setChoosePic] = useState(false);
    const [pic, setPic] = useState(profilePic)
    const openModal = () =>{
        setChoosePic(true)
    }
    return (
        <div className="lg:w-10/12 m-auto flex lg:flex-row flex-col relative items-center justify-between gap-2.5 p-3 text-sm font-semibold rounded-lg">
            <div className="flex lg:flex-row flex-col gap-4 pt-4 pl-3 pb-0 pr-3">
                <div className="relative">
                <div className="w-44 h-44 rounded-full border-4 ml-5 border-white cursor-pointer hover:brightness-95 -translate-y-16" style={{backgroundImage:"url("+defaultPic+")", backgroundSize: 'cover'}}>
                    <img className="w-44 h-44 rounded-full" src={pic} alt="profilePic"></img>
                </div>
                <div className="absolute w-9 h-9 lg:right-2 right-20 bottom-16 grid justify-center items-center cursor-pointer bg-slate-200 rounded-full" onClick={openModal}>
                    {choosePic&&<PicUploadModal setChoosePic={setChoosePic} />}
                    <AiFillCamera className='w-6 h-6' />
                </div>
                </div>
                <div className="ml-4">
                    <div className="flex items-center gap-2.5 font-bold text-3xl">
                        Mohamed Ahmed
                    </div>
                    <div>
                    3 friends
                    </div>
                    <div>
                    photos
                    </div>
                </div>
            </div>
            <div className="flex gap-2.5 py-2.5 mb-2">
                <div className="bg-blue-600 rounded-lg flex items-center p-2 cursor-pointer text-white hover:brightness-95">
                <AiFillPlusCircle className="w-5 h-5 text-white" />
                <span className="ml-1">Add to story</span>
                </div>
                <div className="bg-slate-200 rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95">
                <MdEdit className="w-5 h-5" />
                <span className="ml-1">Edit profile</span>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic;