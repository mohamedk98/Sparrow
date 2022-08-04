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
import dateCalcFunction from './DateCalculations';

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
      .get('/newsfeed/page')
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
          profileSRC={post?.sharerId?.profileImage || profileImg}
          profileName={
            post?.sharerId?.firstName + ' ' + post?.sharerId?.lastName
          }
          // To calc time difference between post date and current date:
          postDate={dateCalcFunction(post?.createdAt)}
          // reverseDirection={true}
          originalPostId={post?.originalPostId}
          sharedPost={false}
          sharedPostData={post}
          userData={userData}
          moreID={post?._id}
          userID={userData?._id}
          // hideMore={true}
          // postBody={post?.content}
          // postImage={post.media}
        />
        <Post
          data={post.originalPostId}
          className="p-0 border-2 border-t-0 px-3 -mx-2.5 shadow-none rounded-t-none mb-0"
          userData={userData}
          sharedPost={true}
          sharedPostData={post}
        />

        {
          <PostMiddle
            writeComment={writeComment}
            setWriteComment={setWriteComment}
            data={post}
            sharedPost={true}
            sharedPostData={post}
            userData={userData}
            reactions={[
              ...new Set(post?.reactions?.map(post => post?.reaction)),
            ]}
            // For toolTip purposes:
            reactionsMakers={post?.reactions?.map(post => {
              return post;
            })}
            moreID={post?._id}
          />
        }
      </div>
    ) : (
      <Post
        data={post}
        key={post._id}
        userData={userData}
        sharedPost={false}
        reactions={[...new Set(post?.reactions?.map(post => post?.reaction))]}
        // For toolTip purposes:
        reactionsMakers={post?.reactions?.map(post => {
          return post;
        })}
        moreID={post?._id}
      />
    );
  });
};

export default SharedPost;
