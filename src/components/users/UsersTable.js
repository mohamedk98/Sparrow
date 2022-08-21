import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/axiosInstance";
import { addUserData } from "../../Store/UserSlice/UserDataSlice";
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function UsersTable() {
    const userState = useSelector((state) => state.userData.userData);
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [UserPerPage]=useState(5);

    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get("/admin/users")
            .then((res) => {
                dispatch(addUserData(res.data));
                setUsers(res.data);
                console.log("user:",userState);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        }, []);
    const deleteHandler = (id)=>{
        axiosInstance
        .delete(`/admin/users/${id}`)
        .then(res=>{
            axiosInstance
            .get("/admin/users")
            .then((res) => {
                dispatch(addUserData(res.data));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

      //get current posts
      const indexOfLastPost=currentPage * UserPerPage;
      const indexOfFirstPost=indexOfLastPost-UserPerPage;
      const currentPost=users.slice(indexOfFirstPost,indexOfLastPost);
  
      //change page
      const paginate=(pageNumber)=>setCurrentPage(pageNumber);

    return (
        <div>
              {loading ?<div className='flex justify-center items-center mt-48'> <Loader/></div>
              :
            <table className='rounded-lg border-collapse border border-slate-400'>
                <thead className='h-24 bg-indigo-500 text-white'>
                <tr className=''>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>User ID</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>First Name</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>lastName</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>Email</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>Shared Posts</th>
                    <th className='w-1/6 p-2 border border-indigo-300'>Delete</th>
                </tr>
                </thead>
                <tbody>
                {currentPost?.map((user,index)=>{
                    return(
                    <tr key={index} className="odd:bg-white even:bg-indigo-100 h-14 hover:bg-gray-50">
                        <td className='text-center border border-indigo-300'>{user.userId}</td>
                        <td className='text-center border border-indigo-300'>{user.firstName}</td>
                        <td className='text-center border border-indigo-300'>{user.lastName}</td>
                        <td className='text-center border border-indigo-300'>{user.email}</td>
                        {<td className='text-center border border-indigo-300'>{user.sharedPosts.length}</td>}
                        <td className='text-center border border-indigo-300'><button className='p-2 rounded-lg bg-red-500 text-white' onClick={()=>deleteHandler(user._id)}>Delete</button></td>
                    </tr>
                    )
                })}
                </tbody>
            </table> 
         }
         <Pagination postPerPage={UserPerPage} totalPosts={users.length} paginate={paginate}/>
        </div>
    )
}

export default UsersTable