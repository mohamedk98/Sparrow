import React, { useState } from 'react';
// import { BsHeartFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';

import profileImg from '../../../../assets/images/default_profile.png';

import PostHalfTop from './PostHalfTop';

import PostMiddle from './PostMiddle';

const Post = ({ data, className, userData }) => {
  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  return (
    <div
      className={
        'rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7 ' + className
      }
      key={data._id}
    >
      <PostHalfTop
        profileSRC={profileImg}
        profileName={data.creatorName}
        postDate={data.createdAt.slice(0, 10)}
        hideMore={!className ? false : true}
        postBody={data.content}
        postImage={data?.media}
      />

      <div className="">
        <div className="flex justify-between mt-3 border-b-2 pb-3 px-3">
          <div>
            <a href="/">
              <AiFillLike className="text-blue-700 inline mr-1 -mt-1 text-xl" />
              {
                // <BsHeartFill className="text-red-600 inline mr-1" />
              }
              <span className="text-gray-500">{data?.reactions.length}</span>
            </a>
          </div>

          <div className="h-6">
            <button
              onClick={() => {
                setWriteComment(!writeComment);
              }}
              className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
            >
              {data.comments.length}{' '}
              {data.comments.length < 2 ? 'comment' : 'comments'}
            </button>
            <button className="text-gray-500 hover:border-b-2 border-gray-300">
              {data?.sharesCount} {data?.sharesCount === 1 ? 'share' : 'shares'}
            </button>
          </div>
        </div>

        <PostMiddle
          writeComment={writeComment}
          setWriteComment={setWriteComment}
          data={data}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Post;
