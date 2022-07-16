import React from 'react'
import InputBox from './InputBox'
import Post from './posts/Post'

const Feed = () => {
  
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto '>
        <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
          <InputBox/>
          <Post/>
        </div>

      
        </div>
       

    
  )
}

export default Feed;