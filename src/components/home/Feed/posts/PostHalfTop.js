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
  fullScreenContentClassName,
  // For edit post:
  postData,
  // For more position:
  postsProfile,

  // for edit and delete post:
  sharededitPost,
}) => {
  // console.log(postBody);
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
            {!sharedPost && userID === sharerId && (
              <More
                text={userID === sharerId ? 'Delete post' : 'Hide post'}
                text2={userID === sharerId && 'Edit post'}
                sharedPost={sharedPost}
                containerClassName="dropdown absolute right-1 top-1 "
                iconClassName={
                  hideMore === true
                    ? 'hidden'
                    : `w-9 h-9 ${
                        postsProfile && 'ml-24 md1:ml-0 lg:ml-5 2xl:ml-0'
                      }`
                }
                liNum1={1}
                liNum2={userID === sharerId ? 2 : false}
                tooltipData="more"
                sharedPostData={sharedPostData}
                moreID={moreID || postId}
                userID={userID}
                sharerId={sharerId}
                id={sharerId}
                userData={userData}
                moreFullScreenClassName={moreFullScreenClassName}
                postData={postData}
                // postId={postId}

                // for edit and delete post:
                sharededitPost={sharededitPost}
              />
            )}
          </div>
        </div>

        <p className={`mb-1 ${fullScreenContentClassName}`}>{postBody}</p>
      </div>

      {
        // To open FullScreenOriginalPost modal onClick the PostImageGrid component (images):
      }
      <button
        type="button"
        data-bs-target={'#fullScreenModal' + postId}
        data-bs-toggle="modal"
        className="w-full"
      >
        {!fullScreenContentClassName && (
          <PostImageGrid
            reverseDirection={reverseDirection}
            postImage={postImage}
            modalId={postId}
          />
        )}
      </button>
    </div>
  );
};

export default PostHalfTop;
