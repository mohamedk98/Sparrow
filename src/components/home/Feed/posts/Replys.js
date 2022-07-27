import React from 'react';
import More from './More';

const Replys = ({ ReplyLikeButton, profileImage, name, content, date }) => {
  return (
    <div className="flex my-3 ml-10">
      <a href="/">
        <img
          src={profileImage}
          className="rounded-full mr-2 w-8 h-8"
          alt="Avatar"
        />
      </a>

      <div className="max-w-md relative">
        <div className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit ">
          <a href="/" className="text-sm">
            {name}
          </a>
          <a href="/" className="block">
            {content}
          </a>
        </div>

        <div className="ml-3 text-sm mt-0.5 mb-3">
          {ReplyLikeButton}

          {
            // <button
            //   type="button"
            //   className="btn mx-3 hover:underline underline-offset-2"
            //   onClick={() => {
            //     setWriteReply(true);
            //   }}
            // >
            //   Reply
            // </button>
          }

          <span className="text-gray-500 ml-2 text-xs">{date}</span>
        </div>

        <More
          text="Hide comment"
          containerClassName="dropdown absolute left-40 -top-2 mt-4"
          iconClassName="w-7 h-7"
          liNum1={1}
          tooltipData="more"
        />
      </div>
    </div>
  );
};

export default Replys;
