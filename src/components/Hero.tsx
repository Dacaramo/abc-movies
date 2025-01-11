import React from 'react';
import HeartIcon from './HeartIcon';

const Hero = () => {
  return (
    <div
      className='relative w-full min-h-[50vh] flex flex-col gap-2 justify-end items-start p-8 text-white'
      style={{
        backgroundImage:
          'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
      <div className='z-50 flex flex-row gap-2 items-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-5xl'>Movie</h1>
          <p className='text-2xl'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <HeartIcon className='text-2xl' />
          <div
            className='radial-progress text-secondary font-bold'
            style={{ '--value': 70, '--thickness': '5px' }}
            role='progressbar'
          >
            <span className='text-neutral'>70%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
