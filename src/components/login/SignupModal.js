import React, { Fragment } from 'react';

const SignupModal = ({
  SignupOrResetLoginFormComponent,
  h1,
  h6,
  // To show or hide modal:
  showModal,
  setShowModal,
}) => {
  return (
    <Fragment>
      {showModal && (
        <Fragment>
          <div className="fixed top-0 left-0  w-3/4 ml-16 md:w-full md:ml-0 h-full outline-none overflow-x-hidden overflow-y-auto z-20">
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <div>
                    <h1 className=" font-bold text-3xl">{h1}</h1>
                    <h6 className="">{h6}</h6>
                  </div>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body relative p-4">
                  {SignupOrResetLoginFormComponent}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-10 bg-black"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SignupModal;
