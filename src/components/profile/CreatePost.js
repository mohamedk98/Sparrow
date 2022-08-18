import React from 'react';
import defaultPic from '../../assets/images/default_pic.png';
import { MdPhotoLibrary } from 'react-icons/md';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { BsFillFlagFill } from 'react-icons/bs';
import { t } from 'i18next';

function CreatePost() {
  return (
    <div className="bg-white my-3 p-4 rounded-xl w-full">
      <div className="flex gap-2.5">
        <img
          src={defaultPic}
          alt="ptofilePic"
          className="rounded-full w-12 h-12 cursor-pointer hover:brightness-95"
        ></img>
        <input
          placeholder="What's on your mind?"
          className="bg-slate-200 rounded-3xl w-11/12 p-3 cursor-pointer hover:brightness-95"
        ></input>
      </div>
      <hr className="my-3"></hr>
      <div className="flex justify-around my-0.5 p-4 h-auto">
        {/* <div className="text-gray-600 font-semibold rounded-xl hover:bg-slate-100 py-1 px-3 cursor-pointer">
          <BsFillCameraVideoFill className="inline mx-2 text-red-500 text-3xl" />
          Live Video
        </div> */}
        <div className="text-gray-600 font-semibold rounded-xl hover:bg-slate-100 py-1 px-3 cursor-pointer">
          <MdPhotoLibrary className="inline mx-2 text-green-500 text-3xl" />
          {t('Photo/Video_input')}
        </div>
        {/* <div className="text-gray-600 font-semibold rounded-xl hover:bg-slate-100 py-1 px-3 cursor-pointer">
          <BsFillFlagFill className="inline mx-2 text-blue-500 text-2xl" />
          Life event
        </div> */}
      </div>
    </div>
  );
}

export default CreatePost;
