'use client';

import React from 'react';
import UserIcon from './UserIcon';
import LeftCircleArrowIcon from './LeftCircleArrowIcon';

const AuthModal = () => {
  const handleClickOnOpenModalButton = () => {
    document?.getElementById('auth_modal')?.showModal();
  };

  return (
    <>
      <button
        className='btn'
        onClick={handleClickOnOpenModalButton}
      >
        <UserIcon className='text-2xl ml-auto' />
      </button>
      <dialog
        id='auth_modal'
        className='modal'
      >
        <div className='modal-box bg-amber-400'>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn flex flex-row gap-1 justify-center items-center'>
                <LeftCircleArrowIcon />
                <span>Back</span>
              </button>
            </form>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col gap-2'>
              <div className='join'>
                <input
                  className='join-item btn'
                  type='radio'
                  name='options'
                  aria-label='Radio 1'
                />
                <input
                  className='join-item btn'
                  type='radio'
                  name='options'
                  aria-label='Radio 2'
                />
                <input
                  className='join-item btn'
                  type='radio'
                  name='options'
                  aria-label='Radio 3'
                />
              </div>
            </div>
            <div className=''></div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AuthModal;
