import React from 'react';
import More from './More';

import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';
import ReplyLikeButton from './ReplyLikeButton';

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
          // Name and content for replyd user:
        }
        <div className="px-3 py-3 bg-gray-100 rounded-3xl outline-none w-fit ">
          <span className="text-sm text-zinc-700">{name}</span>
          <span className="block max-w-xs md:max-w-sm break-words max-h-10 overflow-auto">
            {content}
          </span>
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

        {
          <div className="flex absolute top-14 right-0">
            {reactions.map(reaction => (
              <div key={reaction?._id} className="mt-1">
                {reaction.reaction === 'Like' ? (
                  <img className="w-4" src={likeSVG} alt="likeSVG" />
                ) : reaction.reaction === 'Love' ? (
                  <img className="w-4" src={loveSVG} alt="loveSVG" />
                ) : reaction.reaction === 'Care' ? (
                  <img className="w-4" src={careSVG} alt="careSVG" />
                ) : reaction.reaction === 'Haha' ? (
                  <img className="w-4" src={hahaSVG} alt="hahaSVG" />
                ) : reaction.reaction === 'Wow' ? (
                  <img className="w-4" src={wowSVG} alt="wowSVG" />
                ) : reaction.reaction === 'Sad' ? (
                  <img className="w-4" src={sadSVG} alt="sadSVG" />
                ) : reaction.reaction === 'Angry' ? (
                  <img className="w-4" src={angrySVG} alt="angrySVG" />
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Replys;
