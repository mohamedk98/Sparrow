import React, { useState } from 'react';
import profilePic from "../../assets/stories/profile5.png";
import defaultPic from "../../assets/images/default_pic.png";
import { AiFillCamera, AiFillMessage } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import PicUploadModal from './PicUploadModal';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { BiBlock } from 'react-icons/bi';
import { TbFriendsOff } from 'react-icons/tb';
import EditeProfile from './EditeProfile';
import PhotoModalSingle from './PhotoModalSingle';
import { Navigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';


function ProfilePic() {
    const userState = useSelector(state =>state.userData.userData);
    const dispatch = useDispatch();
    const {username} = useParams();
    const [choosePic, setChoosePic] = useState(false);
    const [friendMenu, setFriendMenu] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [pic, setPic] = useState(userState.profileImage)
    const [openPhoto, setOpenPhoto] = useState(false)
    //console.log(userState.friends.data.userId.username === username)
    const removeFriend = (id)=>{
        axiosInstance
        .delete(`/friends/friend/${id}`)
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
        {/* <Navigate to="/dashboard" replace={true} /> */}
    }
    const blockFriend = (id)=>{
        axiosInstance
        .post(`/friends/friend/block/${id}`)
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
        {/* <Navigate to="/dashboard" replace={true} /> */}
    }
    const addFriend = (id)=>{
        axiosInstance
        .post(`/friends/friendRequest/${id}`)
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
    }
    // const openModal = () =>{
    //     setChoosePic(true)
    // }
    return (
        <div className="lg:w-10/12 m-auto flex lg:flex-row flex-col relative items-center justify-between gap-2.5 p-3 text-sm font-semibold rounded-lg dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
            <div className="flex lg:flex-row flex-col gap-4 pt-4 pl-3 pb-0 pr-3">
                <div className="relative">
                <div className="w-44 h-44 rounded-full border-4 ml-5 border-white dark:border-zinc-800 hover:brightness-95 -translate-y-16" style={{backgroundImage:"url("+defaultPic+")", backgroundSize: 'cover'}}>
                    <img className="w-44 h-44 rounded-full cursor-pointer" src={userState?.profileImage} alt="profilePic"
                        onClick={()=>setOpenPhoto(true)}
                    ></img>
                </div>
                {openPhoto&&<PhotoModalSingle photo={userState?.profileImage} setOpenPhoto={setOpenPhoto}/>}
                {userState.currentLoginAccount&&<div className="absolute w-9 h-9 lg:right-2 right-10 bottom-16 grid justify-center items-center cursor-pointer bg-slate-200 dark:bg-zinc-700 transition duration-700 dark:text-white rounded-full" onClick={()=>setChoosePic(true)}>
                    <AiFillCamera className='w-6 h-6' />
                </div>}
                {choosePic&&<PicUploadModal setChoosePic={setChoosePic} choosePic={choosePic}/>}
                </div>
                <div className="ml-4">
                    <div className="flex items-center gap-2.5 font-bold text-3xl">
                        <span>{userState.firstName} {userState.lastName}</span>
                    </div>
                    <div>
                        <span>{userState.friends?.data?.length} {userState.friends?.data?.length<2?"friend":"friends"}</span>
                    </div>
                    <div className='my-8 text-lg font-mono'>
                        <span>{userState?.intro}</span>
                    </div>
                </div>
            </div>
            {userState.currentLoginAccount
            ?<div className="flex gap-2.5 py-2.5 mb-2">
                {/* <div className="bg-blue-600 rounded-lg flex items-center p-2 cursor-pointer text-white hover:brightness-95">
                    <AiFillPlusCircle className="w-5 h-5 text-white" />
                    <span className="ml-1">Add to story</span>
                </div> */}
                <div className="bg-blue-500 text-white dark:bg-zinc-700 rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95"
                    onClick={()=>setEditProfile(true)}
                >
                    <MdEdit className="w-5 h-5" />
                    <span className="ml-1">Edit profile</span>
                </div>
                {editProfile&&<EditeProfile editProfile={editProfile} setEditProfile={setEditProfile} />}
            </div>:
            userState?.username === username?
            <div className="flex relative gap-2.5 py-2.5 mb-2">
                <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95" 
                    onClick={()=>setFriendMenu(prev=>!prev)}>
                    <FaUserAlt className="w-5 h-4" />
                    <span className="ml-1">Friends</span>
                    <IoIosArrowDown className='m-1'/>
                </div>
                {friendMenu&&(<div className="bg-white dark:bg-zinc-700 dark:text-slate-100 transition duration-700 p-2 rounded-lg absolute top-14 right-28 lg:top-14 lg:right-28 w-56 shadow shadow-slate-400 dark:shadow-zinc-500 z-10">
                    <div
                        className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                        onClick={()=>removeFriend(userState._id)}
                        >
                        <TbFriendsOff className="w-5 h-5" />
                        Unfriend
                    </div>
                    <div
                        className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                        onClick={()=>blockFriend(userState._id)}
                        >
                        <BiBlock className="w-5 h-5" />
                        Block
                    </div>
                </div>)}
                <div className="bg-blue-600 rounded-lg flex items-center p-2 cursor-pointer text-white hover:brightness-95">
                    <AiFillMessage className="w-5 h-5" />
                    <span className="ml-1">Message</span>
                </div>
            </div>:
            <div className="flex relative gap-2.5 py-2.5 mb-2">
                <div className="bg-blue-600 dark:bg-zinc-700 text-white rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95" 
                    onClick={()=>addFriend()}>
                    <AiOutlineUserAdd className="w-5 h-4" />
                    <span className="ml-1">Add Friend</span>
                </div>
                <div className="bg-blue-600 rounded-lg flex items-center p-2 cursor-pointer text-white hover:brightness-95">
                    <AiFillMessage className="w-5 h-5" />
                    <span className="ml-1">Message</span>
                </div>
            </div>
            }
        </div>
    )
}

export default ProfilePic;