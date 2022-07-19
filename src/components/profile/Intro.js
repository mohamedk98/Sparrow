import React from 'react';

function Intro() {
    return (
        <div className="bg-white my-3 p-4 rounded-xl">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Intro
            </div>
            <div className='text-center m-3'>
                intro intro intro
            </div>
            <div>
                <div className="bg-slate-200 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Edit Bio</span>
                </div>
                <div className="bg-slate-200 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Edit details</span>
                </div>
                <div className="bg-slate-200 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Add Hobbies</span>
                </div>
                <div className="bg-slate-200 rounded-lg p-2 text-center my-5 cursor-pointer hover:brightness-95">
                    <span className="font-semibold text-sm ml-1">Add Featured</span>
                </div>
            </div>
        </div>
    )
}

export default Intro;