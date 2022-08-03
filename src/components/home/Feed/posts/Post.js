import React, { Fragment, useState } from 'react';

import profileImg from '../../../../assets/images/default_profile.png';

import { AiFillLike } from 'react-icons/ai';

import FullScreenOriginalPost from './FullScreenOriginalPost';

import PostHalfTop from './PostHalfTop';

import PostMiddle from './PostMiddle';
import dateCalcFunction from './DateCalculations';

import PostMiddleCounters from './PostMiddleCounters';

const Post = ({
  data,
  className,
  userData,
  sharedPost,
  sharedPostData,
  reactions,
  reactionsMakers,
  moreID,
}) => {
  // console.log(reactions, sharedPost);
  // console.log(reactionsMakers, sharedPost);

  // console.log(sharedPost);

  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  // console.log(sharedPostData);
  // console.log(data?._id);
  console.log();
  return (
    <div
      className={`rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7 ${className}`}
      key={data?._id}
    >
      {
        <PostHalfTop
          profileSRC={data?.userId?.profileImage || profileImg}
          profileName={data?.creatorName}
          postDate={dateCalcFunction(data?.createdAt)}
          hideMore={!className ? false : true}
          postBody={data?.content}
          postImage={data?.media}
          sharerId={data?.sharerId_id}
          userID={userData?._id}
          sharedPost={sharedPost}
          sharedPostData={sharedPostData}
          reverseDirection={sharedPost && true}
          postId={data?._id}
        />
      }

      <div className="">
        {!sharedPost && (
          <PostMiddleCounters
            data={data}
            reactions={reactions}
            reactionsMakers={reactionsMakers}
            sharedPost={sharedPost}
            setWriteComment={setWriteComment}
            writeComment={writeComment}
          />
        )}

        {!sharedPost && (
          <PostMiddle
            writeComment={writeComment}
            setWriteComment={setWriteComment}
            data={data}
            userData={userData}
            moreID={moreID}
          />
        )}
      </div>

      <FullScreenOriginalPost
        postData={data}
        PostHalfTop={
          <PostHalfTop
            profileSRC={data?.userId?.profileImage || profileImg}
            profileName={data?.creatorName}
            postDate={dateCalcFunction(data?.createdAt)}
            moreFullScreenClassName="-ml-24"
            postBody={data?.content}
            userID={userData?._id}
          />
        }
        postMiddelAndBottom={
          <Fragment>
            <PostMiddleCounters
              data={data}
              reactions={reactions}
              reactionsMakers={reactionsMakers}
              setWriteComment={setWriteComment}
              writeComment={writeComment}
            />

            <PostMiddle
              data={data}
              writeComment={writeComment}
              setWriteComment={setWriteComment}
              userData={userData}
              moreID={moreID}
              fullScreenContainerClassName="md:container flex justify-around md:justify-evenly border-b-2 mb-4"
              fullScreenReactionClassName="flex hover:bg-gray-100 py-2 my-1 px-8 md:px-4 lg:px-8 rounded-lg"
              fullScreenCommentClassName="flex hover:bg-gray-100 py-2 my-1 px-5 md:px-1.5 lg:px-5 rounded-lg"
              fullScreenShareClassName="flex hover:bg-gray-100 py-2 my-1 px-7 md:px-3 lg:px-5 rounded-lg"
              fullScreenCommentsClassName="overflow-y-auto overflow-x-hidden max-h-72"
              commentTreeVerticalHiddenReplysClassName="rotate-90 absolute top-16 -left-8  md:top-16 md:left-7  lg:top-16 ml-2.5 lg:left-7 md:-ml-12"
              commentTreeVerticalHiddenReplysShowInputClassName="rotate-90 absolute top-28 -left-8  -mt-1 md:top-32 md:left-4 md:-mt-2 lg:top-32 lg:left-4 md:-ml-12"
              commentTreeVerticalShowReplysClassName="rotate-90 absolute -top-20 mt-4 ml-0.5 md:-top-20 -left-24 md:-left-24"
              moreFullScreenClassName="-ml-24"
              reactionsFullScreenClassName="true"
            />
          </Fragment>
        }
      />
    </div>
  );
};

export default Post;