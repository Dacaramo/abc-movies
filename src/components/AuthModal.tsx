'use client';

import UserIcon from './UserIcon';
import LeftCircleArrowIcon from './LeftCircleArrowIcon';
import { useState } from 'react';

type AuthMode = 'signup' | 'login';

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  const handleClickOnOpenModalButton = () => {
    const modal = document.getElementById('auth_modal') as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <>
      <button
        onClick={handleClickOnOpenModalButton}
        className='btn btn-ghost btn-circle'
      >
        <UserIcon className='h-6 w-6 hover:text-primary transition-colors duration-300' />
      </button>

      <dialog
        id='auth_modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box p-0 bg-gradient-to-br from-neutral-900 to-neutral-800'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='p-6 relative'>
              <form method='dialog'>
                <button className='btn btn-ghost btn-sm absolute left-4 top-2 gap-2'>
                  <LeftCircleArrowIcon className='h-4 w-4' />
                  Back
                </button>
              </form>

              <div className='flex flex-col items-center justify-center h-full mt-12'>
                <div className='join bg-neutral-800 rounded-lg p-1 w-full max-w-sm'>
                  <input
                    type='radio'
                    name='auth-mode'
                    className='join-item btn flex-1'
                    aria-label='Sign up'
                    checked={authMode === 'signup'}
                    onChange={() => setAuthMode('signup')}
                  />
                  <input
                    type='radio'
                    name='auth-mode'
                    className='join-item btn flex-1'
                    aria-label='Log In'
                    checked={authMode === 'login'}
                    onChange={() => setAuthMode('login')}
                  />
                </div>
                <div className='mt-8 w-full max-w-sm'>
                  {authMode === 'signup' ? (
                    <div className='form-control'>
                      <button
                        type='button'
                        className='btn btn-primary'
                      >
                        Register with your email
                      </button>
                    </div>
                  ) : (
                    <div className='form-control gap-4'>
                      <input
                        type='text'
                        placeholder='Username'
                        className='input input-bordered bg-neutral-800 border-neutral-700 w-full'
                      />
                      <input
                        type='password'
                        placeholder='Password'
                        className='input input-bordered bg-neutral-800 border-neutral-700 w-full'
                      />
                      <button className='btn btn-warning w-full'>
                        Continue
                      </button>
                      <p className='text-center text-sm text-neutral-400'>
                        We are having you back
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className='p-8 hidden md:block'>
              <div className='h-full flex flex-col justify-center'>
                <h2 className='text-3xl font-bold mb-4'>
                  {authMode === 'signup'
                    ? 'Welcome to ABCmovies!'
                    : 'Welcome back to ABCmovies!'}
                </h2>
                <p className='text-neutral-400'>
                  {authMode === 'signup'
                    ? '🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!'
                    : '🎬 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <form
          method='dialog'
          className='modal-backdrop'
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
