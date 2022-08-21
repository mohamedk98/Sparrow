import React from 'react'
import { Link } from 'react-router-dom';

function Pagination({postPerPage,totalPosts,paginate}) {
    const pageNumbers=[];
    for(let i=1; i<=Math.ceil(totalPosts / postPerPage); i++){
       pageNumbers.push(i);   
    } 

  return (
    <div className='flex w-full justify-center'>
      
    <nav
          className='relative z-0 inline-flex rounded-lg p-2 -space-x-px cursor-pointer'
          aria-label='Pagination'
        >
            {pageNumbers.map((num)=>(

                <a href
                onClick={()=>paginate(num)}
                key={num}
                className='relative w-8 inline-flex items-center text-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-300 hover:text-white'
                >
                <span>{num}</span>
                </a>
            ))}
     
    </nav>
    </div>
  )
}

export default Pagination