import { t } from 'i18next';
import React, { useState } from 'react'
import { BiBlock } from 'react-icons/bi'
import { TbFriendsOff } from 'react-icons/tb'
import ConfirmBlock from './ConfirmBlock';
import ConfirmUnfriend from './ConfirmUnfriend'

function FriendOptionsMenu({id,friendMenuId,
friendMenu, removeFriend, blockFriend, friend}) {
    const [unfriend, setUnfriend] = useState(false);
    const [block, setBlock] = useState(false);
    return (
        <>
        {friendMenuId===id&&friendMenu&& <div id={id} className="bg-white dark:bg-zinc-700 dark:text-slate-100 transition duration-700 p-2 rounded-lg absolute top-16 right-12 lg:top-16 lg:right-12 w-56 shadow shadow-slate-400 dark:shadow-zinc-500 z-10">
            <div className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                onClick={()=>setUnfriend(true)}
            >
                <TbFriendsOff className="w-5 h-5" />
                <span>{t('Unfriend')}</span>
            </div>
            {unfriend&&<ConfirmUnfriend friend={friend} removeFriend={removeFriend} setUnfriend={setUnfriend}/>}
            <div className="flex dark:hover:bg-zinc-600 items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200"
                onClick={()=>setBlock(true)}
            >
                <BiBlock className="w-5 h-5" />
                <span>{t('block')}</span>
            </div>
            {block&&<ConfirmBlock friend={friend} blockFriend={blockFriend} setBlock={setBlock}/>}
        </div>}</>
    )
}

export default FriendOptionsMenu