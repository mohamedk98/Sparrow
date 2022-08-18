import React from 'react';
import { useSelector } from 'react-redux';
import AlertMessage from './AlertMessage';

import PostImageGrid from './PostImageGrid';

const FullScreenOriginalPost = ({
  postData,
  PostHalfTop,
  postMiddelAndBottom,
}) => {
  // To show and hide alerts:
  const alert = useSelector(state => state.newsFeed.alert);

  return (
    <div
      className="modal fade fixed top-0 -left-0 justify-center align-middle text-center hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto md:overflow-y-hidden"
      id={'fullScreenModal' + postData?._id}
      data-bs-backdrop="static"
      data-bs-keyboard="true"
      tabIndex="-1"
      aria-labelledby="openOriginalPostFullScreenLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none ml-0 mt-0 ">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-screen h-screen pointer-events-auto bg-black bg-opacity-95 bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-body p-4 grid md:grid-cols-12">
            <div className="md:col-span-8 relative">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black bg-gray-400 border-none rounded-none opacity-60 bg-opacity-60  focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-100  hover:no-underline z-40 absolute top-5 left-5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="relative flex flex-col justify-center align-middle md:mt-36 md:right-0 h-full md:h-fit">
                <PostImageGrid
                  postImage={postData?.media}
                  fullScreenClassName=" max-w-screen-lg max-h-128  "
                  containerClassName="cursor-default relative -ml-4 md:-mt-1 -mt-4"
                  imageContainerClassName="flex justify-center align-middle"
                />
              </div>
            </div>
            <div className="relative md:bg-white dark:bg-zinc-800 transition duration-700 md:col-span-4 -mt-4 rounded-lg -mr-4 -mb-1 md:-mb-4 text-left">
              <div className="md:rounded-lg shadow-lg bg-white dark:bg-zinc-800 transition duration-700 md:bg-transparent md:shadow-transparent p-3 h-full relative top-4 -mx-2 -left-2 md:left-0">
                {PostHalfTop}
                {postMiddelAndBottom}
              </div>
            </div>
          </div>
        </div>
      </div>
      {alert.message && (
        <div className="fixed bottom-0 left-2 z-10 ">
          <AlertMessage alert={alert} />
        </div>
      )}
    </div>
  );
};

export default FullScreenOriginalPost;
