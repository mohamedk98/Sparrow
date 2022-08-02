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
}) => {
  // console.log(moreID);
  // console.log(userId);
  // console.log(sharedPost);
  // console.log(sharedPostData?._id);
  // console.log(fullPost);
  // console.log(postImage);

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

            <span className="text-gray-600 text-sm block">{postDate}</span>
            {!sharedPost && (
              <More
                text={userID === sharerId ? 'Delete post' : 'Hide post'}
                text2={userID === sharerId && 'Edit post'}
                sharedPost={sharedPost}
                containerClassName="dropdown absolute right-1 top-1"
                iconClassName={hideMore === true ? 'hidden' : 'w-9 h-9'}
                liNum1={1}
                liNum2={userID === sharerId ? 2 : false}
                tooltipData="more"
                sharedPostData={sharedPostData}
                // postId={postId}
                moreID={moreID || postId}
                userID={userID}
                sharerId={sharerId}
                userData={userData}
              />
            )}
          </div>
        </div>

        <p className="mb-5">{postBody}</p>
      </div>

      <PostImageGrid
        reverseDirection={reverseDirection}
        postImage={postImage}
      />

      {
        //   <div
        //   className={
        //     reverseDirection && postImage?.length > 1
        //       ? 'cursor-pointer'
        //       : 'cursor-pointer'
        //   }
        //   // className={
        //   //   reverseDirection && postImage?.length > 1
        //   //     ? 'grid grid-cols-2 grid-flow-row mb-3 -mt-10 cursor-pointer'
        //   //     : 'cursor-pointer'
        //   // }
        //   data-bs-toggle="modal"
        //   data-bs-target="#openOriginalPostFullScreen"
        // >
        //   {
        //     // Makeing image grid system:
        //     //
        //     // Handling first image in the array or array with only one image:
        //   }
        //   {postImage?.map((img, idx) =>
        //     postImage?.length === 1 ? (
        //       <div key={idx} className="">
        //         <img
        //           key={idx}
        //           src={img}
        //           className={`grid grid-flow-row grid-cols-1 grid-rows-1 ${
        //             reverseDirection && 'mb-3 -mt-4 rounded-t-lg'
        //           }`}
        //           alt="img"
        //         />
        //       </div>
        //     ) : postImage?.length === 3 ? (
        //       idx === 0 ? (
        //         <div
        //           key={idx}
        //           className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
        //             reverseDirection && 'mb-3 -mt-4'
        //           }`}
        //         >
        //           <img key={idx} src={img} className="w-full h-full rounded-t-lg" alt="img" />
        //         </div>
        //       ) : (
        //         ''
        //       )
        //     ) : postImage?.length === 3 ? (
        //       idx === 0 ? (
        //         <div
        //           key={idx}
        //           className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
        //             reverseDirection && 'mb-3 -mt-4'
        //           }`}
        //         >
        //           <img key={idx} src={img} className="w-full h-full rounded-t-lg" alt="img" />
        //         </div>
        //       ) : (
        //         ''
        //       )
        //     ) : postImage?.length > 3 ? (
        //       idx === 0 ? (
        //         <div
        //           key={idx}
        //           className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
        //             reverseDirection && 'mb-3 -mt-4'
        //           }`}
        //         >
        //           <img key={idx} src={img} className="w-full h-full rounded-t-lg" alt="img" />
        //         </div>
        //       ) : (
        //         ''
        //       )
        //     ) : (
        //       ''
        //     )
        //   )}
        //   {
        //     // Handling images more than one in array having three or more images or array with only two images:
        //   }
        //   <div
        //     className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
        //       reverseDirection && 'rounded-t-lg'
        //     }`}
        //   >
        //     {postImage?.map(
        //       (img, idx) =>
        //         postImage?.length === 2 && (
        //           <img key={idx} src={img} className="w-full h-full rounded-t-md" alt="img" />
        //         )
        //     )}
        //   </div>
        //   <div
        //     className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
        //       reverseDirection && 'rounded-t-lg'
        //     }`}
        //   >
        //     {postImage?.map(
        //       (img, idx) =>
        //         postImage?.length === 3 &&
        //         idx !== 0 && (
        //           <img key={idx} src={img} className="w-full h-full" alt="img" />
        //         )
        //     )}
        //   </div>
        //   <div
        //     className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 ${
        //       reverseDirection && 'rounded-t-lg'
        //     }`}
        //   >
        //     {postImage?.map(
        //       (img, idx) =>
        //         postImage?.length === 4 &&
        //         idx !== 0 && (
        //           <img key={idx} src={img} className="w-full h-full" alt="img" />
        //         )
        //     )}
        //   </div>
        //   <div
        //     className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 relative ${
        //       reverseDirection && 'rounded-t-lg'
        //     }`}
        //   >
        //     {postImage?.map(
        //       (img, idx) =>
        //         postImage?.length > 4 &&
        //         idx > 0 &&
        //         idx < 4 && (
        //           <Fragment>
        //             <img
        //               key={idx}
        //               src={img}
        //               className="w-full h-full"
        //               alt="img"
        //             />
        //             {idx === 3 && (
        //               <span className="absolute right-14 top-8 -mr-0.5 md:right-16 md:top-9 lg:right-24 lg:-mr-1 lg:top-14 text-white font-bold">
        //                 {`+ ${postImage?.length - 3}`}
        //               </span>
        //             )}
        //           </Fragment>
        //         )
        //     )}
        //   </div>
        // </div>
      }
    </div>
  );
};

export default PostHalfTop;
