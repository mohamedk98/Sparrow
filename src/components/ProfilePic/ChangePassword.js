import React from 'react';

const ChangePassword = () => {
    return (
        
         <div className="text-md px-6 text-center  text-gray-800">
         
                <div className='my-3'>
                <label> Old password</label>
                <input type='password' 
                placeholder='Enter your old password'
                className='block border border-gray-400 w-full p-2 rounded-lg '/>
                </div>
      
               <div className='my-3'>
                <label>New password</label>
                <input type='password' 
                placeholder='Enter your new password'
                className='block border  border-gray-400 w-full p-2 rounded-lg '/>
               </div>
              
      
          </div>

    );
}

export default ChangePassword;
