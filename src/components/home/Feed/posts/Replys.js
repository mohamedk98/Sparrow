import React, { Fragment } from 'react';
import More from './More';

import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';

const Replys = ({
  ReplyLikeButton,
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
}) => {
  console.log(moreID, userID);
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
          <span className="block">{content}</span>
        </div>

        <div className="ml-6 text-sm mt-0.5 mb-3">
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
          // moreID={postId}
          replyId={replyId}
          commentId={commentId}
          setEditReply={setEditReply}
        />

        {
          // <div className="flex">
          //   reactions.map(reaction => (
          //   <div key={reaction?._id} className="mt-1">
          //     {reaction.reaction === 'Like' ? (
          //       <img className="w-4" src={likeSVG} alt="" />
          //     ) : reaction.reaction === 'Love' ? (
          //       <img className="w-4" src={loveSVG} alt="" />
          //     ) : reaction.reaction === 'Care' ? (
          //       <img className="w-4" src={careSVG} alt="" />
          //     ) : reaction.reaction === 'Haha' ? (
          //       <img className="w-4" src={hahaSVG} alt="" />
          //     ) : reaction.reaction === 'Wow' ? (
          //       <img className="w-4" src={wowSVG} alt="" />
          //     ) : reaction.reaction === 'Sad' ? (
          //       <img className="w-4" src={sadSVG} alt="" />
          //     ) : reaction.reaction === 'Angry' ? (
          //       <img className="w-4" src={angrySVG} alt="" />
          //     ) : (
          //       ''
          //     )}
          //   </div>
          //   ))
          // </div>
        }
      </div>
    </div>
  );
};

export default Replys;
