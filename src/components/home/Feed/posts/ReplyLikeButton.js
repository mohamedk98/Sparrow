import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';

import PostReactions from './PostReactions';
import ReactionClassHandler from './ReactionClasses';

import { useDispatch } from 'react-redux';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';
import { useTranslation } from 'react-i18next';

const ReplyLikeButton = ({
  setReactionClicked,
  containerClassName,
  reactionsFullScreenClassName,
  postId,
  commentId,
  sharedPost,
  comment,
  replyId,
  reply,
  reactionClicked,
  curruntUserCommentReaction,
  curruntUserReplyReaction,
  // For the heart reaction size and position:
  postsProfile,
}) => {
  // Language:
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const { t } = useTranslation();

  // Rerender:
  const dispatch = useDispatch();

  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  // reactHandler for replys not for post:
  const reactHandler = useCallback(
    name => {
      setReactType(name);

      // Handle className for like button in reply:
      ReactionClassHandler(name, setReactClass);

      // Send post reaction to DB:
      const reactBody = {
        reaction: name,
        postType: `${sharedPost ? 'shared' : 'post'}`,
      };

      let endPoint =
        comment && !reply
          ? `/reaction/post/${postId}/${commentId}`
          : reply && !comment
          ? `/reaction/post/${postId}/${commentId}/${replyId}`
          : null;
      axiosInstance
        .post(endPoint, reactBody, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
          dispatch(forceUpdateHandler(700000));
        })
        .catch(error => {});
    },
    [comment, commentId, dispatch, postId, reply, replyId, sharedPost]
  );

  // used to render reactions from DB, and it's put in a separate useEffect cause of problems related to dependencies:
  useEffect(() => {
    // for comments:
    // Handle incoming reaction from Data Base:
    if (!reactionClicked && curruntUserCommentReaction) {
      // if (curruntUserCommentReaction && !reactionClicked) {
      // Handle className and style for like button in post:
      ReactionClassHandler(curruntUserCommentReaction, setReactClass);

      // Set name or type for the reaction:
      setReactType(curruntUserCommentReaction);
    }

    // For replys:
    // Handle incoming reaction from Data Base:
    if (!reactionClicked && curruntUserReplyReaction) {
      // Handle className and style for like button in post:
      ReactionClassHandler(curruntUserReplyReaction, setReactClass);

      // Set name or type for the reaction:
      setReactType(curruntUserReplyReaction);
    }
  }, [curruntUserCommentReaction, curruntUserReplyReaction, reactionClicked]);

  useEffect(() => {
    if (reactType === '' && reactClass === '' && btnClicked) {
      reactHandler(`Like`);
      setReactType(`Like`);
      setReactClass('text-facebook-blue font-bold');
      setBtnClicked(!btnClicked);
    }

    if (
      (reactType === `Like` && btnClicked) ||
      (reactType !== '' && btnClicked)
    ) {
      setReactType('');
      setReactClass('');
      setBtnClicked(!btnClicked);
      reactHandler('', false);
    }
  }, [btnClicked, reactClass, reactHandler, reactType, t]);

  // For translation purpose only:
  let reactTypeTranslation;
  switch (reactType) {
    case 'Likes':
    case 'اعجبنى':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'اعجبنى' : 'Like';
      break;

    case 'Love':
    case 'احببته':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'احببته' : 'Love';

      break;

    case 'Care':
    case 'ادعمه':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'ادعمه' : 'Care';

      break;

    case 'Haha':
    case 'هاهاها':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'هاهاها' : 'Haha';

      break;

    case 'Wow':
    case 'واااو':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'واااو' : 'Wow';

      break;

    case 'Sad':
    case 'احزننى':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'احزننى' : 'Sad';

      break;

    case 'Angry':
    case 'اغضبنى':
      reactTypeTranslation = currentLanguageCode === 'ar' ? 'اغضبنى' : 'Angry';

      break;

    default:
      break;
  }

  return (
    <Fragment>
      <div className="flex justify-between mb-1 -ml-3  relative">
        <PostReactions
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
          containerClassName={containerClassName}
          careReplyClassName={'lg:w-52 hover:lg:w-60'}
          reactionsFullScreenClassName={
            reactionsFullScreenClassName && ' -ml-5 -mt-8 '
          }
          // For the heart reaction size and position:
          postsProfile={postsProfile}
        />
      </div>

      <button
        type="button"
        className={'hover:underline underline-offset-2 ' + reactClass}
        onMouseOver={() => {
          setTimeout(() => {
            setVisible(true);
          }, 800);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setVisible(false);
          }, 300);
        }}
        onClick={() => {
          setReactionClicked(false);
          setBtnClicked(!btnClicked);
          setVisible(false);
        }}
      >
        {reactTypeTranslation ? reactTypeTranslation : `${t('reactName1')}`}
      </button>
    </Fragment>
  );
};

export default ReplyLikeButton;
