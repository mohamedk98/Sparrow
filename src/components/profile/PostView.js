import React from 'react';
import { BsList } from 'react-icons/bs';
import { BsFillGridFill } from 'react-icons/bs';
import { RiEqualizerLine } from 'react-icons/ri';
import { AiTwotoneSetting } from 'react-icons/ai';

function PostView() {
    return (
        <div className="bg-white my-3 p-4 rounded-xl w-full">
            <div className="grid grid-cols-2 gap-2.5 items-center">
                <div className="text-xl font-bold">
                    Posts
                </div>
                <div className="flex gap-2.5 lg:ml-8">
                    <div className="bg-slate-200 rounded-lg p-3 cursor-pointer hover:brightness-95">
                        <RiEqualizerLine className="inline w-5 h-5" />
                        <span className="font-semibold ml-1">Filters</span>
                    </div>
                    <div className="bg-slate-200 rounded-lg p-3 cursor-pointer hover:brightness-95">
                        <AiTwotoneSetting className="inline w-5 h-5" />
                        <span className="font-semibold ml-1">Manage posts</span>
                    </div>
                </div>
            </div>
            <hr className="my-3"></hr>
            <div className="flex justify-around my-0.5">
                <div className="text-gray-600 font-semibold rounded-lg py-1 px-4 cursor-pointer hover:bg-slate-100">
                    <BsList className="inline mx-2 text-xl"/>
                    List view
                </div>
                <div className="text-gray-600 font-semibold rounded-lg py-1 px-4 cursor-pointer hover:bg-slate-100">
                    <BsFillGridFill className="inline mx-2 text-xl"/>
                    Grid view
                </div>
            </div>
        </div>
    )
}

export default PostView