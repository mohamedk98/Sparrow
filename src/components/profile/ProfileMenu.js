import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

function ProfileMenu() {
        const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
return (
        <div className="relative flex" style={{borderTop:"1px solid grey"}}>
                <NavLink to={`/${otherUserState.username}/posts`} className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-indigo-500 border-b-4 border-b-indigo-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 dark:text-slate-100 dark:hover:bg-zinc-700 hover:bg-slate-100 w-20 h-11")}>{t('Posts')}</NavLink>
                <NavLink to={`/${otherUserState.username}/about`} className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-indigo-500 border-b-4 border-b-indigo-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 dark:text-slate-100 dark:hover:bg-zinc-700 hover:bg-slate-100 w-20 h-11")}>{t('About')}</NavLink>
                <NavLink to={`/${otherUserState.username}/friends`} className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-indigo-500 border-b-4 border-b-indigo-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 dark:text-slate-100 dark:hover:bg-zinc-700 hover:bg-slate-100 w-20 h-11")}>{t('Friends')}</NavLink>
                <NavLink to={`/${otherUserState.username}/photos`} className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-indigo-500 border-b-4 border-b-indigo-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 dark:text-slate-100 dark:hover:bg-zinc-700 hover:bg-slate-100 w-20 h-11")}>{t('Photos')}</NavLink>
        </div>
)
}

export default ProfileMenu;