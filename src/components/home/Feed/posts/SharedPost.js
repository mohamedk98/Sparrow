import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';
import Post from './Post';
import profileImg from '../../../../assets/images/default_profile.png';
import PostHalfTop from './PostHalfTop';
import { useDispatch, useSelector } from 'react-redux';
import {
  forceUpdateHandler,
  postsDataHandler,
  postsMineDataHandler,
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
  // console.log(otherUserState?._id);

  // store posts from DB in an array:
  // const [posts, setPosts] = useState([]);

  // const [myposts, setMyPosts] = useState([]);

  const posts = useSelector(state => state.newsFeed.postsData);
  const myposts = useSelector(state => state.newsFeed.postsMineData);

  // Infinte scroll:
  let pageNumber = useRef(1);
  const loadMorePosts = useCallback(() => {
    console.log(pageNumber.current);
    setLoading(true);

    let onePage = [];
    let onePageMine = [];
    axiosInstance
      .post(
        `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${
          pageNumber.current
        }?userId=${otherUserState._id}`
        // `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${pageNumber.current}`
      )
      .then(response => {
        console.log(response);
        if (response.data.allPosts.length === 0) {
          return setLoading(false);
        } else {
          setLoading(false);
          //Store page number in all posts:
          response.data.allPosts.map(res => {
            res.pageNum = response?.data?.page;

            if (postsProfile && otherUserState._id) {
              onePageMine.push(res);
              console.log(otherUserState?._id);

              // setPosts(prev => [...prev, ...onePage]);
              // dispatch(postsMineDataHandler([...myposts, ...onePageMine]));
            } else {
              onePage.push(res);
              // setMyPosts(prev => [...prev, ...onePageMine]);
              // dispatch(postsDataHandler([...posts, ...onePage]));
            }

            // response.data.allPosts.length < 1 && setLoading(false);
          });

          if (postsProfile) {
            // setPosts(prev => [...prev, ...onePage]);
            dispatch(postsMineDataHandler([...myposts, ...onePageMine]));
          } else {
            // setMyPosts(prev => [...prev, ...onePageMine]);

            dispatch(
              postsDataHandler(
                [...posts, ...onePage].filter(post => post._id !== post._id)
              )
            );
          }
          pageNumber.current += 1;
        }

        // setPosts(onePage);

        // dispatch(forceUpdateHandler(100000));
        console.log(posts);
        // console.log(response.data.page);

        // setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [otherUserState?._id]);

  const handleScroll = useCallback(
    e => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      // console.log(currentHeight);
      if (currentHeight + 1 >= scrollHeight) {
        setLoading(false);

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
        if (response.data.length === 0) {
          return setLoading(false);
        } else {
          dispatch(profileDataHandler(response?.data));
        }
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, handleScroll, loadMorePosts]);

  // Force rercall api upon change in component:
  useEffect(() => {
    let onePage = [];
    let onePageMine = [];
    forceReRender &&
      axiosInstance
        .post(
          // `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${forceReRender}`,
          `/${postsProfile ? 'profile/posts' : 'newsfeed'}/${
            pageNumber.current
          }?userId=${otherUserState._id}`
        )
        .then(response => {
          if (response.data?.allPosts?.length === 0) {
            console.log('res148', response);
            return setLoading(false);
          } else {
            response.data.allPosts.map(res => {
              res.pageNum = response?.data?.page;

              if (postsProfile && otherUserState._id) {
                onePageMine.push(res);
                // setPosts(prev => [...prev, ...onePage]);
                // dispatch(postsMineDataHandler([...myposts, ...onePageMine]));
              } else {
                onePage.push(res);
                // setMyPosts(prev => [...prev, ...onePageMine]);
                // dispatch(postsDataHandler([...posts, ...onePage]));
              }
            });
            // response.pageNum = response?.data?.page;

            if (postsProfile && otherUserState._id) {
              console.log('res154', response);
              // onePageMine.push(response);
              // setMyPosts(prev => [...prev, ...onePageMine]);
              dispatch(postsMineDataHandler(onePageMine));
            } else {
              // onePage.push(response);
              // setPosts(prev => [...prev, ...onePage]);
              console.log(posts);
              console.log(onePage);
              dispatch(postsDataHandler(onePage));

              console.log('res158', response);
              console.log(myposts);
            }
            // } else {
            // response.data.allPosts.map(res => {
            //   console.log(response);
            //   res.pageNum = response?.data?.page;
            //   onePage.push(res);
            // });
            // setPosts(onePage);
          }

          // console.log(userData);

          // setPosts(onePage);

          // dispatch(forceUpdateHandler(100000));
          // console.log(posts);
          // console.log(response.data.page);
        })
        .catch(error => {
          console.log(error);
        });
  }, [dispatch, forceReRender]);

  return (
    <Fragment>
      {(postsProfile ? myposts : posts)?.map(post => {
        // SharedPost:
        return post?.sharerId ? (
          <div
            className="rounded-lg shadow-lg dark:bg-zinc-800 transition duration-700 dark:text-white bg-white p-3 max-w-2xl mx-auto my-7"
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
      {loading && <PostSkeleton />}
    </Fragment>
  );
};

export default SharedPost;
