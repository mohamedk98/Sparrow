import React,{useState} from 'react';
import profileImg from '../../../assets/images/default_profile.png';
import { IoMdHappy } from 'react-icons/io';
import { AiFillCamera } from 'react-icons/ai';
import CreatePostModal from './CreatePostModal';

const InputBox = () => {
  // const isOpen = true;
  const [showModal,setShowModal]=useState(true);
  return (
    <>
      <div className="bg-white  p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
          <img
            src={profileImg}
            alt="profile-imag"
            className="rounded-full"
            width={40}
            height={40}
            layout="fixed"
          />
          <form className="flex flex-1">
            <input
              type="text"
              readOnly
              className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none cursor-pointer"
              placeholder={`What's on your mind,Sarah?`}
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
            />
          </form>
        </div>
        <div className="flex justify-evenly p-3 border-t">
          <div 
          className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
          >
            <AiFillCamera className="h-7 xl:w-10 md:w-6 text-green-400" />
            <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          </div>
          <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
            <IoMdHappy className="h-7 xl:w-10 md:w-6 text-yellow-300" />
            <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
          </div>
        </div>
      </div>

      {showModal && <CreatePostModal showModal={showModal} setShowModal={setShowModal}/>}
    </>
  );
};

export default InputBox;
