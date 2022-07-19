import React, { useState } from 'react';
import cover from "../../assets/stories/2.png";
import { AiFillCamera } from 'react-icons/ai';
import { MdPhotoLibrary } from 'react-icons/md';
import { MdOutlineUpload } from 'react-icons/md';

function Cover() {
    const [showCoverMenu, setShowCoverMenu] = useState(false);
    return (
        <div className="cover max-w-5xl mx-auto">
          <div className="bg-slate-200 relative w-full h-96 rounded-t-none rounded-b-md cursor-pointer">
            {<img
              className="relative w-full h-96 rounded-t-none rounded-b-md"
              src={cover}
              alt="cover"
            ></img>}
            <div className="absolute bottom-4 right-4">
              <div
                className="bg-white p-2 flex items-center text-sm font-semibold rounded-lg cursor-pointer hover:brightness-95"
                onClick={() => {
                  setShowCoverMenu((prev) => !prev);
                }}
              >
                <AiFillCamera className="mr-2 w-5 h-5" />
                Add Cover Photo
              </div>
              {showCoverMenu && (
                <div className="bg-white p-2 rounded-lg absolute right-0 w-80 shadow shadow-slate-400 z-10">
                  <div className="flex items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200">
                    <MdPhotoLibrary className="w-5 h-5"/>
                    Select Photo
                  </div>
                  <div className="flex items-center gap-2.5 p-3 cursor-pointer text-sm font-semibold rounded-lg hover:bg-slate-200">
                    <MdOutlineUpload className="w-5 h-5"/>
                    Upload Photo
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}

export default Cover;