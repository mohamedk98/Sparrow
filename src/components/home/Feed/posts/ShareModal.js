import React, { Fragment } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';

import './../Tooltip.module.css';
import PostHalfTop from './PostHalfTop';
import TextArea from './TextArea';

import { useDispatch } from 'react-redux';
import {
  forceUpdateHandler,
  alertHandler,
} from '../../../../store/userSlice/NewsFeedSlice';

import { useTranslation } from 'react-i18next';

const ShareModal = ({
  // modelID,
  profileSRC,
  profileFName,
  profileLName,
  postDate,
  hideMore,
  postBody,
  postImage,
  reverseDirection,
  postId,
  postCreatorName,
  postCreatorProfileSRC,

  // Show modal:
  showModal,
  setShowModal,
}) => {
  const { t } = useTranslation();

  // Force rerender:
  const dispatch = useDispatch();

  // To get the value of textArea field:
  const [emptyTextArea, setEmptyTextArea] = useState(false);

  let caption = '';
  let getInputTextValueHandler = text => {
    caption = text;
  };

  const shareHandler = () => {
    axiosInstance
      .post(`/share/${postId}`, { caption: caption })
      .then(response => {
        dispatch(forceUpdateHandler(90000000000));

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
    <Fragment>
      {showModal && (
        <div className="fixed top-0 left-0 sm:-mt-3.5 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-70">
          <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto dark:bg-zinc-800 transition duration-700 bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-bold leading-normal text-black">
                  {t('share_post')}
                </h5>

                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  onClick={() => {
                    setEmptyTextArea(true);
                    setShowModal(!showModal);
                  }}
                ></button>
              </div>

              <div className="modal-body container space-x-2 p-4">
                <div className="flex w-full">
                  <img
                    src={profileSRC}
                    alt="profile-imag"
                    className="rounded-full mr-2 h-10 w-10"
                    width={40}
                    height={40}
                    layout="fixed"
                  />

                  <p className="font-bold text-sm ml-3 mt-2.5">
                    {`${profileFName} ${profileLName}`}
                  </p>
                </div>
                <div className="grid grid-cols-1 w-12/13">
                  <div className="flex flex-wrap">
                    <TextArea
                      rows="3"
                      cols="35"
                      className=" dark:bg-zinc-800 transition duration-700 dark:text-white px-4 py-3 w-full scrollbar-hide resize-none h-auto focus:outline-none"
                      placeholder={`${t(
                        'input_placeholder'
                      )} ${profileFName} ${t('input_questionMark')}`}
                      getInputTextValueHandler={getInputTextValueHandler}
                      setEmptyTextArea={setEmptyTextArea}
                      emptyTextArea={emptyTextArea}
                      shareAPost={true}
                      // Translation:
                      dir="ltr"
                      // Translation
                      idTranslate="textarea"
                    />
                  </div>

                  {postCreatorName && (
                    <PostHalfTop
                      profileSRC={postCreatorProfileSRC}
                      profileName={postCreatorName}
                      postDate={postDate}
                      hideMore={hideMore}
                      postBody={postBody}
                      postImage={postImage}
                      reverseDirection={reverseDirection}
                      shareClassName="border-2 rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="inline-block px-6 w-full py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-0.5"
                  onClick={() => {
                    shareHandler();
                    setEmptyTextArea(true);
                    setShowModal(!showModal);
                  }}
                >
                  {t('share')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="opacity-75 fixed inset-0 z-60 bg-black"></div>
    </Fragment>
  );
};

export default ShareModal;
