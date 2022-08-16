import React, { useState } from 'react';
import { axiosInstance } from '../../../network/axiosInstance';
import profileImg from '../../../assets/images/default_profile.png';
import { VscSmiley } from 'react-icons/vsc';
import EmojiPicker from './EmojiPicker';
import { IoMdPhotos } from 'react-icons/io';
import UploadPhoto from './UploadPhoto';
import IsLoadingScreen from './IsLoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { alertHandler } from '../../../store/userSlice/NewsFeedSlice';

const CreatePostModal = ({ showModal, setShowModal }) => {
  // User data:
  const user = useSelector(state => state.newsFeed.profileData);

  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showUploadPic, setShowUploadPic] = useState(false);

  //Post Data
  const [inputStr, setInputStr] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Public');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr(prevInput => prevInput + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  //Start Posting Post Data
  const submitData = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('visability', selectedOption);
    formData.append('content', inputStr);

    selectedImages.forEach(selectedImage => {
      formData.append('media', selectedImage);
    });

    setLoading(true);

    axiosInstance
      .post('/posts', formData, {})
      .then(response => {
        if (response.status === 200) {
          setLoading(false);
          setPost(response.data);
          console.log(response);
          // To close Modal after submitting data
          setShowModal(false);

          // Alert message:
          dispatch(
            alertHandler({
              message: response.data,
              showAlert: true,
              statusCode: 200,
            })
          );
        }
      })
      .catch(err => {
        console.log('error :( ' + err);

        // Alert message:
        dispatch(
          alertHandler({
            message: err.data,
            showAlert: true,
            statusCode: 400,
          })
        );
      });

    if (!post) {
      return 'No Post Created';
    }
  };
  //End Posting Post Data

  return (
    <>
      {showModal && (
        <div className="fixed top-14 left-0 z-70 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
          {/**Form */}
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={submitData}
          >
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
              {loading ? (
                <IsLoadingScreen />
              ) : (
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 className="text-xl font-bold leading-normal text-black">
                      Create post
                    </h5>

                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    ></button>
                  </div>

                  <div className="modal-body container space-x-2 p-4">
                    <div className="grid grid-cols-10 w-full">
                      <img
                        src={user?.profileImage}
                        alt="profile-imag"
                        className="rounded-full"
                        width={40}
                        height={40}
                        layout="fixed"
                      />

                      <p className="font-bold text-sm ml-3 w-max">
                        {`${user?.firstName} ${user?.lastName}`}
                      </p>

                      {/** Select Privacy Options */}
                      <div className="absolute mt-6 left-[4.5rem]">
                        <select
                          name="visability"
                          onChange={e => setSelectedOption(e.target.value)}
                          value={selectedOption}
                          className="
          px-2
          py-1
          bg-facebook-grey
          text-black
          font-medium
          text-xs
          leading-tight
          rounded
          hover:bg-facebook-grey hover:shadow-lg
          focus:bg-facebook-grey focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-facebook-grey active:shadow-lg active:text-black
          flex
          items-center
          whitespace-nowrap
        "
                          type="button"
                        >
                          <option
                            value="Public"
                            className="
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                          >
                            &#127759; Public
                          </option>
                          <option
                            value="Private"
                            className="
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                          >
                            &#128274; Private
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 w-12/13">
                      <div className="flex flex-wrap">
                        <textarea
                          rows="3"
                          cols="35"
                          name="content"
                          className=" px-4 py-3 w-full scrollbar-hide resize-none h-auto focus:outline-none"
                          placeholder={`What's on your mind, ${user?.firstName}?`}
                          value={inputStr}
                          onChange={e => {
                            setInputStr(e.target.value);
                          }}
                        ></textarea>
                        {showUploadPic ? (
                          <UploadPhoto
                            setShowUploadPic={setShowUploadPic}
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
                    <div className="flex">
                      <div className="justify-end my-2 text-2xl text-gray-500 ">
                        <button
                          type="button"
                          className="mr-3 text-facebook-green"
                          onClick={() => setShowUploadPic(true)}
                        >
                          <IoMdPhotos />
                        </button>
                        {/* emoji picker */}
                        <button
                          type="button"
                          onClick={() => setShowPicker(!showPicker)}
                        >
                          {' '}
                          <VscSmiley
                            className={`${showPicker && 'text-blue-400'}`}
                          />
                        </button>
                        {showPicker ? (
                          <EmojiPicker
                            chosenEmoji={chosenEmoji}
                            onEmojiClick={onEmojiClick}
                          />
                        ) : null}
                      </div>
                    </div>

                    <button
                      disabled={
                        selectedImages.length >= 0 && selectedImages.length < 5
                          ? false
                          : true
                      }
                      className="inline-block px-6 w-full py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
      <div className="opacity-75 fixed inset-0 z-60 bg-black"></div>
    </>
  );
};

export default CreatePostModal;
