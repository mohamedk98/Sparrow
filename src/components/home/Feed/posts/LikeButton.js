import React, { useEffect, useMemo, useState } from 'react';

import likePNG from './../../../../assets/reacts/like.png';
import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import careSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';
import ReactionClassHandler from './ReactionClasses';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const LikeButton = ({
  reactType,
  setReactType,
  reactionClicked,
  reactClass,
  setReactClass,
  setVisible,
  setReactionClicked,
  data,
  userID,
  reactHandler,
  sharedPost,
  sharedPostData,
  fullScreenReactionClassName,
  // For like button position in profile page:
  postsProfile,
}) => {
  const {t}=useTranslation();
  // For rerender:
  const dispatch = useDispatch();

  // Reaction from API for current user:
  const userReaction = (sharedPost ? sharedPostData : data)?.reactions?.filter(
    reaction => reaction?.userId?._id === userID
  )[0]?.reaction;

  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Reaction src attribute set:
  const [reactTypeSRC, setReactTypeSRC] = useState(likePNG);

  const reactTypeSVG = useMemo(
    () => [
      { name: `${t('reactName1')}`, svg: likeSVG },
      { name: `${t('reactName2')}`, svg: loveSVG },
      { name: `${t('reactName3')}`, svg: careSVG },
      { name: `${t('reactName4')}`, svg: hahaSVG },
      { name: `${t('reactName5')}`, svg: wowSVG },
      { name: `${t('reactName6')}`, svg: sadSVG },
      { name: `${t('reactName7')}`, svg: angrySVG },
    ],
    []
  );

  const svgPicker = reactTypeSVG.filter(react => {
    return react.name === reactType;
  })[0];

  // used to render reactions from DB, and it's put in a separate useEffect cause of problems related to dependencies:
  useEffect(() => {
    // Handle incoming reaction from Data Base:
    if (!reactionClicked) {
      // if (userReaction && !reactionClicked) {
      // Handle className and style for like button in post:
      ReactionClassHandler(userReaction, setReactClass,t);

      // Set name or type for the reaction:
      setReactType(userReaction);

      // set SVG for the reaction:
      setReactTypeSRC(
        userReaction === `${t('reactName1')}`
          ? likeSVG
          : userReaction === `${t('reactName2')}`
          ? loveSVG
          : userReaction === `${t('reactName3')}`
          ? careSVG
          : userReaction === `${t('reactName4')}`
          ? hahaSVG
          : userReaction ===  `${t('reactName5')}`
          ? wowSVG
          : userReaction === `${t('reactName6')}`
          ? sadSVG
          : userReaction === `${t('reactName7')}`
          ? angrySVG
          : likePNG
      );
    }
  }, [reactionClicked, setReactClass, setReactType, userReaction]);

  useEffect(() => {
    reactionClicked && setReactTypeSRC(svgPicker?.svg);

    if (
      reactType === '' &&
      reactClass === '' &&
      reactTypeSRC === likePNG &&
      btnClicked
    ) {
      setReactType( `${t('reactName1')}`);
      setReactTypeSRC(likeSVG);
      setReactClass('text-indigo-500 font-bold');
      setBtnClicked(!btnClicked);
      reactHandler( `${t('reactName1')}`);
    }

    if (
      (reactType === `${t('reactName1')}` && reactTypeSRC === likeSVG && btnClicked) ||
      (reactType !== '' && reactTypeSRC === svgPicker?.svg && btnClicked)
    ) {
      setReactType('');
      setReactTypeSRC(likePNG);
      setReactClass('');
      setBtnClicked(!btnClicked);
      reactHandler('', false);
    }

    dispatch(forceUpdateHandler(100000));
  }, [
    btnClicked,
    dispatch,
    reactClass,
    reactHandler,
    reactType,
    reactTypeSRC,
    reactionClicked,
    setReactClass,
    setReactType,
    svgPicker?.svg,
    userReaction,
  ]);

  return (
    <button
      type="button"
      className={
        `btn flex hover:bg-gray-100 justify-center py-2 my-1 px-8 md:px-11 ${
          postsProfile && 'lg:px-5 hover:lg:px-5 hover:lg:mx-9'
        } lg:px-14 rounded-lg ` +
        reactClass +
        ' ' +
        fullScreenReactionClassName
      }
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
      onClick={() => {
        setReactionClicked(false);
        setBtnClicked(!btnClicked);
      }}
    >
      <div className="mt-0.5 mr-2 text-xl w-5">
        <img
          className="w-full h-full"
          src={reactTypeSRC}
          alt={`${reactTypeSRC} reaction`}
        />
      </div>
      {reactType ? reactType : `${t('reactName1')}`}
    </button>
  );
};

export default LikeButton;
