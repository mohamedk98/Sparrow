import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';

const FriendRequests = () => {
    const userState = useSelector(state =>state.userData.userData);
    
    const confirmHandler=async(id)=>{
      const res= await 
      axiosInstance
      .patch(`/friends/friendRequest/:${id}`)
      .catch((err)=>console.log(err));
      if(res && res.data){
        console.log(res.data);
      }
     
    }
  return (

    <div className='flex justify-center mt-4'>
          { userState.friendsRequests?userState.friendsRequests.map((frndReq,index)=>(
           
         
  <div className="rounded-lg shadow-lg bg-white w-56 max-h-min" key={index}>

      <Link to={`/profile/:${frndReq.userId.username}`}>
      <img className="rounded-t-lg" src={frndReq.userId.profileImage} alt=""/>
      </Link>

     
    <div className="p-6 text-center">
      <h5 className="text-gray-900 text-xl font-medium mb-2">{frndReq.userId.firstName} {frndReq.userId.lastName}</h5>
 
        <button type="button"
        onClick={()=>confirmHandler(frndReq.userId)}
         className="block w-full mb-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Confirm
          </button>
          <button type="button" className="block w-full px-6 py-2.5 bg-gray-300 text-black font-medium text-xs leading-tight  rounded shadow-md hover:bg-gray-400 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
            Delete
          </button>

    </div>
  </div>

 
          )):
          
          <p>You have no friends request</p>
          }
        
           
        
    </div>

  );
}

export default FriendRequests