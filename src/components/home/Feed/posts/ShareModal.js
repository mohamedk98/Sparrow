import React, { Fragment } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';
import profileImg from './../../../../assets/images/default_profile.png';

import './../Tooltip.module.css';
import PostHalfTop from './PostHalfTop';
import TextArea from './TextArea';

const ShareModal = ({
  modelID,
  profileSRC,
  profileName,
  postDate,
  hideMore,
  postBody,
  postImage,
  reverseDirection,
  id,
}) => {
  const shareHandler = () => {
    axiosInstance
      .post(`/share/${id}`)
      .then(response => {
        console.log(id);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id={modelID}
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-bold leading-normal text-black"
                id="exampleModalScrollableLabel"
              >
                Create post
              </h5>

              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body container space-x-2 p-4">
              <div className="grid grid-cols-10 w-full">
                <img
                  src={profileImg}
                  alt="profile-imag"
                  className="rounded-full"
                  width={40}
                  height={40}
                  layout="fixed"
                />

                <p className="font-bold text-sm ml-3">UserName</p>
              </div>
              <div className="grid grid-cols-1 w-12/13">
                <div className="flex flex-wrap">
                  <TextArea
                    rows="3"
                    cols="35"
                    className=" px-4 py-3 w-full scrollbar-hide resize-none h-auto focus:outline-none"
                    placeholder="What's on your mind, UserName?"
                  />
                </div>

                {profileName && (
                  <PostHalfTop
                    profileSRC={profileSRC}
                    profileName={profileName}
                    postDate={postDate}
                    hideMore={hideMore}
                    postBody={postBody}
                    postImage={postImage}
                    reverseDirection={reverseDirection}
                  />
                )}
              </div>
            </div>

            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 w-full py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={() => {
                  shareHandler();
                }}
                data-bs-toggle="modal"
                data-bs-target="#ModalCenter"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShareModal;