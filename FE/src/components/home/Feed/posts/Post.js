import React, { useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { RiShareForwardFill } from 'react-icons/ri';
import profileImg from '../../../../assets/images/default_profile.png';

const Post = () => {
  const [writeComment, setWriteComment] = useState(false);

  const [writeReply, setWriteReply] = useState(false);

  return (
    <div className="rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7">
      <div className="card-body">
        <div className="flex mb-3">
          <a href="/">
            <img
              src={profileImg}
              className="rounded-full mr-2 h-10"
              alt="Avatar"
            />
          </a>

          <div>
            <a href="/">
              <strong>Anna Doe</strong>
            </a>

            <a href="/" className="text-gray-600 text-sm block">
              10h
            </a>
          </div>
        </div>

        <p className="mb-5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque ex non
          impedit corporis sunt nisi nam fuga dolor est, saepe vitae delectus
          fugit, accusantium qui nulla aut adipisci provident praesentium?
        </p>
      </div>

      <div>
        <img
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beach-quotes-1559667853.jpg?crop=1.00xw:0.753xh;0,0.201xh&resize=980:*"
          className="w-full"
          alt="img"
        />
      </div>

      <div className="">
        <div className="flex justify-between my-3 border-b-2 pb-3 px-3">
          <div>
            <a href="/">
              <AiFillLike className="text-blue-700 inline mr-1 text-xl" />
              <BsHeartFill className="text-red-600 inline mr-1" />
              <span className="text-gray-500">124</span>
            </a>
          </div>

          <div>
            <a
              href="/"
              className="text-gray-500 mr-3 hover:border-b-2 pb-1 border-gray-300"
            >
              8 comments
            </a>
            <a
              href="/"
              className="text-gray-500 hover:border-b-2 pb-1 border-gray-300"
            >
              3 shares
            </a>
          </div>
        </div>

        <div className="flex justify-between border-b-2 pb-3 mb-4 px-9">
          <button type="button" className="btn flex">
            <AiFillLike className="mt-0.5 mr-2 text-xl" />
            Like
          </button>
          <button
            type="button"
            className="btn flex"
            onClick={() => {
              setWriteComment(!writeComment);
            }}
          >
            <FaCommentAlt className="mt-1.5 mr-2" />
            Comment
          </button>
          <button type="button" className="btn flex">
            <RiShareForwardFill className="mt-0.5 mr-2 text-2xl" />
            Share
          </button>
        </div>

        {writeComment && (
          <div>
            <div className="flex mb-3">
              <a href="/">
                <img
                  src={profileImg}
                  className="rounded-full mr-2 h-8"
                  alt="Avatar"
                />
              </a>
              <div className="w-full">
                <textarea
                  cols="75"
                  rows="1"
                  placeholder="Write a comment"
                  className="bg-gray-100 rounded-3xl px-5 py-1 outline-none w-full resize-none"
                />
              </div>
            </div>

            <div className="flex my-3">
              <a href="/">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                  className="rounded-full mr-2 h-8"
                  alt="Avatar"
                />
              </a>

              <div>
                <div className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit">
                  <a href="/" className="text-sm">
                    Malcolm Dosh
                  </a>
                  <a href="/" className="block">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Natus, aspernatur!
                  </a>
                </div>

                <div className="ml-3 text-sm mt-0.5">
                  <button type="button" className="btn">
                    Like
                  </button>

                  <button
                    type="button"
                    className="btn mx-3"
                    onClick={() => {
                      setWriteReply(true);
                    }}
                  >
                    Reply
                  </button>

                  <span className="text-gray-500 text-xs">57m</span>
                </div>

                {writeReply && (
                  <div className="flex mt-1">
                    <a href="/">
                      <img
                        src={profileImg}
                        className="rounded-full mr-2 h-8"
                        alt="Avatar"
                      />
                    </a>

                    <textarea
                      cols="75"
                      rows="1"
                      placeholder="Reply to Malcolm Dosh"
                      className="bg-gray-100 rounded-3xl px-5 py-1 outline-none w-full resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
