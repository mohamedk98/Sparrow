import React, { useEffect, useMemo, useState } from 'react';

import likePNG from './../../../../assets/reacts/like.png';
import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import heartSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';

const LikeButton = ({
  reactType,
  setReactType,
  reactionClicked,
  reactClass,
  setReactClass,
  setVisible,
}) => {
  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Reaction src attribute set:
  const [reactTypeSRC, setReactTypeSRC] = useState(likePNG);

  const reactTypeSVG = useMemo(
    () => [
      { name: 'Like', svg: likeSVG },
      { name: 'Love', svg: loveSVG },
      { name: 'Care', svg: heartSVG },
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

  useEffect(() => {
    reactionClicked && setReactTypeSRC(svgPicker?.svg);
    console.log(reactType);
  }, [reactType, reactionClicked, svgPicker]);

  return (
    <button
      type="button"
      className={
        'btn flex hover:bg-gray-100 justify-center py-2 my-1 px-14 rounded-lg ' +
        reactClass
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
        setReactType(!btnClicked ? 'Like' : '');
        // console.log(btnClicked);
        setReactTypeSRC(
          reactType === 'Like' && (btnClicked || reactionClicked)
            ? likePNG
            : likeSVG
        );
        setBtnClicked(!btnClicked);

        setReactClass(!btnClicked ? 'text-facebook-blue font-bold' : '');
      }}
    >
      <div className="mt-0.5 mr-2 text-xl w-5">
        <img
          className="w-full"
          src={reactTypeSRC ? reactTypeSRC : likePNG}
          alt=""
        />
      </div>
      {reactType ? reactType : 'Like'}
    </button>
  );
};

export default LikeButton;
