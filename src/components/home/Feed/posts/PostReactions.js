import React, { Fragment } from 'react';

import like from '../../../../assets/reacts/like.gif';
import love from '../../../../assets/reacts/love.gif';
import haha from '../../../../assets/reacts/haha.gif';
import wow from '../../../../assets/reacts/wow.gif';
import sad from '../../../../assets/reacts/sad.gif';
import angry from '../../../../assets/reacts/angry.gif';
import care from '../../../../assets/reacts/care.gif';
import { useTranslation } from 'react-i18next';

const PostReactions = ({
  visible,
  setVisible,
  reactHandler,
  containerClassName,
  reactionsFullScreenClassName,
  careReplyClassName,
  // For the heart reaction size and position:
  postsProfile,
}) => {
  const { t } = useTranslation();

  const reactsArray = [
    {
      name: `Like`,
      image: like,
    },
    {
      name: `Love`,
      image: love,
    },
    {
      name: `Care`,
      image: care,
    },
    {
      name: `Haha`,
      image: haha,
    },
    {
      name: `Wow`,
      image: wow,
    },
    {
      name: `Sad`,
      image: sad,
    },
    {
      name: `Angry`,
      image: angry,
    },
  ];
  return (
    <Fragment>
      {visible && (
        <div
          className={`flex flex-row justify-center align-middle absolute pt-1 px-1 bg-gray-50 shadow-2xl border rounded-full z-50 ${
            reactionsFullScreenClassName
              ? reactionsFullScreenClassName
              : ' mt-2 -top-10 lg:-top-14 -ml-5 '
          } ${containerClassName ? containerClassName : 'w-8/12'}`}
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => setVisible(false)}
        >
          {
            // For floating reactions:
          }
          {reactsArray.map((react, idx) => (
            <div
              className={
                react?.name === `Care`
                  ? `cursor-pointer ml-1 w-9/12 md:w-4/6 ${
                      postsProfile &&
                      'lg:w-[15rem] hover:lg:w-[16rem] lg1:w-[20rem] hover:lg1:w-[25rem] w-9/12 md:w-6/12'
                    } lg:w-6/12 -mt-0.5 hover:lg:w-8/12 hover:md:w-9/12 hover:w-11/12 md:max-h-20 ${
                      careReplyClassName &&
                      !reactionsFullScreenClassName &&
                      careReplyClassName
                    } ${
                      reactionsFullScreenClassName &&
                      ' w-6/12 md:w-6/12 hover:w-10/12 '
                    }`
                  : `cursor-pointer relative mr-1 ml-2 ${
                      postsProfile
                        ? 'lg:w-10/12 hover:lg:w-full'
                        : 'hover:lg:w-7/12 '
                    } hover:md:w-9/12 hover:w-11/12 max-h-10 ${
                      reactionsFullScreenClassName && ' w-6/12 hover:w-7/12 '
                    }`
              }
              key={idx}
              onClick={() => reactHandler(react?.name)}
              data-title={
                react?.name === 'Like'
                  ? `${t('reactName1')}`
                  : react?.name === 'Love'
                  ? `${t('reactName2')}`
                  : react?.name === 'Care'
                  ? `${t('reactName3')}`
                  : react?.name === 'Haha'
                  ? `${t('reactName4')}`
                  : react?.name === 'Wow'
                  ? `${t('reactName5')}`
                  : react?.name === 'Sad'
                  ? `${t('reactName6')}`
                  : react?.name === 'Angry'
                  ? `${t('reactName7')}`
                  : ''
              }
            >
              <img
                width="100%"
                height="100%"
                src={react?.image}
                alt={react?.name}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PostReactions;
