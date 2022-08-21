import React from 'react'
import Navbar from '../../components/home/Navbar'
import Sidebar from '../../components/home/Sidebar'
import PostsTable from '../../components/posts/PostsTable'

function Posts() {
    return (
        <div className='grid grid-cols-12 h-screen bg-gray-100'>
            <div className='col-span-2'>
            <Sidebar/>
            </div>
            <div className='col-span-10'>
                <Navbar/>
                <div className='w-11/12 mx-auto my-10'>
                    <PostsTable/>
                </div>
            </div>
        </div>
    )
}

export default Posts