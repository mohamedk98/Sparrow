import React from 'react';

function SenderMessage(props) {
  return (
    <div className="flex justify-end" key={Math.random()}>
      <p
        className=" flex-wrap rounded-2xl py-3 px-5 my-2 text-white mx-2  "
        style={{ backgroundColor: 'rgb(59 130 246)' }}
      >
        {props.message}
      </p>
    </div>
  );
}

export default SenderMessage;
