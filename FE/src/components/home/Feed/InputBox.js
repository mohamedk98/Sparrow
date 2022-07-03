import React from 'react'
import profileImg from '../../../assets/images/default_profile.png';
import {BsFillCameraReelsFill} from 'react-icons/bs';
import {IoMdHappy} from 'react-icons/io';
import {AiFillCamera} from 'react-icons/ai';

const InputBox = () => {
    const sendPost=(e)=>{
    //to prevent reloading the page when pressing enter
      e.preventDefault();
    }
  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
        <div className='flex space-x-4 p-4 items-center'>
            <img src={profileImg} alt='profile-imag'
             className='rounded-full' width={40} height={40} layout='fixed'/>
             <form className='flex flex-1'>
               <input type='text' 
                className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
                placeholder={`What's on your mind,Sarah?`} />
                <button hidden type='submit' onClick={sendPost} >Share</button>
             </form>
        </div>
        <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
            <BsFillCameraReelsFill className='h-7 xl:w-10 md:w-6 text-red-500'/>
            <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div className='inputIcon'>
            <AiFillCamera className='h-7 xl:w-10 md:w-6 text-green-400'/>
            <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
        </div>
        <div className='inputIcon'>
          <IoMdHappy className='h-7 xl:w-10 md:w-6 text-yellow-300'/>
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
        </div>
    </div>
  )
}

export default InputBox;