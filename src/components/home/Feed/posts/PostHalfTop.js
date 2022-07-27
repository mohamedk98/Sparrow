import React from 'react';
import More from './More';

const PostHalfTop = ({
  profileSRC,
  profileName,
  postDate,
  hideMore,
  postBody,
  postImage,
  reverseDirection,
}) => {
  // console.log(postImage);
  return (
    <div className={reverseDirection ? 'flex flex-col-reverse' : ''}>
      <div className="card-body relative">
        <div className="flex mb-3">
          <img
            src={profileSRC}
            className="rounded-full mr-2 h-10"
            alt="Avatar"
          />

          <div>
            <strong>{profileName}</strong>

            <span className="text-gray-600 text-sm block">{postDate}</span>
            <More
              text="Hide post"
              containerClassName="dropdown absolute right-1 top-1"
              iconClassName={hideMore === true ? 'hidden' : 'w-9 h-9'}
              liNum1={1}
              tooltipData="more"
            />
          </div>
        </div>

        <p className="mb-5">{postBody}</p>
      </div>

      <div>
        {
          //   postImage?.map((img, idx) => (
          //   <img
          //     key={idx}
          //     src={`${img}`}
          //     className={reverseDirection ? 'w-full mb-3' : 'w-full'}
          //     alt="img"
          //   />
          // ))
        }
      </div>
    </div>
  );
};

export default PostHalfTop;
