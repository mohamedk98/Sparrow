import React from 'react';
import More from './More';
import PostImageGrid from './PostImageGrid';

const PostHalfTop = ({
  profileSRC,
  profileName,
  postDate,
  hideMore,
  postBody,
  postImage,
  reverseDirection,
  sharerId,
  userID,
  sharedPost,
  sharedPostData,
  userData,
  postId,
  moreID,
  shareClassName,
  // For fullScreenModal:
  dateClassName,
  moreFullScreenClassName,
}) => {
  // console.log(moreID);
  // console.log(userId);
  // console.log(sharedPost);
  // console.log(sharedPostData?._id);
  // console.log(fullPost);
  // console.log(postImage);

  return (
    <div
      className={`${
        reverseDirection && 'flex flex-col-reverse'
      } ${shareClassName}`}
    >
      <div className={`card-body relative ${reverseDirection && 'px-3'}`}>
        <div className="flex mb-3">
          {!sharedPost && !reverseDirection && (
            <img
              src={profileSRC}
              className="rounded-full mr-2 h-10 w-10"
              alt="Avatar"
            />
          )}

          <div>
            <strong>{profileName}</strong>

            <span className={'text-gray-600 text-sm block ' + dateClassName}>
              {postDate}
            </span>
            {!sharedPost && (
              <More
                text={userID === sharerId ? 'Delete post' : 'Hide post'}
                text2={userID === sharerId && 'Edit post'}
                sharedPost={sharedPost}
                containerClassName="dropdown absolute right-1 top-1 "
                iconClassName={hideMore === true ? 'hidden' : 'w-9 h-9'}
                liNum1={1}
                liNum2={userID === sharerId ? 2 : false}
                tooltipData="more"
                sharedPostData={sharedPostData}
                // postId={postId}
                moreID={moreID || postId}
                userID={userID}
                sharerId={sharerId}
                userData={userData}
                moreFullScreenClassName={moreFullScreenClassName}
              />
            )}
          </div>
        </div>

        <p className="mb-5">{postBody}</p>
      </div>

      {
        // To open FullScreenOriginalPost modal onClick the PostImageGrid component (images):
      }
      <button
        data-bs-target={'#fullScreenModal' + postId}
        data-bs-toggle="modal"
      >
        <PostImageGrid
          reverseDirection={reverseDirection}
          postImage={postImage}
          modalId={postId}
        />
      </button>
    </div>
  );
};

export default PostHalfTop;
