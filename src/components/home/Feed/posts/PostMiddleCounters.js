import React from 'react';

import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';

const postMiddleCounters = ({
  data,
  reactions,
  reactionsMakers,
  sharedPost,
  setWriteComment,
  writeComment,
}) => {
  console.log(reactions, reactionsMakers);
  // Handle Tooltip reactionsMakers groups:
  let likeMakers = [];
  let loveMakers = [];
  let careMakers = [];
  let hahaMakers = [];
  let wowMakers = [];
  let sadMakers = [];
  let angryMakers = [];

  reactionsMakers?.filter(maker => {
    if (maker?.reaction === 'Like') {
      likeMakers?.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return likeMakers;
    }

    if (maker?.reaction === 'Love') {
      loveMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return loveMakers;
    }

    if (maker?.reaction === 'Care') {
      careMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return careMakers;
    }

    if (maker?.reaction === 'Haha') {
      hahaMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return hahaMakers;
    }

    if (maker?.reaction === 'Wow') {
      wowMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return wowMakers;
    }

    if (maker?.reaction === 'Sad') {
      sadMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return sadMakers;
    }

    if (maker?.reaction === 'Angry') {
      angryMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return angryMakers;
    }
  });

  let reactionMakersArray = [
    { Like: likeMakers },
    { Love: loveMakers },
    { Care: careMakers },
    { Haha: hahaMakers },
    { Wow: wowMakers },
    { Sad: sadMakers },
    { Angry: angryMakers },
  ];
  // console.log(reactionMakersArray);

  //   Check if ther are no reactions from DB:
  let reactionsLengthCheck =
    data?.reactions?.length !== 0 &&
    data?.reactions?.filter(reaction => reaction.reaction !== '').length !== 0;

  return (
    <div
      className={`flex justify-between mt-3 pb-3 px-3 ${
        sharedPost
          ? `${
              (sharedPost && data?.comments.length !== 0) ||
              reactionsLengthCheck
                ? 'border-b-2'
                : '-mt-9'
            }`
          : 'border-b-2'
      }`}
    >
      {
        <div className="flex">
          {reactions?.map((reaction, idx) => (
            <div
              key={idx}
              className="mt-1"
              data-title={
                // reaction makers:
                reaction +
                ': ' +
                reactionMakersArray
                  ?.map(maker => maker[reaction])
                  ?.join('')
                  ?.split(',')
                  ?.join(', ')
              }
            >
              {reaction === 'Like' ? (
                <img className="w-4" src={likeSVG} alt="like face" />
              ) : reaction === 'Love' ? (
                <img className="w-4" src={loveSVG} alt="love face" />
              ) : reaction === 'Care' ? (
                <img className="w-4" src={careSVG} alt="care face" />
              ) : reaction === 'Haha' ? (
                <img className="w-4" src={hahaSVG} alt="haha face" />
              ) : reaction === 'Wow' ? (
                <img className="w-4" src={wowSVG} alt="wow face" />
              ) : reaction === 'Sad' ? (
                <img className="w-4" src={sadSVG} alt="sad face" />
              ) : reaction === 'Angry' ? (
                <img className="w-4" src={angrySVG} alt="angry face" />
              ) : (
                ''
              )}
            </div>
          ))}
          {
            // Check if there are reactions or reactions without empty string(""):
          }
          {data?.reactions?.length !== 0 && reactionsLengthCheck && (
            <span className="text-gray-500 ml-2 text-sm mt-0.5">
              {
                data?.reactions?.filter(reaction => reaction.reaction !== '')
                  .length
              }
            </span>
          )}
        </div>
      }
      {
        <div className="h-6">
          <button
            onClick={() => {
              setWriteComment(!writeComment);
            }}
            className="text-gray-500 mr-3 hover:border-b-2 border-gray-300"
          >
            {
              // Hide comment counter for shared posts only if there is no comments:
            }
            {sharedPost && data?.comments.length === 0
              ? ''
              : `${data?.comments.length} ${
                  data?.comments.length < 2 ? 'comment' : 'comments'
                }
              `}
          </button>

          {
            // Hide share button for shared Post:
          }
          {!sharedPost && (
            <button className="text-gray-500 hover:border-b-2 border-gray-300">
              {data?.sharesCount} {data?.sharesCount === 1 ? 'share' : 'shares'}
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default postMiddleCounters;
