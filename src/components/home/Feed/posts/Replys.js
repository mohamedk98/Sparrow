import React from 'react';
import More from './More';

import ReplyLikeButton from './ReplyLikeButton';
import PostMiddleCounters from './PostMiddleCounters';

const Replys = ({
  profileImage,
  name,
  content,
  date,
  reactions,
  userID,
  postId,
  moreID,
  replyId,
  setEditReply,
  commentId,
  moreFullScreenClassName,
  sharedPost,

  // For ReplyLikeButton:
  reactionsFullScreenClassName,
  reactType,
  setReactType,
  reactionClicked,
  reactClass,
  setReactClass,
  setVisible,
  visible,
  reactHandler,
  setReactionClicked,

  curruntUserReplyReaction,
}) => {
  // console.log(reactions);
  return (
    <div className="flex my-3 ml-10">
      {
        // Profile image for replyd user:
      }
      <a href="/">
        <img
          src={profileImage}
          className="rounded-full mr-2 w-8 h-8"
          alt="Avatar"
        />
      </a>

      <div className="max-w-md relative">
        {
          // Name, content, and reactions for replyd user:
        }
        <div className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit relative">
          <span className="text-sm text-zinc-700">{name}</span>
          <span className="block max-w-xs md:max-w-sm break-words max-h-10 overflow-auto">
            {content}
          </span>

          {
            <span className="absolute -right-3 top-20 -mt-1.5 z-10">
              <PostMiddleCounters
                reactions={reactions?.map(reaction => reaction?.reaction)}
                reactionsMakers={reactions}
                sharedPost={sharedPost}
                reply={true}
                data={{ reactions: reactions }}
              />
            </span>
          }
        </div>

        <div className="ml-6 text-sm mt-0.5 mb-3">
          <ReplyLikeButton
            reactionsFullScreenClassName={reactionsFullScreenClassName}
            reactType={reactType}
            setReactType={setReactType}
            reactionClicked={reactionClicked}
            reactClass={reactClass}
            setReactClass={setReactClass}
            setVisible={setVisible}
            visible={visible}
            reactHandler={reactHandler}
            setReactionClicked={setReactionClicked}
            postId={postId}
            moreID={moreID}
            replyToComment={true}
            //For enlarging reply reactions cause they are too small:
            containerClassName="w-72 -left-1"
            moreFullScreenClassName={moreFullScreenClassName}
            replyId={replyId}
            commentId={commentId}
            reply={true}
            comment={false}
            sharedPost={sharedPost}
            curruntUserReplyReaction={curruntUserReplyReaction}
          />

          <span className="text-gray-500 ml-3 text-xs">{date}</span>
        </div>

        {userID === moreID && (
          <More
            text={userID === moreID ? 'Delete reply' : 'Hide reply'}
            text2={userID === moreID && 'Edit reply'}
            containerClassName="dropdown absolute left-40 -top-2 mt-4"
            iconClassName="w-7 h-7 relative "
            liNum1={1}
            liNum2={userID === moreID ? 2 : false}
            tooltipData="more"
            postId={postId}
            id={moreID}
            userID={userID}
            replyId={replyId}
            commentId={commentId}
            setEditReply={setEditReply}
            moreFullScreenClassName={moreFullScreenClassName}
            sharedPost={sharedPost}
          />
        )}
      </div>
    </div>
  );
};

export default Replys;
