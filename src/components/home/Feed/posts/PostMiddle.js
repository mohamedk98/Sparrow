import React, { useState, Fragment } from 'react';

import { FaCommentAlt } from 'react-icons/fa';
import { RiShareForwardFill } from 'react-icons/ri';
import { BiShare } from 'react-icons/bi';
import PostReactions from './PostReactions';

import LikeButton from './LikeButton';

import ShareModal from './ShareModal';

import TextArea from './TextArea';
import ReplyLikeButton from './ReplyLikeButton';
import More from './More';
import { axiosInstance } from '../../../../network/axiosInstance';
import dateCalcFunction from './DateCalculations';

import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';
import ReactionClassHandler from './ReactionClasses';

import PostMiddleCounters from './PostMiddleCounters';

import { useDispatch } from 'react-redux';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';
import Replys from './Replys';

const PostMiddle = ({
  data,
  writeComment,
  setWriteComment,
  userData,
  sharedPost,
  sharedPostData,
  reactions,
  reactionsMakers,
  moreID,
  fullScreenReactionClassName,
  fullScreenCommentClassName,
  fullScreenShareClassName,
  fullScreenCommentsClassName,
  fullScreenContainerClassName,
  commentTreeVerticalHiddenReplysClassName,
  commentTreeVerticalHiddenReplysShowInputClassName,
  commentTreeVerticalShowReplysClassName,
  moreFullScreenClassName,
  reactionsFullScreenClassName,
}) => {
  // Force Rerender:
  const dispatch = useDispatch();

  // Edit a Comment:
  const [editComment, setEditComment] = useState(false);

  // Edit a Reply:
  const [editReply, setEditReply] = useState(false);

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

  const reactHandler = (name, reactionsClicked = true) => {
    setReactionClicked(reactionsClicked);

    setReactType(name);

    // Handle reacion className and style in runtime (while clicking on reaction):
    ReactionClassHandler(name, setReactClass);

    // Send post reaction to DB:
    const reactBody = { reaction: name };
    let endPoint = data?.sharerId
      ? `/reaction/sharedPost/${data._id}`
      : `/reaction/post/${data._id}`;
    axiosInstance
      .post(endPoint, reactBody, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        // console.log(response);
        dispatch(forceUpdateHandler(data?.pageNum));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Post _id for regular and shared post:
  let id = data.originalPostId ? data._id : data._id;

  return (
    <Fragment>
      {sharedPost && (
        <PostMiddleCounters
          data={data}
          reactions={reactions}
          reactionsMakers={reactionsMakers}
          sharedPost={sharedPost}
          setWriteComment={setWriteComment}
          writeComment={writeComment}
          reactType={reactType}
        />
      )}

      <div
        className={
          fullScreenContainerClassName ||
          'flex justify-around border-b-2 mb-4 relative '
        }
      >
        {
          // Select a reaction on hover the LikeButton:
        }
        <PostReactions
          // className=""
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
          reactionsFullScreenClassName={
            reactionsFullScreenClassName &&
            '-mt-7 -ml-20 md:-ml-0 md:w-full lg:w-9/12'
          }
        />

        {
          // Reactions button:
        }
        <LikeButton
          reactType={reactType}
          setReactType={setReactType}
          reactionClicked={reactionClicked}
          reactClass={reactClass}
          setReactClass={setReactClass}
          setVisible={setVisible}
          setReactionClicked={setReactionClicked}
          data={data}
          userID={userData?._id}
          reactHandler={reactHandler}
          sharedPost={sharedPost}
          sharedPostData={sharedPostData}
          fullScreenReactionClassName={fullScreenReactionClassName}
        />

        {
          // Comment button:
        }
        <button
          type="button"
          className={
            fullScreenCommentClassName ||
            'btn flex hover:bg-gray-100 justify-center py-2 my-1 px-5 md:px-7 hover:lg:px-7 ml-3 md:ml-3 lg:ml-7 rounded-lg '
          }
          onClick={() => {
            setWriteComment(!writeComment);
            // console.log(data);
          }}
        >
          <FaCommentAlt className="mt-1.5 mr-2" />
          Comment
        </button>

        {
          // Share button:
        }
        <button
          type="button"
          className={
            fullScreenShareClassName ||
            'btn flex hover:bg-gray-100 justify-center py-2 my-1 px-7 md:px-9 lg:px-14 rounded-lg '
          }
          data-bs-toggle="modal"
          data-bs-target={`#sharemodal${data?._id}end`}
          onClick={() => {
            // console.log(data);
            // console.log(data?._id);
          }}
        >
          <RiShareForwardFill className="mt-0.5 mr-2 text-2xl" />
          Share
        </button>

        {
          // Share modal:
        }
        <ShareModal
          modelID={`sharemodal${data?._id}end`}
          profileSRC={userData?.profileImage}
          profileFName={userData?.firstName}
          profileLName={userData?.lastName}
          postDate={
            sharedPost
              ? data?.originalPostId?.createdAt?.slice(0, 10)
              : data?.createdAt?.slice(0, 10)
          }
          hideMore={true}
          postCreatorName={
            sharedPost
              ? `${data?.originalPostId?.userId?.firstName} ${data?.originalPostId?.userId?.lastName}`
              : `${data?.userId?.firstName} ${data?.userId?.lastName}`
          }
          postCreatorProfileSRC={
            sharedPost
              ? data?.originalPostId?.userId?.profileImage
              : data?.userId?.profileImage
          }
          postBody={sharedPost ? data?.originalPostId?.content : data?.content}
          postImage={sharedPost ? data?.originalPostId?.media : data?.media}
          reverseDirection={true}
          postId={sharedPost ? data?.originalPostId?._id : data?._id}
        />
      </div>

      {
        // Show Write a Comment input
      }
      {writeComment && (
        <div className={'relative ' + fullScreenCommentsClassName}>
          <TextArea
            placeholder="Write a comment"
            id={id}
            comment={true}
            // showMore={true}
            showProfileImage={true}
            sharedPost={sharedPost}
            userImage={userData?.profileImage}
          />

          {
            // Show Comments
          }
          {data?.comments?.map(comment => (
            <div
              className="flex flex-col my-3 mr-1 md:mr-0 relative"
              key={comment?._id}
            >
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
                        sharedCommentID={comment?._id}
                        userImage={userData?.profileImage}
                        sharedPost={sharedPost}
                        setEditComment={setEditComment}
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
                      className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit relative"
                      id={comment?.userId?._id}
                    >
                      <span className="text-sm text-zinc-700 ">
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
                          text={
                            comment?.userId?._id === userData?._id
                              ? 'Delete comment'
                              : 'Hide comment'
                          }
                          sharedPost={sharedPost}
                          deleteComment={true}
                          containerClassName="dropdown absolute -right-14 -top-8"
                          iconClassName="w-7 h-7"
                          liNum1={1}
                          // To show or hide liNum2:
                          id={comment?.userId?._id}
                          userID={userData?._id}
                          // To show edit a comment input:
                          setEditComment={setEditComment}
                          commentId={comment?._id}
                          liNum2={2}
                          text2={'Edit comment'}
                          tooltipData="more"
                          postId={id}
                          moreID={moreID}
                          // moreFullScreenClassName={moreFullScreenClassName}
                        />
                      </div>

                      {
                        // Show reactions SVGs for comments:
                        // Not tested, waiting for DB:
                      }
                      <div className="flex absolute right-0">
                        {comment?.reactions?.map(reaction => (
                          <div key={reaction._id} className="mt-1 ">
                            {reaction.reaction === 'Like' ? (
                              <img className="w-4" src={likeSVG} alt="" />
                            ) : reaction.reaction === 'Love' ? (
                              <img className="w-4" src={loveSVG} alt="" />
                            ) : reaction.reaction === 'Care' ? (
                              <img className="w-4" src={careSVG} alt="" />
                            ) : reaction.reaction === 'Haha' ? (
                              <img className="w-4" src={hahaSVG} alt="" />
                            ) : reaction.reaction === 'Wow' ? (
                              <img className="w-4" src={wowSVG} alt="" />
                            ) : reaction.reaction === 'Sad' ? (
                              <img className="w-4" src={sadSVG} alt="" />
                            ) : reaction.reaction === 'Angry' ? (
                              <img className="w-4" src={angrySVG} alt="" />
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {
                  // Show Reply to Comments and reactions buttons if no edit happens to the comment:
                }
                {!editComment && comment?._id !== editComment && (
                  <div>
                    <div className="ml-14 text-sm mt-0.5 mb-3">
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
                        reactionsFullScreenClassName={
                          reactionsFullScreenClassName
                        }
                        postId={data?._id}
                        commentId={comment?._id}
                        sharedPost={sharedPost}
                        comment={true}
                        reply={false}
                        curruntUserCommentReaction={
                          comment?.reactions?.length > 0 &&
                          (comment?.reactions?.filter(
                            reaction => reaction?.userId === userData?._id
                          ))[0]?.reaction
                        }
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

                      <span className="text-gray-500 text-xs">
                        {dateCalcFunction(comment?.commentDate)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {
                // Show Replys to Comments and hide them while editing the a comment
              }
              {comment?.reply?.length > 0 &&
                showReplyComments !== comment?._id &&
                !editComment && (
                  <Fragment>
                    <button
                      id={comment?._id}
                      className={`text-sm flex z-50 ${
                        showReplyComments === comment?._id && 'text-blue-500'
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
                          showReplyComments === comment?._id && 'text-blue-500'
                        }`}
                      />
                      {comment?.reply?.length}{' '}
                      {comment?.reply?.length === 1 ? 'reply' : 'replies'}
                    </button>

                    {
                      // reply to a comment tree ilustration and hide them while editing a comment:
                    }

                    {!editComment && (
                      <Fragment>
                        {
                          // For horizontal lines and replys are hidden:
                        }
                        <div className="relative -mt-3 md:mt-0.5 -top-4 md:-top-7 left-4 md:left-4">
                          .....
                        </div>

                        {
                          // For vertical lines and replys are hidden
                        }
                        <div
                          className={
                            commentTreeVerticalHiddenReplysClassName ||
                            'rotate-90 relative top-24 -mt-1 md:top-32 md:-mt-0 lg:top-52 -left-48 md:-left-52 lg:-left-72 md:-ml-9'
                          }
                        >
                          ...................
                        </div>

                        {
                          // For vertical lines, replys are hidden, and reply textInput is visable:
                        }
                        {writeReply === comment?._id && (
                          <Fragment>
                            <div
                              className={
                                commentTreeVerticalHiddenReplysShowInputClassName ||
                                'rotate-90 relative -mt-2 top-36 md:top-48 lg:top-64 lg:-mb-5 -left-48 md:-left-52 lg:-left-72 md:-ml-9'
                              }
                            >
                              ........................
                            </div>
                            {
                              // For horizontal lines, replys are hidden, and reply textInput is visable:
                            }
                            <div className="relative -mt-3 top-6 md:top-6 left-4 md:left-4">
                              .....
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}

              {
                // Show replies to a comment and hide it while editing a comment::
              }
              {showReplyComments === comment?._id && !editComment && (
                <div className="relative">
                  {comment?.reply?.map(reply => (
                    <div className="mb-5" key={reply?._id}>
                      {editReply && reply?._id === editReply ? (
                        <div className="relative pl-10 pb-3">
                          <TextArea
                            value={reply?.content}
                            replyId={reply?._id}
                            commentId={comment?._id}
                            postId={data?._id}
                            editReply={true}
                            showMore={false}
                            showProfileImage={true}
                            autoFocus={true}
                            userImage={userData?.profileImage}
                            // sharedCommentID={data?.comments?._id}
                            sharedPost={sharedPost}
                            setEditReply={setEditReply}
                          />
                          <button
                            onClick={() => setEditReply(false)}
                            className="text-xs absolute bottom-3 left-32"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div key={reply?._id} className="relative -mb-14">
                          <Replys
                            profileImage={reply?.userId?.profileImage}
                            name={
                              reply?.userId?.firstName +
                              ' ' +
                              reply?.userId?.lastName
                            }
                            content={reply.content}
                            date={dateCalcFunction(reply?.replyDate)}
                            reactions={reply?.reactions}
                            userID={reply?.userId?._id}
                            moreID={reply?.userId?._id}
                            replyId={reply?._id}
                            // To show edit a reply input:
                            commentId={comment?._id}
                            postId={data?._id}
                            setEditReply={setEditReply}
                            moreFullScreenClassName={moreFullScreenClassName}
                            sharedPost={sharedPost}
                            // For ReplyLikeButton:
                            reactionsFullScreenClassName={
                              reactionsFullScreenClassName
                            }
                            reactType={reactType}
                            setReactType={setReactType}
                            reactionClicked={reactionClicked}
                            reactClass={reactClass}
                            setReactClass={setReactClass}
                            setVisible={setVisible}
                            visible={visible}
                            reactHandler={reactHandler}
                            setReactionClicked={setReactionClicked}
                            replyToComment={true}
                            //For enlarging reply reactions cause they are too small:
                            containerClassName="w-72 -left-1"
                            reply={true}
                            comment={false}
                            curruntUserReplyReaction={
                              reply?.reactions?.length > 0 &&
                              (reply?.reactions?.filter(
                                reaction => reaction?.userId === userData?._id
                              ))[0]?.reaction
                            }
                          />
                        </div>
                      )}

                      {
                        // Make a line connection:
                      }
                      {!editComment && (
                        <div className="relative">
                          <div className="relative -mt-3 md:-mt-0 -top-16 md:-top-16 left-4 md:left-4">
                            .....
                          </div>

                          <div
                            className={
                              commentTreeVerticalShowReplysClassName ||
                              'rotate-90 absolute -top-16 -left-24 ml-0.5 md:-left-24 lg:-left-24 md:ml-0.5'
                            }
                          >
                            ...................................................
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {
                // Write a Reply to a comment and hide it in editing a comment:
              }
              {(writeReply === comment?._id ||
                showReplyComments === comment?._id) &&
                !editComment && (
                  <Fragment>
                    <TextArea
                      placeholder={`Reply to ${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                      id={comment?._id}
                      postId={id}
                      reply={true}
                      sharedPost={sharedPost}
                      userImage={userData?.profileImage}
                      // showMore={true}
                      replyClassName="ml-10"
                      // className="animation"
                      showProfileImage={true}
                    />

                    {
                      // continue making a line connection:
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
