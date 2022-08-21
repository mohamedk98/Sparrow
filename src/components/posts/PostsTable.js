import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/axiosInstance";
import { addPostData } from '../../Store/UserSlice/PostsDataSlice';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import moment from 'moment';

function PostsTable() {
    const postState = useSelector((state) => state.postData.postData);
    const [posts,setPosts]=useState([]);

    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [postPerPage]=useState(5);

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get("/admin/posts")
            .then((res) => {
                dispatch(addPostData(res.data));
                setPosts(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        }, []);
    const deleteHandler = (id)=>{
        axiosInstance
        .delete(`/admin/posts/${id}`)
        .then(res=>{
            axiosInstance
            .get("/admin/posts")
            .then((res) => {
                dispatch(addPostData(res.data));
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    
    //get current posts
    const indexOfLastPost=currentPage * postPerPage;
    const indexOfFirstPost=indexOfLastPost-postPerPage;
    const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost);

    //change page
    const paginate=(pageNumber)=>setCurrentPage(pageNumber);

   
    return (
        <div>
            {loading ? <div className='flex justify-center items-center mt-48'><Loader /></div>
            :
            <table className='border-collapse border border-slate-400'>
                <thead className='h-24 bg-indigo-500 text-white'>
                <tr>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>Creator Name</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>Created at</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>Content</th>
                    <th className='w-1/6 p-2 border border-r border-indigo-300'>User ID</th>
                    <th className='w-1/6 p-2 border border-indigo-300'>Delete</th>
                </tr>
                </thead>
                <tbody>
                {currentPost?.map((post,index)=>{
                    return(
                    <tr key={index} className="odd:bg-white even:bg-indigo-100 h-14 hover:bg-gray-50">
                        <td className='text-center border border-indigo-300'>{post.creatorName}</td>
                        <td className='text-center border border-indigo-300'>{moment(post.createdAt).format('DD-MM-YYYY , hh:mm:ss a')}</td>
                        <td className='text-center border border-indigo-300'>{post.content}</td>
                        <td className='text-center border border-indigo-300'>{post.userId}</td>
                        <td className='text-center border border-indigo-300'><button className='p-2 rounded-lg bg-red-500 text-white' onClick={()=>deleteHandler(post._id)}>Delete</button></td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            }
            <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>      
        </div>
    )
}

export default PostsTable