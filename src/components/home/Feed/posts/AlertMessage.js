import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { alertHandler } from '../../../../store/userSlice/NewsFeedSlice';
function AlertMessage({ alert }) {
  console.log(alert);

  const dispatch = useDispatch();

  setTimeout(() => dispatch(alertHandler({ showAlert: false })), 3000);

  return (
    <Fragment>
      {alert?.showAlert && (
        <div
          className={`${
            alert?.statusCode === 200 ? 'bg-green-100' : 'bg-yellow-100'
          } rounded-lg py-5 px-6 mb-3 text-base ${
            alert?.statusCode === 200 ? 'text-green-700' : 'text-yellow-700'
          } inline-flex items-center w-full`}
          role="alert"
        >
          {alert?.statusCode === 200 ? (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              className="w-4 h-4 mr-2 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exclamation-triangle"
              className="w-4 h-4 mr-2 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
              ></path>
            </svg>
          )}

          {alert?.message}
          <button
            type="button"
            className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"
            onClick={() => dispatch(alertHandler({ showAlert: false }))}
          ></button>
        </div>
      )}
    </Fragment>
  );
}

export default AlertMessage;
