import React from 'react';
// import Post from './Post';
// import { useSelector } from 'react-redux';
import PostImageGrid from './PostImageGrid';
// import { Fragment } from 'react';

const FullScreenOriginalPost = ({
  postData,
  PostHalfTop,
  postMiddelAndBottom,
}) => {
  // console.log(modalId);
  //   console.log(originalPost);
  //   const userData = useSelector(state => state.newsFeed.profileData);

  // console.log(postData);

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
        <div className="modal-content border-none shadow-lg relative flex flex-col w-screen h-screen pointer-events-auto bg-black bg-opacity-90 bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-body p-4 grid md:grid-cols-12">
            <div className="md:col-span-8">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black bg-gray-400 border-none rounded-none opacity-60 bg-opacity-60  focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-100  hover:no-underline z-50 absolute top-5 left-5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="">
                <PostImageGrid
                  postImage={postData?.media}
                  fullScreenClassName="max-w-2xl mx-auto max-h-96 translate-y-1/4 -mt-5"
                  containerClassName="cursor-default -mt-4 md:-mt-0 md:translate-y-1/4 lg:translate-y-3.5 md:-ml-4 -mx-4 "
                  imageContainerClassName="flex align-center justify-center"
                />
              </div>
            </div>
            <div className="relative md:bg-white md:col-span-4 -mt-4 rounded-lg -mr-4 -mb-1 md:-mb-4 text-left">
              <div className="md:rounded-lg shadow-lg bg-white md:bg-transparent md:shadow-transparent p-3 h-full relative top-4 -mx-2 -left-2 md:left-0">
                {PostHalfTop}
                {postMiddelAndBottom}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenOriginalPost;
