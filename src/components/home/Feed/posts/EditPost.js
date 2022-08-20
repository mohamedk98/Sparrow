import React, { Fragment } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';

import './../Tooltip.module.css';
import PostHalfTop from './PostHalfTop';
import TextArea from './TextArea';

import { useDispatch } from 'react-redux';
import {
  alertHandler,
  forceUpdateHandler,
} from '../../../../store/userSlice/NewsFeedSlice';
import dateCalcFunction from './DateCalculations';
import PostImageGrid from './PostImageGrid';

import UploadPhoto from '../UploadPhoto';
import IsLoadingScreen from '../IsLoadingScreen';
import { IoMdPhotos } from 'react-icons/io';
import { t } from 'i18next';

const EditPost = ({
  showModal,
  setShowModal,
  setShowMore,
  sharedPostData,
  postData,
}) => {
  let sharedPost;
  sharedPostData ? (sharedPost = true) : (sharedPost = false);

  let profileSRC;
  sharedPostData
    ? (profileSRC = sharedPostData?.sharerId?.profileImage)
    : (profileSRC = postData?.userId?.profileImage);

  let profileFName;
  sharedPostData
    ? (profileFName = sharedPostData?.sharerId?.firstName)
    : (profileFName = postData?.userId?.firstName);

  let profileLName;
  sharedPostData
    ? (profileLName = sharedPostData?.sharerId?.lastName)
    : (profileLName = postData?.userId?.lastName);

  let textValue;
  sharedPostData
    ? (textValue = sharedPostData?.caption)
    : (textValue = postData?.content);

  let postID;
  sharedPostData ? (postID = sharedPostData?._id) : (postID = postData?._id);

  let visiability;
  sharedPostData
    ? (visiability = sharedPostData?.visiability)
    : (visiability = postData?.visiability);

  // Force rerender:
  const dispatch = useDispatch();

  // To get the value of textArea field:
  let caption = '';
  let getInputTextValueHandler = text => {
    caption = text;
  };

  //   For visiability update:
  const [selectedOption, setSelectedOption] = useState(visiability);

  //   For media updates:
  const [removeMedia, setRemoveMedia] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showUploadPic, setShowUploadPic] = useState(false);
  const [loading, setLoading] = useState(false);

  const editPostHandler = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append(
      'visiability',
      selectedOption ? selectedOption : postData?.visiability
    );
    formData.append(
      'content',
      caption.length > 0 ? caption : postData?.content
    );
    selectedImages?.forEach(image => {
      formData.append('media', image);
    });

    axiosInstance
      .patch(`/posts/${postID}`, formData)
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data || 'Saved successfully',
            showAlert: true,
            statusCode: 200,
          })
        );

        setShowModal(false);
        setShowMore(false);
        setLoading(false);

        setTimeout(() => {
          dispatch(forceUpdateHandler(50000));
        }, 3000);
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message:
              error.data || 'Something went wrong please, try again later',
            showAlert: true,
            statusCode: 400,
          })
        );

        setShowModal(false);
        setShowMore(false);
        setLoading(false);
      });
  };

  const editSharedPostHandler = () => {
    setLoading(true);
    axiosInstance
      .patch(`/share/${postID}`, {
        caption:
          caption.length > 0
            ? caption
            : sharedPostData?.originalPostId?.content,
        visiability: selectedOption
          ? selectedOption
          : sharedPostData?.visiability,
      })
      .then(response => {
        // Alert message:
        dispatch(
          alertHandler({
            message: response.data || 'Saved successfully',
            showAlert: true,
            statusCode: 200,
          })
        );

        setShowModal(false);
        setShowMore(false);
        setLoading(false);

        setTimeout(() => {
          dispatch(forceUpdateHandler(4000));
        }, 3000);
      })
      .catch(error => {
        // Alert message:
        dispatch(
          alertHandler({
            message:
              error.data || 'Something went wrong please, try again later',
            showAlert: true,
            statusCode: 400,
          })
        );

        setShowModal(false);
        setShowMore(false);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      {showModal && (
        <div className=" fixed top-0 left-0 z-70 w-full h-full mt-9 outline-none overflow-x-hidden overflow-y-auto">
          <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            {/*content*/}

            {loading ? (
              <IsLoadingScreen updatePost={true} />
            ) : (
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                {/*header*/}
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-bold leading-normal text-black">
                    {t('edit_post')}
                  </h5>
                  <button
                    className="btn-close box-content w-4 h-4 p-1 text-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    onClick={() => {
                      setShowModal(false);
                      setShowMore(false);
                    }}
                  ></button>
                </div>
                {/*body*/}
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
                  <div className="relative left-12">
                    <select
                      name="visability"
                      onChange={e => {
                        setSelectedOption(e.target.value);
                      }}
                      value={selectedOption}
                      className="px-2 py-1 bg-facebook-grey text-black font-medium text-xs leading-tight rounded shadow-2xl hover:bg-facebook-grey hover:shadow-inner focus:bg-facebook-grey focus:shadow-lg focus:outline-none focus:ring-0 active:bg-facebook-grey active:shadow-lg active:text-black flex items-center whitespace-nowrap cursor-pointer"
                      type="button"
                    >
                      <option
                        value="Public"
                        className="text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        &#127759; {t('public')}
                      </option>
                      <option
                        value="Private"
                        className="text-xs py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        &#128274; {t('private')}
                      </option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 w-12/13">
                    <div className="flex flex-wrap">
                      <TextArea
                        rows="3"
                        cols="35"
                        className=" px-4 py-3 w-full scrollbar-hide resize-none h-auto focus:outline-none"
                        value={textValue}
                        getInputTextValueHandler={getInputTextValueHandler}
                        editPost={true}
                        // Translation:
                        dir="ltr"
                        // Translation
                        idtranslate="textarea"
                      />
                    </div>

                    {sharedPostData ? (
                      <PostHalfTop
                        profileSRC={profileSRC}
                        profileName={profileFName + ' ' + profileLName}
                        postDate={
                          sharedPostData &&
                          dateCalcFunction(sharedPostData?.createdAt)
                        }
                        hideMore={true}
                        postBody={
                          sharedPostData &&
                          sharedPostData?.originalPostId?.content
                        }
                        postImage={
                          sharedPostData &&
                          sharedPostData?.originalPostId?.media
                        }
                        reverseDirection={true}
                        shareClassName="border-2 rounded-lg"
                      />
                    ) : (
                      <div className="relative">
                        {!removeMedia && postData?.media?.length > 0 ? (
                          <Fragment>
                            <button
                              className="btn-close box-content w-4 h-4 p-1 text-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline absolute right-0 bg-slate-50"
                              onClick={() => {
                                setRemoveMedia(true);
                                setShowUploadPic(!showUploadPic);
                              }}
                            ></button>
                            <PostImageGrid
                              postImage={postData?.media}
                              modalId={postID}
                            />
                          </Fragment>
                        ) : (!removeMedia && postData?.media?.length === 0) ||
                          !showUploadPic ? (
                          <Fragment>
                            <IoMdPhotos
                              className="cursor-pointer absolute right-1.5 -top-2 text-2xl text-facebook-green hover:text-facebook-greenHover"
                              onClick={() => {
                                setRemoveMedia(true);
                                setShowUploadPic(!showUploadPic);
                              }}
                            />
                          </Fragment>
                        ) : (
                          <div className="-mt-14">
                            {showUploadPic && (
                              <UploadPhoto
                                setShowUploadPic={setShowUploadPic}
                                selectedImages={selectedImages}
                                setSelectedImages={setSelectedImages}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b -mt-5">
                  <button
                    type="button"
                    className={
                      'inline-block px-6 w-full py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ' +
                      `${removeMedia ? 'ml-0.5' : 'ml-2.5'}`
                    }
                    onClick={() => {
                      sharedPost ? editSharedPostHandler() : editPostHandler();
                    }}
                  >
                    {t('save')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="opacity-75 fixed inset-0 z-60 bg-black"></div>
    </Fragment>
  );
};

export default EditPost;
