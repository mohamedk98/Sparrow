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

import ReactionClassHandler from './ReactionClasses';

import PostMiddleCounters from './PostMiddleCounters';

import { useDispatch } from 'react-redux';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';
import Replys from './Replys';
import { useTranslation } from 'react-i18next';

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
  // For full screen:
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
  // For the middle three buttons position:
  postsProfile,
}) => {
  const { t } = useTranslation();
  // Open share modal:
  const [showModal, setShowModal] = useState(false);

  // Force Rerender:
  const dispatch = useDispatch();

  // For tree styling:
  const [hover, setHover] = useState(false);

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
    ReactionClassHandler(name, setReactClass, t);

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
        dispatch(forceUpdateHandler(data?.pageNum));
      })
      .catch(error => {});
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
          // For the heart reaction size and position:
          postsProfile={postsProfile}
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
          // For like button position in profile page:
          postsProfile={postsProfile}
        />

        {
          // Comment button:
        }
        <button
          type="button"
          className={
            fullScreenCommentClassName ||
            `btn flex hover:bg-gray-100 justify-center dark:hover:text-zinc-800 py-2 my-1 px-5 ${
              postsProfile ? 'lg:px-3 hover:lg:px-3' : 'hover:lg:px-7 lg:ml-7'
            } md:px-7 ml-3 md:ml-3  rounded-lg `
          }
          onClick={() => {
            setWriteComment(!writeComment);
          }}
        >
          <FaCommentAlt className="mt-1.5 mr-2" />
          {t('commentbtn')}
        </button>

        {
          // Share button:
        }
        <button
          type="button"
          className={
            fullScreenShareClassName ||
            `btn flex hover:bg-gray-100 dark:hover:text-zinc-800 justify-center py-2 my-1 px-7 md:px-9 ${
              postsProfile && 'lg:px-5 hover:lg:px-5 hover:lg:mx-9'
            } lg:px-14 rounded-lg `
          }
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <RiShareForwardFill className="mt-0.5 mr-2 text-2xl" />
          {t('sharebtn')}
        </button>

        {
          // Share modal:
        }
        {showModal && (
          <ShareModal
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
            postBody={
              sharedPost ? data?.originalPostId?.content : data?.content
            }
            postImage={sharedPost ? data?.originalPostId?.media : data?.media}
            reverseDirection={true}
            postId={sharedPost ? data?.originalPostId?._id : data?._id}
            // Open share modal:
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>

      {
        // Show Write a Comment input
      }
      {writeComment && (
        <div className={'relative ' + fullScreenCommentsClassName}>
          <TextArea
            id={id}
            placeholder={t('Write a comment')}
            comment={true}
            showProfileImage={true}
            sharedPost={sharedPost}
            userImage={userData?.profileImage}
            // Translation
            dir="ltr"
            idtranslate="textarea"
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
                        showProfileImage={false}
                        autoFocus={true}
                        sharedCommentID={comment?._id}
                        userImage={userData?.profileImage}
                        sharedPost={sharedPost}
                        setEditComment={setEditComment}
                        // Translation
                        dir="ltr"
                        idtranslate="textarea"
                      />

                      <button
                        onClick={() => setEditComment(false)}
                        className="text-xs absolute bottom-0 left-12 ml-1"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit relative dark:bg-zinc-500 dark:text-white  ${
                        postsProfile &&
                        'max-w-[21rem] sm:max-w-full lg:max-w-[21rem] lg2:w-full'
                      }`}
                      id={comment?.userId?._id}
                    >
                      {
                        // Show more options to comments
                      }
                      {comment?.userId?._id === userData?._id && (
                        <span
                          className={`absolute top-7 ${
                            postsProfile && 'mr-3.5 sm:mr-0 lg:mr-3'
                          } right-3 z-50`}
                        >
                          <More
                            text={
                              comment?.userId?._id === userData?._id
                                ? `${t('Delete_comment')}`
                                : `${t('hide_comment')}`
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
                            text2={t('Edit_comment')}
                            tooltipData="more"
                            postId={id}
                            moreID={moreID}
                            moreFullScreenClassName={moreFullScreenClassName}
                          />
                        </span>
                      )}

                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {comment?.userId?.firstName +
                          ' ' +
                          comment?.userId?.lastName}
                      </span>
                      <div
                        className="max-w-xs md:max-w-sm break-words relative"
                        id={comment?._id}
                      >
                        <span
                          className={`block dark:text-gray-300 max-w-xs md:max-w-sm break-words max-h-16 overflow-auto`}
                        >
                          {comment.content}
                        </span>
                      </div>

                      {
                        // Show reactions SVGs for comments:
                      }
                      {
                        <span className="absolute -right-3 -bottom-5 -mt-1.5 dark:text-zinc-800 z-10">
                          <PostMiddleCounters
                            reactions={comment?.reactions?.map(
                              reaction => reaction?.reaction
                            )}
                            data={comment}
                            reactionsMakers={comment?.reactions}
                            sharedPost={sharedPost}
                            reply={true}
                          />
                        </span>
                      }
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
                            reaction => reaction?.userId?._id === userData?._id
                          ))[0]?.reaction
                        }
                        // For the heart reaction size and position:
                        postsProfile={postsProfile}
                      />

                      <button
                        type="button"
                        className="btn mx-3 hover:underline underline-offset-2"
                        id={comment?._id}
                        onClick={e => {
                          if (comment?._id === e.target.id) {
                            setWriteReply(e.target.id);
                            setHover(e.target.id);
                          }
                        }}
                      >
                        {t('reply')}
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
                  <div className="relative">
                    <button
                      id={comment?._id}
                      className={`text-sm flex hover:text-blue-500 ${
                        showReplyComments === comment?._id && 'text-blue-500'
                      } z-20 
                      `}
                      onClick={() => {
                        if (comment?.reply?.length > 0) {
                          setShowReplyComments(comment?._id);
                        }

                        setHover(comment?._id);
                      }}
                      onMouseEnter={() => setHover(comment?._id)}
                      onMouseLeave={() => setHover(false)}
                    >
                      <BiShare
                        className={`rotate-180 ml-12 mr-1 mt-0.5 z-10 ${
                          showReplyComments === comment?._id && 'text-blue-500 '
                        }`}
                      />
                      {comment?.reply?.length}{' '}
                      {comment?.reply?.length === 1
                        ? `${t('reply')}`
                        : `${t('replies')}`}
                    </button>

                    {
                      // reply to a comment tree ilustration and hide them while editing a comment:
                    }

                    {!editComment && (
                      <Fragment>
                        {
                          // For horizontal lines and replys are hidden:
                        }
                        <div
                          className={`relative -mt-3 md:mt-0.5 -top-4 md:-top-7 left-4 md:left-4 z-0 w-3 ${
                            hover === comment?._id && 'text-blue-500'
                          }`}
                        >
                          .....
                        </div>

                        {
                          // For vertical lines and replys are hidden
                        }
                        <div
                          className={
                            `${hover === comment?._id && 'text-blue-500'} ` +
                            (commentTreeVerticalHiddenReplysClassName ||
                              `rotate-90 absolute -top-11 -mt-0.5 md:top-3 md:-mt-14 lg:top-3 -left-5 -ml-0.5 md:left-3.5 lg:left-3.5 md:-ml-9 `)
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
                                `${
                                  hover === comment?._id && 'text-blue-500'
                                } ` +
                                (commentTreeVerticalHiddenReplysShowInputClassName ||
                                  `rotate-90 absolute -mt- -top-1 md:top-2 lg:top-3 lg:-mb-5 -left-8 -ml-0.5 md:left-0.5 lg:left-0.5 md:-ml-9 `)
                              }
                            >
                              ........................
                            </div>
                            {
                              // For horizontal lines, replys are hidden, and reply textInput is visable:
                            }
                            <div
                              className={`relative -mt-3 top-6 md:top-6 left-4 md:left-4 ${
                                hover === comment?._id && 'text-blue-500'
                              }`}
                            >
                              .....
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
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
                            sharedPost={sharedPost}
                            setEditReply={setEditReply}
                            // Translation
                            dir="ltr"
                            idtranslate="textarea"
                          />
                          <button
                            onClick={() => setEditReply(false)}
                            className="text-xs absolute bottom-3 left-32"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      ) : (
                        <div key={reply?._id} className="relative -mb-14 ">
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
                            userID={userData._id}
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
                                reaction =>
                                  reaction?.userId?._id === userData?._id
                              ))[0]?.reaction
                            }
                            // For max-w for replys:
                            postsProfile={postsProfile}
                          />
                        </div>
                      )}

                      {
                        // Make a line connection:
                      }
                      {!editComment && (
                        <div className="relative">
                          <div
                            className={`relative -mt-3 md:-mt-0 -top-16 md:-top-16 left-4 md:left-4 ${
                              hover === comment?._id && 'text-blue-500'
                            }`}
                          >
                            .....
                          </div>

                          <div
                            className={
                              `${hover === comment?._id && 'text-blue-500'} ` +
                              (commentTreeVerticalShowReplysClassName ||
                                `rotate-90 absolute -top-16 -left-24 ml-0.5 md:-left-24 lg:-left-24 md:ml-0.5`)
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
                      placeholder={`${t('Reply to')} ${
                        comment?.userId?.firstName
                      } ${comment?.userId?.lastName}`}
                      id={comment?._id}
                      postId={id}
                      reply={true}
                      sharedPost={sharedPost}
                      userImage={userData?.profileImage}
                      replyClassName="ml-10"
                      showProfileImage={true}
                      // Translation
                      dir="ltr"
                      idtranslate="textarea"
                      // Tree styling:
                      setHover={setHover}
                    />

                    {
                      // continue making a line connection:
                    }
                    {showReplyComments === comment?._id && (
                      <div
                        className={`relative -top-12 md:-top-11 left-4 md:left-5 md:-mt-2 md:-ml-1 ${
                          hover === comment?._id && 'text-blue-500'
                        }`}
                      >
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
