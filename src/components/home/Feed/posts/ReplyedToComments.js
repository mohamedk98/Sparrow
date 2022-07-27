import React from 'react';
import Replys from './Replys';

const ReplyedToComments = ({ ReplyLikeButton, reply, comment }) => {
  return (
    <div key={reply?._id} className="relative -mb-14">
      <Replys
        profileImage={comment.userId.profileImage}
        name={reply?.userId?.firstName + ' ' + reply?.userId?.lastName}
        content={reply.content}
        date={reply.replyDate.slice(0, 10)}
        ReplyLikeButton={ReplyLikeButton}
      />
    </div>
  );
};

export default ReplyedToComments;
