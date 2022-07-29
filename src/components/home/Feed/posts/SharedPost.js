import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';
import Post from './Post';
import profileImg from '../../../../assets/images/default_profile.png';
import PostHalfTop from './PostHalfTop';
import { useDispatch, useSelector } from 'react-redux';
import {
  postsDataHandler,
  profileDataHandler,
} from '../../../../store/userSlice/NewsFeedSlice';
import PostMiddle from './PostMiddle';

const SharedPost = () => {
  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector(state => state.newsFeed.postsData);
  // console.log(posts);

  const userData = useSelector(state => state.newsFeed.profileData);
  // console.log(userData);
  useEffect(() => {
    // Fetching NewsFeed data:
    axiosInstance
      .get('/newsfeed')
      .then(response => {
        // console.log(response.data);

        // Sorting data upon date descendingly:
        // let data = response.data.sort((a, b) => {
        //   return new Date(...a.createdAt).getTime() >
        //     new Date(...b.createdAt).getTime()
        //     ? -1
        //     : 0;
        // });
        let data = response.data;
        // console.log(data);
        console.log(data);
        dispatch(postsDataHandler(data));
      })
      .catch(error => {
        console.log(error);
      });

    // Fetching user Data:
    axiosInstance
      .get('/profile')
      .then(response => {
        // console.log(response.data);
        dispatch(profileDataHandler(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch]);

  return posts?.map(post => {
    return post?.sharerId ? (
      <div
        className="rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7"
        key={post?._id}
      >
        <PostHalfTop
          profileSRC={profileImg}
          profileName={
            post?.sharerId?.firstName + ' ' + post?.sharerId?.lastName
          }
          postDate={post?.shareDate?.slice(0, 10)}
          //   hideMore={true}
          // postBody={post?.content}
          // postImage={post.media}
        />
        <Post
          data={post.originalPostId}
          className=" bg-gray-50 "
          userData={userData}
        />

        <PostMiddle
          writeComment={writeComment}
          setWriteComment={setWriteComment}
          data={post}
        />
      </div>
    ) : (
      <Post data={post} key={post._id} userData={userData} />
    );
  });
};

export default SharedPost;
