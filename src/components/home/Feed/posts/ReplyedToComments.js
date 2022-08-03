import React from 'react';
import Replys from './Replys';

import dateCalcFunction from './DateCalculations';

const ReplyedToComments = ({
  ReplyLikeButton,
  reply,
  commentId,
  postId,
  editReply,
  setEditReply,
  // moreID,
  moreFullScreenClassName,
}) => {
  console.log(reply);
  console.log(postId);
  return (
    <div key={reply?._id} className="relative -mb-14">
      <Replys
        profileImage={reply?.userId?.profileImage}
        name={reply?.userId?.firstName + ' ' + reply?.userId?.lastName}
        content={reply.content}
        date={dateCalcFunction(reply?.replyDate)}
        ReplyLikeButton={ReplyLikeButton}
        reactions={reply?.reactions}
        userID={reply?.userId?._id}
        postId={postId}
        moreID={reply?.userId?._id}
        replyId={reply?._id}
        commentId={commentId}
        setEditReply={setEditReply}
        moreFullScreenClassName={moreFullScreenClassName}
      />
    </div>
  );
};

export default ReplyedToComments;
