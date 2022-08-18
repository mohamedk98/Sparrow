import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import FriendOptionsMenu from '../../components/profile/FriendOptionsMenu';
import { addOtherUserData } from '../../store/userSlice/OtherUsersData';
import { useTranslation } from 'react-i18next';

function Friends() {
    const userState = useSelector((state) => state.userData.userData);
    const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
    const dispatch = useDispatch();
    const [friendMenu, setFriendMenu] = useState(false);
    const [friendMenuId, setFriendMenuId] = useState(false);
    let navigate = useNavigate();
    const removeFriend = (id)=>{
        axiosInstance
        .delete(`/friends/friend/${id}`)
        .then((response) => {
            dispatch(addUserData(response.data))
            navigate(`/${userState.username}`)
            window.location.reload();
        })
        .catch(error => console.log(error));
        console.log(id)
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
        console.log(otherUserState.blockList)
    }
    const {t}=useTranslation();
    return (
        <div className="mt-3 bg-slate-200 dark:bg-zinc-900 transition duration-700 shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white my-3 p-4 rounded-xl dark:bg-zinc-800 dark:text-slate-100 transition duration-700">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    {t('Friends')}
                                </div>
                                <div className='grid lg:grid-cols-2 grid-col-1 gap-2.5 my-5'>
                                    {otherUserState?.friends?.data?.map((friend, index)=>{
                                        return(
                                            <div className='flex relative justify-between  rounded-lg p-3 border dark:border-zinc-600 gap-2.5 h-32'>
                                                <div className='flex items-center'>
                                                    <Link to={`/${friend.userId.username}`}><img key={friend.userId} src={friend.userId.profileImage} alt="photos" className="w-24 h-24 rounded-md hover:brightness-95"></img></Link>
                                                    <Link to={`/${friend.userId.username}`}><span className='text-md mx-2 font-semibold hover:underline '>{friend.userId.firstName} {friend.userId.lastName}</span></Link>
                                                </div>
                                                {otherUserState.currentLoginAccount&&<div className='flex items-center cursor-pointer'>
                                                    <BsThreeDots className='text-xl font-semibold rounded-full w-8 h-8 p-1 hover:bg-slate-200'
                                                                onClick={()=>{setFriendMenuId(index); setFriendMenu(prev=>!prev)}} 
                                                    />
                                                <FriendOptionsMenu friend={friend} removeFriend={removeFriend} blockFriend={blockFriend} friendMenuId ={friendMenuId} id={index} friendMenu={friendMenu}/>
                                                </div>}
                                            </div>
                                        )
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

export default Friends;