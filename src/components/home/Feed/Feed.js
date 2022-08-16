import React, { useState } from 'react';
import InputBox from './InputBox';
import Post from './posts/Post';
import SharedPost from './posts/SharedPost';

const Feed = () => {
  // To open create post modal:
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-grow h-full pb-44 pt-6 mx-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <InputBox showModal={showModal} setShowModal={setShowModal} />

        <SharedPost />
      </div>
    </div>
  );
};

export default Feed;
