import React from 'react';
import { Link } from "react-router-dom";

function ProfileMenu() {
    return (
        <div className="relative flex" style={{borderTop:"1px solid grey"}}>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 w-20 h-11">Posts</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 w-20 h-11">About</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 w-20 h-11">Friends</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 w-20 h-11">Photos</Link>
        </div>
    )
}

export default ProfileMenu;