import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import PostImageGrid from './PostImageGrid';
import { Fragment } from 'react';

const FullScreenOriginalPost = ({ data, PostHalfTop, postMiddelAndBottom }) => {
  //   console.log(originalPost);
  //   const userData = useSelector(state => state.newsFeed.profileData);

  // console.log(data);

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="openOriginalPostFullScreen"
      data-bs-backdrop="static"
      data-bs-keyboard="true"
      tabIndex="-1"
      aria-labelledby="openOriginalPostFullScreenLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            {
              //   <h5
              //   className="text-xl font-medium leading-normal text-gray-800"
              //   id="exampleModalLabel"
              // >
              //   Modal title
              // </h5>
            }
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4 grid grid-flow-row">
            <PostImageGrid postImage={data?.media} />
            <Fragment>
              {PostHalfTop}
              {postMiddelAndBottom}
            </Fragment>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenOriginalPost;
