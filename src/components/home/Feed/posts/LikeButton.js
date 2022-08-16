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
      { name: 'Like', svg: likeSVG },
      { name: 'Love', svg: loveSVG },
      { name: 'Care', svg: careSVG },
      { name: 'Haha', svg: hahaSVG },
      { name: 'Wow', svg: wowSVG },
      { name: 'Sad', svg: sadSVG },
      { name: 'Angry', svg: angrySVG },
    ],
    []
  );

  const svgPicker = reactTypeSVG.filter(react => {
    return react.name === reactType;
  })[0];

  // used to render reactions from DB, and it's put in a separate useEffect cause of problems related to dependencies:
  useEffect(() => {
    // Handle incoming reaction from Data Base:
    if (userReaction && !reactionClicked) {
      // Handle className and style for like button in post:
      ReactionClassHandler(userReaction, setReactClass);

      // Set name or type for the reaction:
      setReactType(userReaction);

      // set SVG for the reaction:
      setReactTypeSRC(
        userReaction === 'Like'
          ? likeSVG
          : userReaction === 'Love'
          ? loveSVG
          : userReaction === 'Care'
          ? careSVG
          : userReaction === 'Haha'
          ? hahaSVG
          : userReaction === 'Wow'
          ? wowSVG
          : userReaction === 'Sad'
          ? sadSVG
          : userReaction === 'Angry'
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
      setReactType('Like');
      setReactTypeSRC(likeSVG);
      setReactClass('text-facebook-blue font-bold');
      setBtnClicked(!btnClicked);
      reactHandler('Like');
    }

    if (
      (reactType === 'Like' && reactTypeSRC === likeSVG && btnClicked) ||
      (reactType !== '' && reactTypeSRC === svgPicker?.svg && btnClicked)
    ) {
      setReactType('');
      setReactTypeSRC(likePNG);
      setReactClass('');
      setBtnClicked(!btnClicked);
      reactHandler('', false);
    }
  }, [
    btnClicked,
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
      {reactType ? reactType : 'Like'}
    </button>
  );
};

export default LikeButton;
