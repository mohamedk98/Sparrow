import React from 'react'
import Sidebar from '../../components/home/Sidebar'
import SignUpForm from '../../components/SingUpForm/SignUpForm'

function Admins() {
    return (
        <div className='grid grid-cols-12 bg-gray-100'>
            <div className='col-span-2'>
                <Sidebar/>
            </div>
            <div className='col-span-9 '>
               <SignUpForm/>
            </div>
        </div>
    )
}

export default Admins