import React, { useRef,useState } from 'react'
import {BsArrowReturnLeft} from 'react-icons/bs';
import { axiosInstance } from '../../../network/axiosInstance';
import { Link } from 'react-router-dom';
import useClickOutside from '../../clickOutside';
import profileImg from '../../../assets/images/default_profile.png';

const SearchMenu = ({setShowSearchMenu}) => {
    const menu=useRef(null);
    const [searchTerm,setSearchTerm]=useState("");
    const [result,setResult]=useState([]);
  
    const searchHandler=async()=>{
      if(searchTerm === ""){
          setResult('');
      } 
      else{
        const res=await axiosInstance.get(`/search/:${searchTerm}`);
        setResult(res.data);
      }
      console.log(result);
    }

    useClickOutside(menu,()=>{
        setShowSearchMenu(false);
    });

    
  return (
    <div className='bg-white  pt-1.5 px-4 absolute top-0 left-0 shadow-lg shadow-gray-500 items-start flex-col gap-1.5 rounded-b-lg  z-10 min-h-[400px] max-h-[70vh] overflow-y-auto p-10' ref={menu}>
   
            <div className='flex items-center pt-2.5 pb-2 pl-2.5 pr-3 w-64 '>
                <div className='mr-2' onClick={()=>setShowSearchMenu(false)}>
                    <BsArrowReturnLeft className='font-extrabold text-xl cursor-pointer hover:bg-gray-100 hover:rounded-lg text-black'/>
                </div>
                <input type='text'
                   value={searchTerm}
                   onChange={(e)=>setSearchTerm(e.target.value)}      
                   onKeyUp={searchHandler}
                   placeholder='Search'
                   className='p-2  outline-none py-2 mt-0 bg-gray-100 rounded-full'/>
                      
            </div>
             {/* Search History */}
            {/* <div className='w-full flex items-center justify-between  text-sm'>
                <span className='font-semibold text-base'>Recent searches</span>
                <a href='#k' className='cursor-pointer text-gray-600'>Edit</a>
           </div> */}
      
    
                {result && result.map((user)=>(
                        <Link to={`/profile/:${user.username}`} key={user.userId} className='relative w-full flex items-center hover:bg-gray-100 gap-2 p-1 rounded-lg'>
                            <div className='inline-flex w-full'>
                                <img src={user.profileImage?user.profileImage:profileImg} className='rounded-full w-9 h-9 object-cover border border-gray-100 ' alt='profile_pic'/>
                                <span className='font-semibold text-sm mt-2 pl-2 '>{user.firstName} {user.lastName}</span>
                            </div>
                        </Link>
                        ))}
        
       

    </div>
  )
}

export default SearchMenu