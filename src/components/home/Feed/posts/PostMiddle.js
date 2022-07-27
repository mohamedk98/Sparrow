import React, { useState, Fragment } from 'react';

import { FaCommentAlt } from 'react-icons/fa';
import { RiShareForwardFill } from 'react-icons/ri';
import { BiShare } from 'react-icons/bi';
import PostReactions from './PostReactions';

import LikeButton from './LikeButton';

import ShareModal from './ShareModal';

import profileImg from '../../../../assets/images/default_profile.png';
import TextArea from './TextArea';
import ReplyLikeButton from './ReplyLikeButton';
import More from './More';
import { axiosInstance } from '../../../../network/axiosInstance';
import ReplyedToComments from './ReplyedToComments';

const PostMiddle = ({ data, writeComment, setWriteComment, userData }) => {
  // Edit Comment:
  const [editComment, setEditComment] = useState(false);

  // Hide and show reply input in comments:
  const [writeReply, setWriteReply] = useState(false);

  // Hide and show reply comments in comments:
  const [showReplyComments, setShowReplyComments] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions clicked:
  const [reactionClicked, setReactionClicked] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  const reactHandler = name => {
    console.log(name);
    // console.log(reactType);

    setReactionClicked(true);
    // console.log(reactionClicked);

    setReactType(name);
    // console.log(reactType);

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
    let formData = new FormData();
    formData.append('reaction', name);
    // Send reaction to DB:
    const reactBody = { reaction: name };
    let endPoint = data?.sharerId
      ? `/reaction/sharedPost/${data._id}`
      : `/reaction/post/${data._id}`;
    axiosInstance
      .post(endPoint, reactBody, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        console.log(data._id);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // console.log(data);

  let id = data.originalPostId ? data._id : data._id;

  return (
    <Fragment>
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
          data={data}
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

        <ShareModal
          modelID="ModalCenter"
          profileSRC={profileImg}
          profileName={data?.creatorName}
          postDate={data?.createdAt?.slice(0, 10)}
          hideMore={true}
          postBody={data?.content}
          postImage="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beach-quotes-1559667853.jpg?crop=1.00xw:0.753xh;0,0.201xh&resize=980:*"
          reverseDirection={true}
          id={data?._id}
        />
      </div>

      {
        // Show Write a Comment input
      }
      {writeComment && (
        <div className="relative">
          <TextArea
            placeholder="Write a comment"
            id={id}
            comment={true}
            // showMore={true}
            showProfileImage={true}
          />

          {
            // Show Comments
          }
          {data?.comments?.map(comment => (
            <div className="flex flex-col my-3" key={comment?._id}>
              <div>
                <div className="flex">
                  <a href="/">
                    <img
                      src={comment?.userId?.profileImage}
                      className="rounded-full mr-2 h-8 w-8"
                      alt="Avatar"
                    />
                  </a>

                  {
                    // Show and hide edit comment input:
                  }
                  {editComment && comment?._id === editComment ? (
                    <div className="relative">
                      <TextArea
                        value={comment?.content}
                        id={id}
                        commentId={comment?._id}
                        postId={id}
                        editComment={true}
                        // showMore={true}
                        showProfileImage={false}
                        autoFocus={true}
                      />
                      <button
                        onClick={() => setEditComment(false)}
                        className="text-xs absolute bottom-0 left-12 ml-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div
                      className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit "
                      id={comment?.userId?._id}
                    >
                      <span className="text-sm">
                        {comment?.userId?.firstName +
                          ' ' +
                          comment?.userId?.lastName}
                      </span>
                      <div
                        className="max-w-xs md:max-w-sm break-words relative"
                        id={comment?._id}
                      >
                        {comment.content}

                        {
                          // Show more options to comments
                          // Need To Fix liNum2
                        }
                        <More
                          text="Delete comment"
                          deleteComment={true}
                          containerClassName="dropdown absolute -right-14 -top-8"
                          iconClassName="w-7 h-7"
                          liNum1={1}
                          // To show or hide liNum2:
                          id={comment?.userId?._id}
                          userID={userData?._id}
                          setEditComment={setEditComment}
                          liNum2={2}
                          text2={'Edit comment'}
                          tooltipData="more"
                          commentId={comment?._id}
                          postId={id}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {
                  // Show Reply to Comments buttons
                }
                <div>
                  <div className="ml-20 text-sm mt-0.5 mb-3">
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
                      id={comment?._id}
                      onClick={e => {
                        if (comment?._id === e.target.id) {
                          // console.log(e.target.id);
                          setWriteReply(e.target.id);
                        }
                      }}
                    >
                      Reply
                    </button>

                    <span className="text-gray-500 text-xs">57m</span>
                  </div>
                </div>
              </div>

              {
                // Show Replys to Comments
              }
              {comment?.reply?.length > 0 &&
                showReplyComments !== comment?._id && (
                  <Fragment>
                    <button
                      id={comment?._id}
                      className={`mr-72 text-sm flex ${
                        showReplyComments === comment?._id
                          ? 'text-blue-500'
                          : ''
                      }
                      `}
                      onClick={() =>
                        comment?.reply?.length > 0
                          ? setShowReplyComments(comment?._id)
                          : ''
                      }
                    >
                      <BiShare
                        className={`rotate-180 ml-12 mr-1 mt-0.5 ${
                          showReplyComments === comment?._id
                            ? 'text-blue-500'
                            : ''
                        }`}
                      />
                      {comment?.reply?.length}{' '}
                      {comment?.reply?.length === 1 ? 'reply' : 'replies'}
                    </button>

                    <div className="relative -mt-3 md:mt- -top-4 md:-top-4 left-4 md:left-4">
                      .....
                    </div>

                    <div className="rotate-90 relative top-24 md:top-36 lg:top-56 -left-48 md:-left-52 lg:-left-72 md:-ml-9">
                      ..................
                    </div>

                    {writeReply === comment?._id && (
                      <Fragment>
                        <div className="rotate-90 relative -mt-2 top-40 md:top-52 md:-mt-3 lg:top-72 -left-48 md:-left-52 lg:-left-72 md:-ml-9">
                          .....................
                        </div>
                        <div className="relative -mt-3 top-6 md:top-6 left-4 md:left-4">
                          .....
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}

              {showReplyComments === comment?._id && (
                <div className="relative">
                  {comment?.reply?.map(reply => (
                    <Fragment key={reply?._id}>
                      <ReplyedToComments
                        reply={reply}
                        comment={comment}
                        ReplyLikeButton={
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
                        }
                      />

                      {
                        // Make a line connection:
                      }
                      <div className="relative -mt-3 md:-mt-0 -top-16 md:-top-16 left-4 md:left-4">
                        .....
                      </div>

                      <div className="rotate-90 relative top-8 md:top-20 lg:top-40 -left-48 md:-left-52 lg:-left-72 md:-ml-9">
                        ...............................................
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}

              {
                // Write a Reply to a comment
              }

              {(writeReply === comment?._id ||
                showReplyComments === comment?._id) && (
                <Fragment>
                  <TextArea
                    placeholder="Reply to Malcolm Dosh"
                    id={comment?._id}
                    postId={id}
                    reply={true}
                    // showMore={true}
                    replyClassName="ml-10"
                    // className="animation"
                    showProfileImage={true}
                  />

                  {
                    // Make a line connection:
                  }
                  {showReplyComments === comment?._id && (
                    <div className="relative -top-12 md:-top-11 left-4 md:left-5 md:-mt-2 md:-ml-1">
                      .....
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PostMiddle;
