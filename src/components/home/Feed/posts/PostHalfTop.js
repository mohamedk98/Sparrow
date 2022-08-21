import React from 'react';
import More from './More';
import PostImageGrid from './PostImageGrid';
import { ImEarth } from 'react-icons/im';
import { ImLock } from 'react-icons/im';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  let visiability = sharededitPost
    ? sharedPostData?.visiability
    : postData?.visiability;

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
            <strong className="dark:text-white">{profileName}</strong>

            <div className="flex">
              <span
                className={
                  'text-gray-600 text-sm block dark:text-white ' + dateClassName
                }
              >
                {postDate}
              </span>
              {visiability && (
                <span data-title={visiability}>
                  {visiability?.toLowerCase() === 'public' ? (
                    <ImEarth className="text-gray-600 dark:text-white ml-2 mt-1 text-sm" />
                  ) : visiability?.toLowerCase() === 'private' ? (
                    <ImLock className="text-gray-600 dark:text-white ml-2 mt-1 text-sm" />
                  ) : (
                    ''
                  )}
                </span>
              )}
            </div>
            {!sharedPost && userID === sharerId && (
              <span className="absolute top-0 right-0 z-40">
                <More
                  text={
                    userID === sharerId
                      ? `${t('delete_post')}`
                      : `${t('hide_post')}`
                  }
                  text2={userID === sharerId && `${t('Edit post')}`}
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
                  // for edit and delete post:
                  sharededitPost={sharededitPost}
                />
              </span>
            )}
          </div>
        </div>

        <p className={`mb-1 break-all ${fullScreenContentClassName}`}>
          {postBody}
        </p>
      </div>

      {
        // To open FullScreenOriginalPost modal onClick the PostImageGrid component (images):
      }
      <span
        type="button"
        data-bs-target={'#fullScreenModal' + postId}
        data-bs-toggle="modal"
        className="w-full cursor-pointer"
      >
        {!fullScreenContentClassName && (
          <PostImageGrid
            reverseDirection={reverseDirection}
            postImage={postImage}
            modalId={postId}
          />
        )}
      </span>
    </div>
  );
};

export default PostHalfTop;
