import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
        <div className="
          spinner-border
          animate-spin
          inline-block
          w-8
          h-8
          border-4
          rounded-full
          text-purple-500
        " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        
      </div>
    );
}

export default Loader;
