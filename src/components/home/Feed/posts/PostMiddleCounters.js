import React from 'react';

import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';
import { useTranslation } from 'react-i18next';

const PostMiddleCounters = ({
  data,
  reactions,
  reactionsMakers,
  sharedPost,
  setWriteComment,
  writeComment,
  reply,
}) => {
  const { t } = useTranslation();
  // Handle Tooltip reactionsMakers groups:
  let likeMakers = [];
  let loveMakers = [];
  let careMakers = [];
  let hahaMakers = [];
  let wowMakers = [];
  let sadMakers = [];
  let angryMakers = [];

  reactionsMakers?.filter(maker => {
    if (maker?.reaction === `Like`) {
      likeMakers?.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return likeMakers;
    }

    if (maker?.reaction === `Love`) {
      loveMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return loveMakers;
    }

    if (maker?.reaction === `Care`) {
      careMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return careMakers;
    }

    if (maker?.reaction === `Haha`) {
      hahaMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return hahaMakers;
    }

    if (maker?.reaction === `Wow`) {
      wowMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return wowMakers;
    }

    if (maker?.reaction === `Sad`) {
      sadMakers.push(`${maker?.userId?.firstName}${maker?.userId?.lastName}`);
      return sadMakers;
    }

    if (maker?.reaction === `Angry`) {
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

  //   Check if ther are no reactions from DB:
  let reactionsLengthCheck =
    data?.reactions?.length !== 0 &&
    data?.reactions?.filter(reaction => reaction.reaction !== '').length !== 0;

  return (
    <div
      className={`flex justify-between pb-3 px-3 ${
        sharedPost
          ? `${
              ((sharedPost && data?.comments?.length !== 0) ||
                reactionsLengthCheck) &&
              !reply
                ? 'border-b-2'
                : '-mt-9'
            }`
          : reply
          ? ''
          : 'border-b-2'
      } ${reply ? 'pt-7 -mt-11' : 'mt-3'}`}
    >
      {
        <div className="flex">
          {[...new Set(reactions)]?.map((reaction, idx) => (
            <div
              key={idx}
              className="mt-1"
              data-title={
                // reaction makers:
                ` ${
                  reaction === 'Like'
                    ? `${t('reactName1')}`
                    : reaction === 'Love'
                    ? `${t('reactName2')}`
                    : reaction === 'Care'
                    ? `${t('reactName3')}`
                    : reaction === 'Haha'
                    ? `${t('reactName4')}`
                    : reaction === 'Wow'
                    ? `${t('reactName5')}`
                    : reaction === 'Sad'
                    ? `${t('reactName6')}`
                    : reaction === 'Angry'
                    ? `${t('reactName7')}`
                    : ''
                } 
                    : 
                    ${reactionMakersArray
                      ?.map(maker => maker[reaction])
                      ?.join('')
                      ?.split(',')
                      ?.join(', ')}`
              }
            >
              {reaction === 'Like' ? (
                <img className="w-4 h-4" src={likeSVG} alt="like face" />
              ) : reaction === 'Love' ? (
                <img className="w-4 h-4" src={loveSVG} alt="love face" />
              ) : reaction === 'Care' ? (
                <img className="w-4 h-4" src={careSVG} alt="care face" />
              ) : reaction === 'Haha' ? (
                <img className="w-4 h-4" src={hahaSVG} alt="haha face" />
              ) : reaction === 'Wow' ? (
                <img className="w-4 h-4" src={wowSVG} alt="wow face" />
              ) : reaction === 'Sad' ? (
                <img className="w-4 h-4" src={sadSVG} alt="sad face" />
              ) : reaction === 'Angry' ? (
                <img className="w-4 h-4" src={angrySVG} alt="angry face" />
              ) : (
                ''
              )}
            </div>
          ))}
          {
            // Check if there are reactions or reactions without empty string(""):
          }
          {data?.reactions?.length !== 0 && reactionsLengthCheck && (
            <span
              className={`text-gray-500 ${
                reply && 'ml-0.5'
              } ml-2 text-sm mt-0.5`}
            >
              {
                data?.reactions?.filter(reaction => reaction.reaction !== '')
                  .length
              }
            </span>
          )}
        </div>
      }
      {!reply && (
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
                  data?.comments.length < 2
                    ? `${t('Onecomment')}`
                    : `${t('noOfcomments')}`
                }
              `}
          </button>

          {
            // Hide share button for shared Post:
          }
          {!sharedPost && (
            <button className="text-gray-500 cursor-default  border-gray-300">
              {data?.sharesCount}{' '}
              {data?.sharesCount === 1
                ? `${t('oneShare')}`
                : `${t('noOfShares')}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMiddleCounters;
