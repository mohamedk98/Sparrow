import React from 'react';
import profilePic from "../../assets/stories/profile5.png";
import defaultPic from "../../assets/images/default_pic.png";
import { AiFillCamera } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

function ProfilePic() {
    return (
        <div className="lg:w-10/12 m-auto flex lg:flex-row sm:flex-col relative items-center justify-between gap-2.5 p-3 text-sm font-semibold rounded-lg">
            <div className="flex lg:flex-row sm:flex-col gap-4 pt-4 pl-3 pb-0 pr-3">
                <div className="relative">
                <div className="rounded-full border-4 ml-5 border-white cursor-pointer hover:brightness-95" style={{width:"180px",height:"180px",transform:"translateY(-3.8rem)", backgroundImage:"url("+defaultPic+")", backgroundSize: 'cover'}}>
                    <img className="rounded-full" src={profilePic} style={{width:"180px",height:"180px"}} alt="profilePic"></img>
                </div>
                <div className="absolute bottom-16 grid justify-center items-center cursor-pointer bg-slate-200 rounded-full" style={{width:"36px",height:"36px", right:"0.55rem"}}>
                    <AiFillCamera style={{width:"25px",height:"25px"}} />
                </div>
                </div>
                <div className="" style={{marginLeft:"1rem"}}>
                    <div className="flex items-center gap-2.5 font-bold text-3xl">
                    Mohamed Ahmed
                    <div>(Name)</div>
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
                <div className="bg-blue-600 rounded-lg flex items-center p-2 text-white" style={{ transform:"translateY(-2px)"}}>
                <AiFillPlusCircle className="w-5 h-5 text-white" />
                <span className="ml-1">Add to story</span>
                </div>
                <div className="bg-slate-200 rounded-lg flex items-center p-2" style={{borderRadius:"10px", transform:"translateY(-2px)"}}>
                <MdEdit className="w-5 h-5" />
                <span className="ml-1">Edit profile</span>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic;