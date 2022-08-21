import React from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { NavLink } from 'react-router-dom'
import Loader from '../Loader/Loader';

function Widget({title, number}) {
    let data;
    switch(title){
        case "users":
            data={
                title:"Users",
                icon:<AiOutlineUser className='text-rose-600 bg-rose-200 rounded-lg'/>
            };
            break;
        case "posts":
            data={
                title:"Posts",
                icon:<MdPostAdd className='text-green-600 bg-green-100 rounded-lg'/>
            };
            break;
        default:
            break;
    }
    return (
        <div className='flex flex-col justify-between p-5 w-2/6 h-52 rounded-xl shadow-lg shadow-indigo-500/50'>
            <div className='flex justify-between m-3'>
                <span className='text-xl font-semibold'>{data.title}</span>
               
            </div>
            <div className='m-3'>
                {!number?<Loader/>:
                <span className='text-xl'>{number}</span>
                }
            </div>
            <div className='flex justify-between m-3 underline'>
                <NavLink to={`/${title}`}>Sell all {title}</NavLink>
                <div>{data.icon}</div>
            </div>
        </div>
    )
}

export default Widget