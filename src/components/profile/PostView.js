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
                    <div className="flex gap-2.5">
                      <div className="bg-slate-200 rounded-3xl p-3 w-32 h-12" style={{borderRadius:"10px", transform:"translateY(-2px)"}}>
                        <RiEqualizerLine className="inline w-5 h-5" />
                        <span className="font-semibold" style={{marginLeft:"0.25rem"}}>Filters</span>
                      </div>
                      <div className="bg-slate-200 rounded-3xl p-3" style={{borderRadius:"10px", transform:"translateY(-2px)"}}>
                      <AiTwotoneSetting className="inline w-5 h-5" />
                      <span className="font-semibold" style={{marginLeft:"0.25rem"}}>Manage posts</span>
                    </div>
                    </div>
                  </div>
                  <hr className="my-3"></hr>
                  <div className="flex justify-around my-0.5 p-4 h-10">
                    <div className="text-gray-600 font-semibold">
                      <BsList className="inline mx-2 text-xl"/>
                      List view
                    </div>
                    <div className="text-gray-600 font-semibold">
                      <BsFillGridFill className="inline mx-2 text-xl"/>
                      Grid view
                    </div>
                  </div>
                </div>
    )
}

export default PostView