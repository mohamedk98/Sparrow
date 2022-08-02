import React, { Fragment, useState } from 'react';

import profileImg from '../../../../assets/images/default_profile.png';

import { AiFillLike } from 'react-icons/ai';

import FullScreenOriginalPost from './FullScreenOriginalPost';

import PostHalfTop from './PostHalfTop';

import PostMiddle from './PostMiddle';
import dateCalcFunction from './DateCalculations';

import PostMiddleCounters from './PostMiddleCounters';

const Post = ({
  data,
  className,
  userData,
  sharedPost,
  sharedPostData,
  reactions,
  reactionsMakers,
  moreID,
}) => {
  // console.log(reactions, sharedPost);
  // console.log(reactionsMakers, sharedPost);

  // console.log(sharedPost);

  // Hide and show comments:
  const [writeComment, setWriteComment] = useState(false);

  // console.log(sharedPostData);
  // console.log(data?._id);
  console.log();
  return (
    <div
      className={`rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7 ${className}`}
      key={data?._id}
    >
      {
        <PostHalfTop
          profileSRC={data?.userId?.profileImage || profileImg}
          profileName={data?.creatorName}
          postDate={dateCalcFunction(data?.createdAt)}
          hideMore={!className ? false : true}
          postBody={data?.content}
          postImage={data?.media}
          sharerId={data?.sharerId_id}
          userID={userData?._id}
          sharedPost={sharedPost}
          sharedPostData={sharedPostData}
          reverseDirection={sharedPost && true}
          postId={data?._id}
        />
      }

      <div className="">
        {!sharedPost && (
          <PostMiddleCounters
            data={data}
            reactions={reactions}
            reactionsMakers={reactionsMakers}
            sharedPost={sharedPost}
            setWriteComment={setWriteComment}
            writeComment={writeComment}
          />
        )}

        {!sharedPost && (
          <PostMiddle
            writeComment={writeComment}
            setWriteComment={setWriteComment}
            data={data}
            userData={userData}
            moreID={moreID}
          />
        )}
      </div>

      {
        <FullScreenOriginalPost
          data={data}
          // className={className}
          // userData={userData}
          // sharedPost={sharedPost}
          // sharedPostData={sharedPostData}
          PostHalfTop={
            <PostHalfTop
              profileSRC={profileImg}
              profileName={data?.creatorName}
              postDate={data?.createdAt?.slice(0, 10)}
              postBody={data?.content}
              // postImage={data?.media}
              hideMore={!className ? false : true}
              sharerId={data?.sharerId_id}
              userId={userData?._id}
              sharedPost={sharedPost}
              sharedPostData={sharedPostData}
              reverseDirection={sharedPost && true}
            />
          }
          postMiddelAndBottom={
            <div className="">
              <div
                className={
                  'flex justify-between mt-3 pb-3 px-3 ' + sharedPost
                    ? ''
                    : 'border-b-2'
                }
              >
                <div>
                  <a href="/">
                    <AiFillLike className="text-blue-700 inline mr-1 -mt-1 text-xl" />
                    {
                      // <BsHeartFill className="text-red-600 inline mr-1" />
                    }
                    <span className="text-gray-500">
                      {data?.reactions.length}
                    </span>
                  </a>
                </div>
                <div className="h-6">
                  <button
                    onClick={() => {
                      setWriteComment(!writeComment);
                    }}
                    className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
                  >
                    {data?.comments.length}{' '}
                    {data?.comments.length < 2 ? 'comment' : 'comments'}
                  </button>
                  <button className="text-gray-500 hover:border-b-2 border-gray-300">
                    {data?.sharesCount}{' '}
                    {data?.sharesCount === 1 ? 'share' : 'shares'}
                  </button>
                </div>
              </div>
              <PostMiddle
                writeComment={writeComment}
                setWriteComment={setWriteComment}
                data={data}
                userData={userData}
              />
            </div>
          }
        />
      }
    </div>
  );
};

export default Post;

// {
//   import React, { Fragment, useState } from 'react';
// import likeSVG from './../../../../assets/reacts/like.svg';
// import loveSVG from '../../../../assets/reacts/love.svg';
// import careSVG from '../../../../assets/reacts/heart.svg';
// import hahaSVG from '../../../../assets/reacts/haha.svg';
// import wowSVG from '../../../../assets/reacts/wow.svg';
// import sadSVG from '../../../../assets/reacts/sad.svg';
// import angrySVG from '../../../../assets/reacts/angry.svg';

// import profileImg from '../../../../assets/images/default_profile.png';
// import FullScreenOriginalPost from './FullScreenOriginalPost';

// import PostHalfTop from './PostHalfTop';

// import PostMiddle from './PostMiddle';
// import dateCalcFunction from './DateCalculations';

// const Post = ({
//   data,
//   className,
//   userData,
//   sharedPost,
//   sharedPostData,
//   reactions,
//   reactionsMakers,
// }) => {
//   console.log(data);
//   // console.log(reactions, sharedPost);
//   // console.log(reactionsMakers, sharedPost);

//   // Handle Tooltip reactionsMakers groups:
//   let likeMakers = [];
//   let loveMakers = [];
//   let careMakers = [];
//   let hahaMakers = [];
//   let wowMakers = [];
//   let sadMakers = [];
//   let angryMakers = [];

//   reactionsMakers?.filter(maker => {
//     if (maker?.reaction === 'Like') {
//       likeMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return likeMakers;
//     }

//     if (maker?.reaction === 'Love') {
//       loveMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return loveMakers;
//     }

//     if (maker?.reaction === 'Care') {
//       careMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return careMakers;
//     }

//     if (maker?.reaction === 'Haha') {
//       hahaMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return hahaMakers;
//     }

//     if (maker?.reaction === 'Wow') {
//       wowMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return wowMakers;
//     }

//     if (maker?.reaction === 'Sad') {
//       sadMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return sadMakers;
//     }

//     if (maker?.reaction === 'Angry') {
//       angryMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
//       return angryMakers;
//     }
//   });

//   let reactionMakersArray = [
//     { Like: likeMakers },
//     { Love: loveMakers },
//     { Care: careMakers },
//     { Haha: hahaMakers },
//     { Wow: wowMakers },
//     { Sad: sadMakers },
//     { Angry: angryMakers },
//   ];

//   // console.log(reactionMakersArray);

//   // console.log(sharedPost);
//   // Hide and show comments:
//   const [writeComment, setWriteComment] = useState(false);

//   // console.log(sharedPostData);
//   // console.log(data?._id);
//   console.log();
//   return (
//     <div
//       className={`rounded-lg shadow-lg bg-white p-3 max-w-2xl mx-auto my-7 ${className}`}
//       key={data?._id}
//     >
//       {
//         <PostHalfTop
//           profileSRC={profileImg}
//           profileName={data?.creatorName}
//           postDate={dateCalcFunction(data?.createdAt)}
//           hideMore={!className ? false : true}
//           postBody={data?.content}
//           postImage={data?.media}
//           sharerId={data?.sharerId_id}
//           userId={userData?._id}
//           sharedPost={sharedPost}
//           sharedPostData={sharedPostData}
//           reverseDirection={sharedPost && true}
//         />
//       }

//       <div className="">
//         <div
//           className={`flex justify-between mt-3 pb-3 px-3 ${
//             sharedPost ? '' : 'border-b-2'
//           }`}
//         >
//           {
//             <div className="flex">
//               {reactions.map((reaction, idx) => (
//                 <div
//                   key={idx}
//                   className="mt-1"
//                   data-title={
//                     // reaction makers:
//                     reaction +
//                     ': ' +
//                     reactionMakersArray
//                       ?.map(maker => maker[reaction])
//                       ?.join('')
//                       ?.split(',')
//                       ?.join(', ')
//                   }
//                 >
//                   {reaction === 'Like' ? (
//                     <img className="w-4" src={likeSVG} alt="like face" />
//                   ) : reaction === 'Love' ? (
//                     <img className="w-4" src={loveSVG} alt="love face" />
//                   ) : reaction === 'Care' ? (
//                     <img className="w-4" src={careSVG} alt="care face" />
//                   ) : reaction === 'Haha' ? (
//                     <img className="w-4" src={hahaSVG} alt="haha face" />
//                   ) : reaction === 'Wow' ? (
//                     <img className="w-4" src={wowSVG} alt="wow face" />
//                   ) : reaction === 'Sad' ? (
//                     <img className="w-4" src={sadSVG} alt="sad face" />
//                   ) : reaction === 'Angry' ? (
//                     <img className="w-4" src={angrySVG} alt="angry face" />
//                   ) : (
//                     ''
//                   )}
//                 </div>
//               ))}

//               {
//                 // Check if there are reactions or reactions without empty string(""):
//               }
//               {data?.reactions?.length !== 0 &&
//                 data?.reactions?.filter(reaction => reaction.reaction !== '')
//                   .length !== 0 && (
//                   <span className="text-gray-500 ml-2 text-sm mt-0.5">
//                     {
//                       // show number of reactions for regular and shared post:

//                       (sharedPost ? sharedPostData : data)?.reactions?.filter(
//                         reaction => reaction.reaction !== ''
//                       ).length
//                     }
//                   </span>
//                 )}
//             </div>
//           }

//           {!sharedPost && (
//             <div className="h-6">
//               <button
//                 onClick={() => {
//                   setWriteComment(!writeComment);
//                 }}
//                 className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
//               >
//                 {data?.comments.length}{' '}
//                 {data?.comments.length < 2 ? 'comment' : 'comments'}
//               </button>
//               <button className="text-gray-500 hover:border-b-2 border-gray-300">
//                 {data?.sharesCount}{' '}
//                 {data?.sharesCount === 1 ? 'share' : 'shares'}
//               </button>
//             </div>
//           )}
//         </div>

//         {!sharedPost && (
//           <PostMiddle
//             writeComment={writeComment}
//             setWriteComment={setWriteComment}
//             data={data}
//             userData={userData}
//           />
//         )}
//       </div>

//       {
//         // <FullScreenOriginalPost
//         //   // data={data}
//         //   // className={className}
//         //   // userData={userData}
//         //   // sharedPost={sharedPost}
//         //   // sharedPostData={sharedPostData}
//         //   PostHalfTop={
//         //     <PostHalfTop
//         //       profileSRC={profileImg}
//         //       profileName={data?.creatorName}
//         //       postDate={data?.createdAt?.slice(0, 10)}
//         //       postBody={data?.content}
//         //       // postImage={data?.media}
//         //       // hideMore={!className ? false : true}
//         //       // sharerId={data?.sharerId_id}
//         //       // userId={userData?._id}
//         //       // sharedPost={sharedPost}
//         //       // sharedPostData={sharedPostData}
//         //       // reverseDirection={sharedPost && true}
//         //     />
//         //   }
//         //   postMiddelAndBottom={
//         //     <div className="">
//         //       <div
//         //         className={
//         //           'flex justify-between mt-3 pb-3 px-3 ' + sharedPost
//         //             ? ''
//         //             : 'border-b-2'
//         //         }
//         //       >
//         //         <div>
//         //           <a href="/">
//         //             <AiFillLike className="text-blue-700 inline mr-1 -mt-1 text-xl" />
//         //             {
//         //               // <BsHeartFill className="text-red-600 inline mr-1" />
//         //             }
//         //             <span className="text-gray-500">
//         //               {data?.reactions.length}
//         //             </span>
//         //           </a>
//         //         </div>
//         //         <div className="h-6">
//         //           <button
//         //             onClick={() => {
//         //               setWriteComment(!writeComment);
//         //             }}
//         //             className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
//         //           >
//         //             {data?.comments.length}{' '}
//         //             {data?.comments.length < 2 ? 'comment' : 'comments'}
//         //           </button>
//         //           <button className="text-gray-500 hover:border-b-2 border-gray-300">
//         //             {data?.sharesCount}{' '}
//         //             {data?.sharesCount === 1 ? 'share' : 'shares'}
//         //           </button>
//         //         </div>
//         //       </div>
//         //       <PostMiddle
//         //         writeComment={writeComment}
//         //         setWriteComment={setWriteComment}
//         //         data={data}
//         //         userData={userData}
//         //       />
//         //     </div>
//         //   }
//         // />
//       }
//     </div>
//   );
// };

// export default Post;

// }
