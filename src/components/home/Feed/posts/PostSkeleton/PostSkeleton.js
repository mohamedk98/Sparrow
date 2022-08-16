import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostSkeleton = () => {
  return (
    <div className="rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7">
      <div className="card-body relative">
        <div className="flex mb-3">
          <div className="w-12 h-12">
            <Skeleton
              circle
              height="100%"
              containerClassName="avatar-skeleton"
            />
          </div>

          <div>
            <Skeleton className="ml-5 mt-2" count={1} width={150} />
            <Skeleton className="ml-5 mt-2" count={1} width={140} />
          </div>
        </div>
        <div className="mb-3">
          <Skeleton className="mb-1" count={3} />
        </div>
      </div>

      <div className="">
        <Skeleton
          className="h-56"
          //   highlightColor="red"
          //   style={{ backgroundColor: 'red' }}
        />
      </div>

      <div className="flex justify-around mt-3 mb-2">
        <Skeleton className="mx-10" count={3} inline width={120} />
      </div>
    </div>
  );
};

export default PostSkeleton;
