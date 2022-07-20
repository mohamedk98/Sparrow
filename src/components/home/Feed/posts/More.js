import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const More = ({
  text,
  text2,
  containerClassName,
  iconClassName,
  liNum1,
  liNum2,
  tooltipData,
}) => {
  return (
    <div className={containerClassName} data-title={tooltipData}>
      <a
        className="dropdown-toggle flex items-center hidden-arrow"
        href="/"
        id="dropdownMenuButton2"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="w-10">
          <BiDotsHorizontalRounded
            className={'hover:bg-zinc-100 rounded-full p-1 ' + iconClassName}
          />
        </div>
      </a>
      <ul
        className="
dropdown-menu min-w-max absolute hidden bg-white text-base z-50 py-2 px-3 rounded-lg shadow-lg mt-1 m-0 left-auto right-0"
      >
        {liNum1 && (
          <li className="dropdown-item text-sm py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            {text}
          </li>
        )}

        {liNum2 && (
          <li className="dropdown-item text-sm py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            {text2}
          </li>
        )}
      </ul>
    </div>
  );
};

export default More;
