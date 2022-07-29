import React, { useState, useEffect } from 'react';
// import { BsHeartFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { RiShareForwardFill } from 'react-icons/ri';
import profileImg from '../../../../assets/images/default_profile.png';

import PostReactions from './PostReactions';

import TextArea from './TextArea';
import LikeButton from './LikeButton';
import ReplyLikeButton from './ReplyLikeButton';

import { axiosInstance } from '../../../../network/axiosInstance';
import More from './More';
import CreatePostModal from '../CreatePostModal';
import PostHalfTop from './PostHalfTop';

const Post = () => {
  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  // Hide and show reply in comments:
  const [writeReply, setWriteReply] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions clicked:
  const [reactionClicked, setReactionClicked] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  const reactHandler = name => {
    // console.log(name);
    // console.log(reactType);

    setReactionClicked(true);
    // console.log(reactionClicked);

    setReactType(name);

    let className = 'font-bold timepicker-clock-animation ';

    switch (name) {
      case 'Like':
        className += 'text-facebook-blue';
        break;

      case 'Love':
        className += 'text-red-500';
        break;

      case 'Care':
      case 'Haha':
      case 'Wow':
      case 'Sad':
        className += 'text-yellow-400';
        break;

      case 'Angry':
        className += 'text-rose-500';
        break;

      default:
        break;
    }

    setReactClass(className);
  };

  useEffect(() => {
    axiosInstance
      .get('/posts/62d3101ce5f67816a3a49926')
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <div className="rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7">
      <PostHalfTop
        profileSRC={profileImg}
        profileName="Anna Doe"
        postDate="10h"
        // hideMore={true}
        postBody=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque ex non
      impedit corporis sunt nisi nam fuga dolor est, saepe vitae delectus
      fugit, accusantium qui nulla aut adipisci provident praesentium?"
        postImage="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beach-quotes-1559667853.jpg?crop=1.00xw:0.753xh;0,0.201xh&resize=980:*"
      />

      <div className="">
        <div className="flex justify-between mt-3 border-b-2 pb-3 px-3">
          <div>
            <a href="/">
              <AiFillLike className="text-blue-700 inline mr-1 -mt-1 text-xl" />
              {
                // <BsHeartFill className="text-red-600 inline mr-1" />
              }
              <span className="text-gray-500">124</span>
            </a>
          </div>

          <div className="h-6">
            <button
              onClick={() => {
                setWriteComment(!writeComment);
              }}
              className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
            >
              8 comments
            </button>
            <button className="text-gray-500 hover:border-b-2 border-gray-300">
              3 shares
            </button>
          </div>
        </div>

        <div className="flex justify-between border-b-2 mb-4 px- relative">
          <PostReactions
            // className=""
            visible={visible}
            setVisible={setVisible}
            reactHandler={reactHandler}
          />
          <LikeButton
            reactType={reactType}
            setReactType={setReactType}
            reactionClicked={reactionClicked}
            reactClass={reactClass}
            setReactClass={setReactClass}
            setVisible={setVisible}
            setReactionClicked={setReactionClicked}
          />
          <button
            type="button"
            className="btn flex hover:bg-gray-100 justify-center py-2 my-1 px-5 md:px-7 hover:lg:px-10 ml-3 md:ml-3 lg:ml-7 rounded-lg"
            onClick={() => {
              setWriteComment(!writeComment);
            }}
          >
            <FaCommentAlt className="mt-1.5 mr-2" />
            Comment
          </button>
          <button
            type="button"
            className="btn flex hover:bg-gray-100 justify-center py-2 my-1 px-7 md:px-9 lg:px-14 rounded-lg"
            data-bs-toggle="modal"
            data-bs-target="#ModalCenter"
          >
            <RiShareForwardFill className="mt-0.5 mr-2 text-2xl" />
            Share
          </button>
          <CreatePostModal
            modelID="ModalCenter"
            profileSRC={profileImg}
            profileName="Anna Doe"
            postDate="10h"
            hideMore={true}
            postBody=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque ex non
        impedit corporis sunt nisi nam fuga dolor est, saepe vitae delectus
        fugit, accusantium qui nulla aut adipisci provident praesentium?"
            postImage="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beach-quotes-1559667853.jpg?crop=1.00xw:0.753xh;0,0.201xh&resize=980:*"
            reverseDirection={true}
          />
        </div>

        {writeComment && (
          <div className="relative">
            <TextArea placeholder="Write a comment" />

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

                <div className="ml-3 text-sm mt-0.5 mb-3">
                  <ReplyLikeButton
                    reactType={reactType}
                    setReactType={setReactType}
                    reactionClicked={reactionClicked}
                    reactClass={reactClass}
                    setReactClass={setReactClass}
                    setVisible={setVisible}
                    visible={visible}
                    reactHandler={reactHandler}
                    setReactionClicked={setReactionClicked}
                  />

                  <button
                    type="button"
                    className="btn mx-3 hover:underline underline-offset-2"
                    onClick={() => {
                      setWriteReply(true);
                    }}
                  >
                    Reply
                  </button>

                  <span className="text-gray-500 text-xs">57m</span>

                  <More
                    text="Hide comment"
                    containerClassName="dropdown absolute -right-2 top-16"
                    iconClassName="w-7 h-7"
                    liNum1={1}
                    tooltipData="more"
                  />
                </div>

                {writeReply && <TextArea placeholder="Reply to Malcolm Dosh" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
