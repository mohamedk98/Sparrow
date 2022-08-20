import React, { useEffect, useState, Fragment } from 'react';
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

import PostSkeleton from './PostSkeleton/PostSkeleton';

const SharedPost = ({ postsProfile }) => {
  // for Skeleton:
  const [loading, setLoading] = useState(false);

  // Force rercall api upon change in component:
  const dispatch = useDispatch();
  const forceReRender = useSelector(state => state.newsFeed.forceUpdate);

  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  // Read loggedIn user data from store:
  const userData = useSelector(state => state.newsFeed.profileData);

  // Read loggedIn friends user data from store:
  const otherUserState = useSelector(
    state => state?.otherUserData?.otherUserData
  );

  // store posts from DB in an array:
  const [posts, setPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);

  // To show skeleton only in the first load:
  useEffect(() => setLoading(true), []);

  useEffect(() => {
    // Fetching user Data:
    axiosInstance
      .get('/profile')
      .then(response => {
        dispatch(profileDataHandler(response?.data));
      })
      .catch(error => {});

    // Fetching post data for home and profile:
    let onePage = [];
    let profileOnePage = [];

    axiosInstance
      .post(
        `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${1}?userId=${
          otherUserState._id
        }`
      )
      .then(response => {
        setLoading(false);

        response.data.allPosts.map(res => {
          res.pageNum = response?.data?.page;

          if (postsProfile) {
            profileOnePage.push(res);
          } else {
            onePage.push(res);
          }
        });

        if (postsProfile) {
          setProfilePosts(profileOnePage);
        } else {
          setPosts(onePage);
        }

        // Force rercall api upon change in component:
        dispatch(forceUpdateHandler(1200000));
      })
      .catch(error => {});
  }, [dispatch, forceReRender, otherUserState._id]);

  return (
    <Fragment>
      {(postsProfile ? profilePosts : posts)?.map(post => {
        // SharedPost:
        return post?.sharerId ? (
          <div
            className="rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7 dark:bg-zinc-800 dark:text-white "
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
          // RegularPost:
          <Post
            data={post}
            key={post._id}
            userData={userData}
            sharedPost={false}
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
            // for edit and delete post:
            sharededitPost={false}
          />
        );
      })}

      {
        // postSkeleton:
      }

      {(loading || (profilePosts?.length === 0 && posts?.length === 0)) && (
        <PostSkeleton />
      )}
    </Fragment>
  );
};

export default SharedPost;
