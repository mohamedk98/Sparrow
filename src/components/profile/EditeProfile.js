import React, { useState } from 'react'
import { AiFillLock, AiOutlineClose, AiOutlineSetting } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import ConfirmUnblock from './ConfirmUnblock';

function EditeProfile({editProfile, setEditProfile}) {
    const userState = useSelector(state =>state.userData.userData);
    const dispatch = useDispatch();
    const [changeName, setChangeName] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [blockList, setBlockList] = useState(false);
    const [unblock, setUnblock] = useState(false);
    const [name, setName] = useState({firstName:userState.firstName, lastName:userState.lastName})
    const [password, setPassword] = useState({oldPassword:"", newPassword:"", confirmPassword:""})
    const changeNameHandler = (name,e)=>{
        e.preventDefault();
        axiosInstance
        .patch(`/profile/name`,{name})
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
        setChangeName(false)
    }
    const changePasswordHandler = (password,e)=>{
        e.preventDefault();
        axiosInstance
        .patch(`/profile/password`,{password})
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
        setChangePassword(false)
    }
    const unblockFriend = (id,e) => {
        e.preventDefault();
        axiosInstance
        .patch(`/friends/friend/block/${id}`)
        .then((response) => {
            dispatch(addUserData(response.data))
        })
        .catch(error => console.log(error));
       /*  <Navigate to={"/dashboard"} replace={true} /> */
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
        <div className='w-2/5 mx-auto mt-5 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100'>
            <div className='relative mb-3 text-black dark:text-slate-100'>
                <div className='text-center text-xl font-semibold'>Update your Profile</div>
                <button className='absolute right-2 top-0 text-xl' onClick={()=>setEditProfile(false)}>
                    <AiOutlineClose/>
                </button>
            </div>
            <hr></hr>
            <div className='text-lg my-4 p-2'>
                <div className='flex gap-2.5 items-center text-blue-500 dark:text-slate-100 m-3 cursor-pointer hover:underline'  onClick={()=>setChangeName(prev=>!prev)}>
                    <BiEditAlt/>
                    <span>Change Your Name</span>
                </div>
                {changeName&&<div className="border rounded-lg p-3 m-2">
                    <form>
                        <div className='m-2'>
                            <span className='ml-2 text-blue-300 dark:text-slate-100'>First Name</span>
                            <input
                            type="text"
                            defaultValue={userState.firstName}
                            className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-blue-500 focus:placeholder:text-blue-500 hover:border-gray-400' 
                            placeholder='Your First Name'
                            onChange={(e)=>{setName({...name, firstName:e.target.value})}}
                            />
                        </div>
                        <div className='m-2'>
                            <span className='ml-2 text-blue-300 dark:text-slate-100'>Last Name</span>
                            <input
                            type="text"
                            defaultValue={userState.lastName}
                            className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-blue-500 focus:placeholder:text-blue-500 hover:border-gray-400' 
                            placeholder='Your First Name'
                            onChange={(e)=>{setName({...name, lastName:e.target.value})}}
                            />
                        </div>
                        <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                            <div className="bg-blue-500 dark:bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                                <button type='submit' className="font-semibold ml-1" onClick={(e)=>changeNameHandler(name,e)}>Change</button>
                            </div>
                            <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setChangeName(false)
                                    }}
                                    className="font-semibold ml-1"
                                    >Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>}
                <div className='flex gap-2.5 items-center text-blue-500 dark:text-slate-100 m-3 cursor-pointer hover:underline'  onClick={()=>setChangePassword(prev=>!prev)}>
                    <AiFillLock/>
                    <span>Change Your Password</span>
                </div>
                {changePassword&&<div className="border rounded-lg p-3 m-2">
                    <form>
                        <div className='m-2'>
                            <input
                            type="text"
                            className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-blue-500 focus:placeholder:text-blue-500 hover:border-gray-400' 
                            placeholder='Old Password'
                            onChange={(e)=>{setPassword({...password, oldPassword:e.target.value})}}
                            />
                            <input
                            type="text"
                            className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-blue-500 focus:placeholder:text-blue-500 hover:border-gray-400' 
                            placeholder='New Password'
                            onChange={(e)=>{setPassword({...password, newPassword:e.target.value})}}
                            />
                            <input
                            type="text"
                            className='w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-blue-500 focus:placeholder:text-blue-500 hover:border-gray-400' 
                            placeholder='Confirm New Password'
                            onChange={(e)=>{setPassword({...password, confirmPassword:e.target.value})}}
                            />
                        </div>
                        <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                            <div className="bg-blue-500 dark:bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                                <button type='submit' className="font-semibold ml-1" onClick={(e)=>changePasswordHandler(password,e)}>Change</button>
                            </div>
                            <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setChangePassword(false)
                                    }}
                                    className="font-semibold ml-1"
                                    >Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>}
                <div className='flex gap-2.5 items-center text-blue-500 dark:text-slate-100 m-3 cursor-pointer hover:underline'  onClick={()=>setBlockList(prev=>!prev)}>
                    <AiOutlineSetting/>
                    <span>Manage Block List</span>
                </div>
                {blockList&&<div>
                    <div className='m-2'>
                        <div className='border p-2 rounded-lg'>
                            {userState?.blockList?.map((friend, index)=>{
                                return(
                                    <div className='flex relative justify-between items-center rounded-lg p-3 border dark:border-zinc-600 gap-2.5 h-24'>
                                        <div className='flex items-center'>
                                            <Link to={`/${friend.userId.username}`}><img key={friend.userId} src={friend.userId.profileImage} alt="photos" className="w-20 h-20 rounded-md hover:brightness-95"></img></Link>
                                            <Link to={`/${friend.userId.username}`}><span className='text-md mx-2 font-semibold hover:underline '>{friend.userId.firstName} {friend.userId.lastName}</span></Link>
                                        </div>
                                        <button className='p-2 rounded-lg bg-blue-500 text-white dark:bg-zinc-500 dark:text-slate-100 hover:brightness-95'
                                            onClick={(e)=>setUnblock(true)}
                                        >Unblock</button>
                                        {unblock&&<ConfirmUnblock friend={friend} unblockFriend={unblockFriend} setUnblock={setUnblock}/>}
                                    </div>
                                )
                            })}
                        </div>
                    
                    </div>
                    <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                        <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                            <button onClick={(e)=>{
                                e.preventDefault()
                                setBlockList(false)
                                }}
                                className="font-semibold ml-1"
                                >Close
                            </button>
                        </div>
                    </div>
                </div>}
                   {/*  <div className='mx-2'>
                        <button  
                                className='text-white bg-blue-500 p-2 rounded-lg m-2 hover:brightness-95'
                                onClick={(e)=>infosHandler(e)}
                                >Save</button>
                        <button className=' dark:bg-zinc-500 dark:hover:brightness-95 hover:bg-slate-200 p-2 rounded-lg m-2'
                                onClick={()=>setUpdateInfos(false)}
                        >Cancel</button>
                    </div> */}
                
            </div>
            
            
        </div>
    </div>
    )
}

export default EditeProfile