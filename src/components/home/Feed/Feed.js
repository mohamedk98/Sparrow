import React from 'react';
import InputBox from './InputBox';
import Post from './posts/Post';
import SharedPost from './posts/SharedPost';

const Feed = () => {
  return (
    <div className="flex-grow  h-full pb-44 pt-6 mx-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <InputBox />
        {
          //<Post />
        }
        <SharedPost />
      </div>
    </div>
  );
};

export default Feed;
