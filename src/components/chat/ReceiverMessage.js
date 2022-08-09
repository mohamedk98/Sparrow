import React from 'react';

function ReceiverMessage(props) {
  return (
    <div className="flex  " key={Math.random()}>
      <p
        className=" flex-wrap rounded-2xl py-3 px-5 text-white mx-2 my-2 bg-gray-500 "
        style={{ backgroundColor: 'rgb(107 114 128)' }}
      >
        {props.message}
      </p>
    </div>
  );
}

export default ReceiverMessage;
