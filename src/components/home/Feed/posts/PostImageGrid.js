import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const PostImageGrid = ({
  reverseDirection,
  postImage,
  fullScreenClassName,
  containerClassName,
  imageContainerClassName,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        'cursor-pointer relative ' + containerClassName && containerClassName
      }
    >
      {
        // Makeing image grid system:
        //
        // Handling first image in the array or array with only one image:
      }
      {postImage?.map((img, idx) =>
        postImage?.length === 1 ? (
          <div
            key={idx}
            className={imageContainerClassName && imageContainerClassName}
          >
            <img
              key={idx}
              src={img}
              className={`grid grid-flow-row grid-cols-1 grid-rows-1 w-full h-full ${
                reverseDirection && 'mb-3 -mt-4 rounded-t-lg'
              } ${fullScreenClassName}`}
              alt="img"
            />
          </div>
        ) : postImage?.length === 3 && !fullScreenClassName ? (
          idx === 0 ? (
            <div
              key={idx}
              className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4'
              }`}
            >
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-lg"
                alt="img"
              />
            </div>
          ) : (
            ''
          )
        ) : postImage?.length > 3 && !fullScreenClassName ? (
          idx === 0 ? (
            <div
              key={idx}
              className={`mb-3 grid grid-flow-row grid-cols-1 grid-rows-1 ${
                reverseDirection && 'mb-3 -mt-4'
              }`}
            >
              <img
                key={idx}
                src={img}
                className="w-full h-full rounded-t-lg"
                alt="img"
              />
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )
      )}

      {
        // Handling images more than one in array having three or more images or array with only two images and hide all of them in fullScreen mode:
      }
      {!fullScreenClassName && (
        <Fragment>
          <div
            className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
              reverseDirection && 'rounded-t-lg'
            }`}
          >
            {postImage?.map(
              (img, idx) =>
                postImage?.length === 2 && (
                  <img
                    key={idx}
                    src={img}
                    className="w-full h-full rounded-t-md"
                    alt="img"
                  />
                )
            )}
          </div>

          <div
            className={`grid grid-flow-row grid-cols-2 grid-rows-1 gap-3 ${
              reverseDirection && 'rounded-t-lg'
            }`}
          >
            {postImage?.map(
              (img, idx) =>
                postImage?.length === 3 &&
                idx !== 0 && (
                  <img
                    key={idx}
                    src={img}
                    className="w-full h-full"
                    alt="img"
                  />
                )
            )}
          </div>

          <div
            className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 ${
              reverseDirection && 'rounded-t-lg'
            }`}
          >
            {postImage?.map(
              (img, idx) =>
                postImage?.length === 4 &&
                idx !== 0 && (
                  <img
                    key={idx}
                    src={img}
                    className="w-full h-full"
                    alt="img"
                  />
                )
            )}
          </div>

          <div
            className={`grid grid-flow-row grid-cols-3 grid-rows-1 gap-3 relative ${
              reverseDirection && 'rounded-t-lg'
            }`}
          >
            {postImage?.map((img, idx) => (
              <Fragment key={idx}>
                {postImage?.length > 4 && idx > 0 && idx < 4 && (
                  <Fragment>
                    <img
                      key={idx}
                      src={img}
                      className="w-full h-full"
                      alt="img"
                    />
                    {idx === 3 && (
                      <span className="absolute right-14 top-8 -mr-0.5 md:right-16 md:top-9 lg:right-24 lg:-mr-1 lg:top-14 text-white font-bold">
                        {`+ ${postImage?.length - 3}`}
                      </span>
                    )}
                  </Fragment>
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}

      {
        // Carousel for images with length more than two in fullScreen mode:
      }
      {fullScreenClassName && postImage?.length > 1 && (
        <div
          id="fullScreenModeCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner relative w-full overflow-hidden">
            {postImage?.map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item relative float-left w-full  md:h-full ${
                  idx === 0 && 'active'
                }`}
              >
                <img
                  width="1600"
                  height="707"
                  src={img}
                  className="block  md:max-h-96 "
                  alt="Wild Landscape"
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0 "
            type="button"
            data-bs-target="#fullScreenModeCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">{t('Previous')}</span>
          </button>
          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0 "
            type="button"
            data-bs-target="#fullScreenModeCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">{t('Next')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostImageGrid;
