import React, { Fragment, useState } from 'react';

import profileImg from '../../../../assets/images/default_profile.png';

import FullScreenOriginalPost from './FullScreenOriginalPost';

import PostHalfTop from './PostHalfTop';

import PostMiddle from './PostMiddle';
import dateCalcFunction from './DateCalculations';

import PostMiddleCounters from './PostMiddleCounters';
import { languages } from '../../../languagesArray';

const Post = ({
  data,
  className,
  userData,
  sharedPost,
  sharedPostData,
  reactions,
  reactionsMakers,
  moreID,
  // For More position:
  postsProfile,

  // for edit and delete post:
  sharededitPost,
}) => {
  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  return (
    <div
      className={`rounded-lg shadow-lg bg-white dark:bg-zinc-800 dark:text-white transition duration-700 p-3 max-w-2xl mx-auto my-7 ${
        className && className
      }`}
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
          sharerId={data?.userId?._id}
          userID={userData?._id}
          sharedPost={sharedPost}
          sharedPostData={sharedPostData}
          reverseDirection={sharedPost && true}
          postId={data?._id}
          postData={data}
          // For More position:
          postsProfile={postsProfile}
          // for edit and delete post:
          sharededitPost={sharededitPost}
        />
      }

      <div className="">
        {!sharedPost && (
          <PostMiddleCounters
            languages={languages}
            data={data}
            reactions={reactions}
            reactionsMakers={reactionsMakers}
            sharedPost={sharedPost}
            setWriteComment={setWriteComment}
            writeComment={writeComment}
            userData={userData}
          />
        )}

        {!sharedPost && (
          <PostMiddle
            writeComment={writeComment}
            setWriteComment={setWriteComment}
            data={data}
            userData={userData}
            moreID={moreID}
            // For the middle three buttons position:
            postsProfile={postsProfile}
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
            fullScreenContentClassName="px-5 ml-7"
            postData={data}
          />
        }
        postMiddelAndBottom={
          <Fragment>
            {
              <PostMiddleCounters
                data={data}
                reactions={reactions}
                reactionsMakers={reactionsMakers}
                setWriteComment={setWriteComment}
                writeComment={writeComment}
              />
            }

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
              commentTreeVerticalHiddenReplysClassName="rotate-90 absolute -top-12 -left-8  md:-top-11 md:left-7 ml-2.5 lg:left-7 md:-ml-12"
              commentTreeVerticalHiddenReplysShowInputClassName="rotate-90 absolute top-0 -left-8 -mt-1 md:top-4 md:left-4 md:-mt-2 lg:left-4 md:-ml-12"
              commentTreeVerticalShowReplysClassName="rotate-90 absolute -top-20 mt-4 ml-0.5 md:-top-20 -left-24 md:-left-24"
              moreFullScreenClassName="md:-ml-24 lg1:ml-0"
              reactionsFullScreenClassName="true"
            />
          </Fragment>
        }
      />
    </div>
  );
};

export default Post;
