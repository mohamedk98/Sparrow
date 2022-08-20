import React, { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { axiosInstance } from '../../../../network/axiosInstance';
import { useDispatch } from 'react-redux';
import {
  alertHandler,
  forceUpdateHandler,
} from '../../../../store/userSlice/NewsFeedSlice';
import EditPost from './EditPost';
import { useTranslation } from 'react-i18next';

const More = ({
  text,
  text2,
  containerClassName,
  iconClassName,
  liNum1,
  liNum2,
  tooltipData,
  id,
  userID,
  setEditComment,
  setEditReply,
  deleteComment,
  commentId,
  replyId,
  postId,
  sharedPost,
  sharedPostData,
  moreID,
  sharerId,
  moreFullScreenClassName,
  // For edit post:
  postData,

  // for edit and delete post:
  sharededitPost,
}) => {
  // For translation
  const { t } = useTranslation();

  // Rerender:
  const dispatch = useDispatch();

  // Show modal for edit post:
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  // Show and hide more:
  const [showMore, setShowMore] = useState(false);

  // Show deleteComment confirmation:
  const [confirmDeleteComment, setConfirmDeleteComment] = useState(false);

  const deleteCommentHandler = () => {
    axiosInstance
      .delete(`/comment/${postId}/${commentId}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  const deleteSharedCommentHandler = () => {
    axiosInstance
      .delete(`/comment/sharedpost/${postId}/${commentId}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  const deletePostHandler = () => {
    axiosInstance
      .delete(`/posts/${moreID}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  const deleteSharedPostHandler = () => {
    axiosInstance
      .delete(`/share/${moreID}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  const deleteReplyHandler = () => {
    axiosInstance
      .delete(`/reply/post/${postId}/${commentId}/${replyId}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  const deleteSharedReplyHandler = () => {
    axiosInstance
      .delete(`/reply/sharedPost/${postId}/${commentId}/${replyId}`)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data,
            showAlert: true,
            statusCode: 200,
          })
        );
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message: error.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });
  };

  return (
    <div className={containerClassName} data-title={tooltipData}>
      <span
        className={
          'dropdown-toggle flex items-center hidden-arrow cursor-pointer'
        }
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <BiDotsHorizontalRounded
          className={
            'hover:bg-zinc-100 rounded-full p-1 z-50 dark:hover:bg-zinc-500 dark:text-white dark:hover:text-zinc-800  ' +
            iconClassName
          }
        />
      </span>

      {
        <div className={showMore ? 'block' : 'hidden'}>
          <ul
            className={`dropdown-menu min-w-max absolute dark:bg-zinc-800 transition duration-150 dark:text-white bg-white text-base z-50 py-2 px-3 rounded-lg shadow-lg mt-1 m-0 left-auto right-auto ${moreFullScreenClassName}`}
          >
            {
              // For Text Number 1:
            }
            {liNum1 && !confirmDeleteComment && (
              <li
                className="dropdown-item text-sm py-2 px-4 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  (text?.slice(0, 6) === 'Delete' ||
                    text?.slice(0, 3) === 'مسح') &&
                    setConfirmDeleteComment(true);
                }}
              >
                {text}
              </li>
            )}

            {
              // For Text Number 2:
            }
            {liNum2 && id === userID && !confirmDeleteComment && (
              <li
                className="dropdown-item text-sm py-2 px-4 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  // To show edit a comment input:
                  if (setEditComment) {
                    setEditComment(commentId);
                  }

                  // To show edit a reply input:
                  if (setEditReply) {
                    setEditReply(replyId);
                  }

                  if (text2 === `${t('Edit post')}`) {
                    setShowEditPostModal(true);
                    // setShowMore(!showMore);
                  }
                }}
              >
                {text2}
              </li>
            )}

            {
              // Show EditPostModal
            }
            {showEditPostModal && (
              <EditPost
                showModal={showEditPostModal}
                setShowModal={setShowEditPostModal}
                setShowMore={setShowMore}
                sharedPostData={sharedPostData}
                postData={postData}
              />
            )}

            {
              // For Delete confirmation:
            }
            {confirmDeleteComment && (
              <div className=" bg-white max-w-sm p-0.5">
                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2 ml-1">
                  {t('Confirm deletion')}
                </h5>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className=" inline-block px-1 mr-0.5 py-1 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow- hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                      if (
                        deleteComment &&
                        text === `${t('Delete_comment')}` &&
                        !sharedPost
                      ) {
                        deleteCommentHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }

                      if (
                        deleteComment &&
                        text === `${t('Delete_comment')}` &&
                        sharedPost
                      ) {
                        deleteSharedCommentHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }

                      if (text === `${t('delete_post')}` && !sharededitPost) {
                        deletePostHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }

                      if (text === `${t('delete_post')}` && sharededitPost) {
                        deleteSharedPostHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }

                      if (text === `${t('Delete_reply')}` && !sharedPost) {
                        deleteReplyHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }

                      if (text === `${t('Delete_reply')}` && sharedPost) {
                        deleteSharedReplyHandler();
                        setConfirmDeleteComment(false);
                        setShowMore(!showMore);
                      }
                      dispatch(forceUpdateHandler(8000000000));
                    }}
                  >
                    <MdDelete className="text-xl mx-3.5 " />
                  </button>

                  <button
                    type="button"
                    className=" inline-block px-1 py-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                      setConfirmDeleteComment(false);
                    }}
                  >
                    <MdCancel className="text-xl mx-3.5" />
                  </button>
                </div>
              </div>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default More;
