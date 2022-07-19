import React from 'react';
import { Link } from "react-router-dom";
import { BsThreeDots } from 'react-icons/bs';

function ProfileMenu() {
    return (
        <div className="relative flex" style={{borderTop:"1px solid grey"}}>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100" style={{width:"80px",height:"45px"}}>Posts</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100" style={{width:"80px",height:"45px"}}>About</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100" style={{width:"80px",height:"45px"}}>Friends</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 lg:flex sm:hidden" style={{width:"80px",height:"45px"}}>Photos</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 lg:flex sm:hidden" style={{width:"80px",height:"45px"}}>Videos</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100 lg:flex sm:hidden" style={{width:"80px",height:"45px"}}>Check-Ins</Link>
            <Link to="/" className="font-semibold text-base cursor-pointer flex items-center justify-center rounded-xl mt-1 text-gray-500 hover:bg-slate-100" style={{width:"80px",height:"45px"}}>More</Link>
            <div className="absolute right-0 top-2 bg-slate-100 p-2 flex justify-center rounded-lg cursor-pointer" style={{width:"45px",height:"36px"}}>
                <BsThreeDots />
            </div>
        </div>
    )
}

export default ProfileMenu;