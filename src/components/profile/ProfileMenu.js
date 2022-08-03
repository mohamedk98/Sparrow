import React from 'react';
import { Link, NavLink } from "react-router-dom";

function ProfileMenu() {
return (
        <div className="relative flex" style={{borderTop:"1px solid grey"}}>
                <NavLink to="/profile" className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-blue-500 border-b-4 border-b-blue-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 hover:bg-slate-100 w-20 h-11")}>Posts</NavLink>
                <NavLink to="/profile/about" className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-blue-500 border-b-4 border-b-blue-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 hover:bg-slate-100 w-20 h-11")}>About</NavLink>
                <NavLink to="/profile/friends" className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-blue-500 border-b-4 border-b-blue-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 hover:bg-slate-100 w-20 h-11")}>Friends</NavLink>
                <NavLink to="/profile/photos" className={({ isActive }) => 
                        (isActive ? "font-semibold text-base cursor-pointer flex items-center justify-center m-1 text-blue-500 border-b-4 border-b-blue-500 w-20 h-11" : "font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl m-1 text-gray-500 hover:bg-slate-100 w-20 h-11")}>Photos</NavLink>
        </div>
)
}

export default ProfileMenu;