import React, { useCallback, useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';
import Post from './Post';
import profileImg from '../../../../assets/images/default_profile.png';
import PostHalfTop from './PostHalfTop';
import { useDispatch, useSelector } from 'react-redux';
import {
  forceUpdateHandler,
  profileDataHandler,
} from '../../../../store/userSlice/NewsFeedSlice';
import PostMiddle from './PostMiddle';
import dateCalcFunction from './DateCalculations';

const SharedPost = ({ postsProfile }) => {
  // Force rercall api upon change in component:
  const dispatch = useDispatch();
  const forceReRender = useSelector(state => state.newsFeed.forceUpdate);

  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  const userData = useSelector(state => state.newsFeed.profileData);
  // console.log(userData);

  const [posts, setPosts] = useState([]);

  // Infinte scroll:
  let pageNumber = useRef(1);
  const loadMorePosts = useCallback(() => {
    let onePage = [];
    axiosInstance
      .get(
        `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${1}`
        // `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${pageNumber.current}`
      )
      .then(response => {
        console.log(response);
        response.data.allPosts.map(res => {
          res.pageNum = response?.data?.page;
          onePage.push(res);
        });

        // setPosts(prev => [...prev, ...onePage]);
        setPosts(response.data.allPosts);

        dispatch(forceUpdateHandler(0));
        console.log(posts);
        console.log(response.data.page);
      })
      .catch(error => {
        console.log(error);
      });
    pageNumber.current += 1;
  }, []);

  const handleScroll = useCallback(
    e => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      if (currentHeight + 1 >= scrollHeight) {
        loadMorePosts();
      }
    },
    [loadMorePosts]
  );

  useEffect(() => {
    // Fetching NewsFeed data:
    loadMorePosts();

    window.addEventListener('scroll', handleScroll);

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
  }, [dispatch, handleScroll, loadMorePosts]);

  // Force rercall api upon change in component:
  useEffect(() => {
    let onePage = [];
    forceReRender &&
      axiosInstance
        .get(`/${postsProfile ? 'profile/posts' : 'newsfeed'}/${forceReRender}`)
        .then(response => {
          console.log(response);
          response.data.allPosts.map(res => {
            res.pageNum = response?.data?.page;
            onePage.push(res);
          });

          setPosts(onePage);

          dispatch(forceUpdateHandler(0));
          console.log(posts);
          console.log(response.data.page);
        })
        .catch(error => {
          console.log(error);
        });
  }, [dispatch, forceReRender]);

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
          originalPostId={post?.originalPostId}
          sharedPost={false}
          sharedPostData={post}
          userData={userData}
          moreID={post?._id}
          userID={userData?._id}
          sharerId={post?.sharerId?._id}
          postBody={post?.caption}
          // For More position:
          postsProfile={postsProfile}
          // for edit and delete post:
          sharededitPost={true}
        />
        <Post
          data={post?.originalPostId}
          className="p-0 border-2 border-t-0 px-3 -mx-2.5 shadow-none rounded-t-none mb-0"
          userData={userData}
          sharedPost={true}
          sharedPostData={post}
          // For fullScreen mode:
          reactions={[
            ...new Set(
              post?.originalPostId?.reactions?.map(post => post?.reaction)
            ),
          ]}
          // For toolTip purposes:
          reactionsMakers={post?.originalPostId?.reactions?.map(post => {
            return post;
          })}
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
            // For More position:
            postsProfile={postsProfile}
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
        // For More position:
        postsProfile={postsProfile}
        // for edit and delete post:
        sharededitPost={false}
      />
    );
  });
};

export default SharedPost;
