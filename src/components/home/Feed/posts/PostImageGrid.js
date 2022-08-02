import React, { Fragment } from 'react';

// import img1 from './../../../../assets/images/postBackgrounds/1.jpg';
// import img2 from './../../../../assets/images/postBackgrounds/2.jpg';
// import img3 from './../../../../assets/images/postBackgrounds/3.jpg';
// import img4 from './../../../../assets/images/postBackgrounds/4.jpg';
// import img5 from './../../../../assets/images/postBackgrounds/5.jpg';
// import img6 from './../../../../assets/images/postBackgrounds/6.jpg';
// import img7 from './../../../../assets/images/postBackgrounds/7.jpg';

const PostImageGrid = ({ reverseDirection, postImage }) => {
  // let postImage = [
  //   img1,
  //   img2,
  //   img3,
  //   img4,
  //   img5,
  //   img6,
  //   img7
  // ];

  // console.log(postImage);

  return (
    <div
      className={
        reverseDirection && postImage?.length > 1
          ? 'cursor-pointer'
          : 'cursor-pointer'
      }
      // className={
      //   reverseDirection && postImage?.length > 1
      //     ? 'grid grid-cols-2 grid-flow-row mb-3 -mt-10 cursor-pointer'
      //     : 'cursor-pointer'
      // }
      data-bs-toggle="modal"
      data-bs-target="#openOriginalPostFullScreen"
    >
      {
        // Makeing image grid system:
        //
        // Handling first image in the array or array with only one image:
      }
      {postImage?.map((img, idx) =>
        postImage?.length === 1 ? (
          <div key={idx} className="">
            <img
              key={idx}
              src={img}
              className={`grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4 rounded-t-lg'
              }`}
              alt="img"
            />
          </div>
        ) : postImage?.length === 3 ? (
          idx === 0 ? (
            <div
              key={idx}
              className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4'
              }`}
            >
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-lg"
                alt="img"
              />
            </div>
          ) : (
            ''
          )
        ) : postImage?.length === 3 ? (
          idx === 0 ? (
            <div
              key={idx}
              className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4'
              }`}
            >
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-lg"
                alt="img"
              />
            </div>
          ) : (
            ''
          )
        ) : postImage?.length > 3 ? (
          idx === 0 ? (
            <div
              key={idx}
              className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4'
              }`}
            >
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-lg"
                alt="img"
              />
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )
      )}

      {
        // Handling images more than one in array having three or more images or array with only two images:
      }
      <div
        className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
          reverseDirection && 'rounded-t-lg'
        }`}
      >
        {postImage?.map(
          (img, idx) =>
            postImage?.length === 2 && (
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-md"
                alt="img"
              />
            )
        )}
      </div>

      <div
        className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
          reverseDirection && 'rounded-t-lg'
        }`}
      >
        {postImage?.map(
          (img, idx) =>
            postImage?.length === 3 &&
            idx !== 0 && (
              <img key={idx} src={img} className="w-full h-full" alt="img" />
            )
        )}
      </div>

      <div
        className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 ${
          reverseDirection && 'rounded-t-lg'
        }`}
      >
        {postImage?.map(
          (img, idx) =>
            postImage?.length === 4 &&
            idx !== 0 && (
              <img key={idx} src={img} className="w-full h-full" alt="img" />
            )
        )}
      </div>

      <div
        className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 relative ${
          reverseDirection && 'rounded-t-lg'
        }`}
      >
        {postImage?.map(
          (img, idx) =>
            postImage?.length > 4 &&
            idx > 0 &&
            idx < 4 && (
              <Fragment>
                <img key={idx} src={img} className="w-full h-full" alt="img" />
                {idx === 3 && (
                  <span className="absolute right-14 top-8 -mr-0.5 md:right-16 md:top-9 lg:right-24 lg:-mr-1 lg:top-14 text-white font-bold">
                    {`+ ${postImage?.length - 3}`}
                  </span>
                )}
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default PostImageGrid;
