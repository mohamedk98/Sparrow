import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import { socket } from '../chat/socket.service';
import { addOtherUserData } from '../../store/userSlice/OtherUsersData';
import ConfirmBlock from './ConfirmBlock';
import ConfirmUnfriend from './ConfirmUnfriend';
import ConfirmUnfriendSingle from './ConfirmUnfriendSingle';
import ConfirmBlockSingle from './ConfirmBlockSingle';
import { t } from 'i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function ProfilePic() {
    const userState = useSelector(state =>state.userData.userData);
    const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
    const dispatch = useDispatch();
    const {username} = useParams();
    const [choosePic, setChoosePic] = useState(false);
    const [friendMenu, setFriendMenu] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [pic, setPic] = useState(otherUserState.profileImage)
    const [openPhoto, setOpenPhoto] = useState(false)
    const [unfriend, setUnfriend] = useState(false);
    const [block, setBlock] = useState(false);
    let navigate = useNavigate();

    const removeFriend = (id)=>{
        axiosInstance
        .delete(`/friends/friend/${id}`)
        .then((response) => {
            dispatch(addOtherUserData(response.data))
            navigate(`/${userState.username}`)
            window.location.reload();
        })
        .catch(error => console.log(error));
    }
    const blockFriend = (id)=>{
        axiosInstance
        .post(`/friends/friend/block/${id}`)
        .then((response) => {
            dispatch(addOtherUserData(response.data))
            navigate(`/${userState.username}`)
            window.location.reload();
        })
        .catch(error => console.log(error));
    }
    const addFriend = (id)=>{
        axiosInstance
        .post(`/friends/friendRequest/${id}`)
        .then((response) => {
            dispatch(addOtherUserData(response.data))
            navigate(`/${otherUserState.username}`)
            window.location.reload();
        })
        .catch(error => console.log(error));
    }

    return (
        <div className="lg:w-10/12 m-auto flex lg:flex-row flex-col relative items-center justify-between gap-2.5 p-3 text-sm font-semibold rounded-lg dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
            <div className="flex lg:flex-row flex-col gap-4 pt-4 pl-3 pb-0 pr-3">
                <div className="relative">
                <div className="w-44 h-44 rounded-full border-4 ml-5 border-white dark:border-zinc-800 hover:brightness-95 -translate-y-16" style={{backgroundImage:"url("+defaultPic+")", backgroundSize: 'cover'}}>
                    {otherUserState?.profileImage?(
                    <img className="w-44 h-44 rounded-full cursor-pointer" src={otherUserState.profileImage} alt="profilePic"
                        onClick={()=>setOpenPhoto(true)}
                    ></img>
                    ):<Skeleton
                    circle
                    containerClassName="avatar-skeleton"
                    className="dark:bg-zinc-700 w-44 h-44"
                    highlightColor={`${localStorage.theme === 'dark' && '#3f3f46'}`}
                  />
                   }
                </div>
                {openPhoto&&<PhotoModalSingle photo={otherUserState?.profileImage} setOpenPhoto={setOpenPhoto}/>}
                {otherUserState.currentLoginAccount&&<div className="absolute w-9 h-9 lg:right-2 right-10 bottom-16 grid justify-center items-center cursor-pointer bg-indigo-200 dark:bg-zinc-700 transition duration-700 dark:text-white rounded-full" onClick={()=>setChoosePic(true)}>
                    <AiFillCamera className='w-6 h-6' />
                </div>}
                {choosePic&&<PicUploadModal setChoosePic={setChoosePic} choosePic={choosePic}/>}
                </div>
                <div className="ml-4">
                    <div className="flex items-center gap-2.5 font-bold text-3xl">
                        {otherUserState?.firstName?(
                        <span>{otherUserState.firstName} {otherUserState.lastName}</span>
                        ):
                        <Skeleton className="flex items-center gap-2.5 text-3xl dark:bg-zinc-700"
                        highlightColor={`${localStorage.theme === 'dark' && '#3f3f46'}`}
                        count={1}
                        width={150}
                        />
                        }
                    </div>
                    <div>
                        {otherUserState?.friends?.data?.length?(
                        <span>{otherUserState.friends?.data?.length} {otherUserState.friends?.data?.length<2?"friend":"friends"}</span>
                        ):
                        <Skeleton className="dark:bg-zinc-700"
                        highlightColor={`${localStorage.theme === 'dark' && '#3f3f46'}`}
                        count={1}
                        width={80}
                        />
                        }
                        </div>
                    <div className='my-8 text-lg font-mono'>
                        {otherUserState?.intro?(
                        <span>{otherUserState?.intro}</span>
                        )
                        :  <Skeleton className="dark:bg-zinc-700"
                            highlightColor={`${localStorage.theme === 'dark' && '#3f3f46'}`}
                            count={1}
                            width={80}
                        />
                        }
                    </div>
                </div>
            </div>
            {otherUserState.currentLoginAccount
            ?<div className="flex gap-2.5 py-2.5 mb-2">
                <div className="bg-indigo-500 text-slate-100 dark:bg-zinc-700 rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95"
                    onClick={()=>setEditProfile(true)}
                >
                    <MdEdit className="w-5 h-5" />
                    <span className="ml-1">{t('Edit_profile')}</span>
                </div>
                {editProfile&&<EditeProfile editProfile={editProfile} setEditProfile={setEditProfile} />}
            </div>:
            userState?.friends?.data?.some(friend=> friend.userId.username=== username)?
            <div className="flex relative gap-2.5 py-2.5 mb-2">
                <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95" 
                    onClick={()=>setFriendMenu(prev=>!prev)}>
                    <FaUserAlt className="w-5 h-4" />
                    <span className="ml-1">{t('Friends')}</span>
                    <IoIosArrowDown className='m-1'/>
                </div>
                {friendMenu&&(<div className="bg-white dark:bg-zinc-700 dark:text-slate-100 transition duration-700 p-2 rounded-lg absolute top-14 right-28 lg:top-14 lg:right-28 w-56 shadow shadow-slate-400 dark:shadow-zinc-500 z-10">
                    <div
                        className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                        onClick={()=>setUnfriend(true)}
                        >
                        <TbFriendsOff className="w-5 h-5" />
                        {t('Unfriend')}
                    </div>
                    {unfriend&&<ConfirmUnfriendSingle friend={otherUserState} removeFriend={removeFriend} setUnfriend={setUnfriend}/>}
                    <div
                        className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                        onClick={()=>setBlock(true)}
                        >
                        <BiBlock className="w-5 h-5" />
                        {t('block')}
                    </div>
                    {block&&<ConfirmBlockSingle friend={otherUserState} blockFriend={blockFriend} setBlock={setBlock}/>}
                </div>)}
            </div>:
            <div className="flex relative gap-2.5 py-2.5 mb-2">
                <div className={`${otherUserState?.friendsRequests?.some(id=>id.userId===userState._id)?"bg-indigo-400 dark:bg-zinc-500 text-white rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95":"bg-indigo-600 dark:bg-zinc-700 text-white rounded-lg flex items-center p-2 cursor-pointer hover:brightness-95"}`} 
                    onClick={()=>addFriend(otherUserState._id)}>
                    <AiOutlineUserAdd className="w-5 h-4" />
                    {otherUserState?.friendsRequests?.some(id=>id.userId===userState._id)?<span className="ml-1">{t('Request Sent')}</span>:<span className="ml-1">{t('Add Friend')}</span>}
                </div>
            </div>
            }
        </div>
    )
}

export default ProfilePic;