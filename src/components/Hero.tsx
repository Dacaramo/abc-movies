'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeartIcon from './HeartIcon';
import RadialProgress from './RadialProgress';
import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '@/axiosClient';
import { SuperficialMovie } from '@/model/Movie';
import useIsAlreadyInFavorites from '@/hooks/useIsAlreadyInFavorites';
import { useGlobalStore } from './GlobalStoreProvider';
import cn from 'classnames';

const Hero = () => {
  const [currentMovie, setCurrentMovie] = useState<SuperficialMovie | null>(
    null
  );

  const queryResult = useQuery({
    queryKey: ['getHeroMovies'],
    queryFn: async () => {
      return await getNowPlayingMovies({ page: 1 });
    },
    staleTime: Infinity,
    gcTime: 3600000,
  });
  const isAlreadyInFavorites = useIsAlreadyInFavorites(currentMovie?.id ?? 0);
  const { addFavorite, removeFavorite } = useGlobalStore((state) => state);
  const getRandomMovie = useCallback(() => {
    if (queryResult.data?.results) {
      const randomIndex = Math.floor(
        Math.random() * queryResult.data.results.length
      );
      return queryResult.data.results[randomIndex];
    }
    return null;
  }, [queryResult]);

  const handleClickOnHeartButton = () => {
    if (!currentMovie) return;

    if (isAlreadyInFavorites) {
      removeFavorite(currentMovie.id);
    } else {
      addFavorite(currentMovie);
    }
  };

  useEffect(() => {
    if (queryResult.data?.results) {
      setCurrentMovie(getRandomMovie());

      const intervalId = setInterval(() => {
        setCurrentMovie(getRandomMovie());
      }, 20000);

      return () => clearInterval(intervalId);
    }
  }, [queryResult.data]);

  if (!currentMovie) {
    return <div className='skeleton w-full min-h-[45vh]' />;
  }

  return (
    <motion.div
      key={currentMovie.id}
      className='relative w-full min-h-[45vh] flex flex-col gap-2 justify-end items-start p-8 bg-cover bg-center overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_URL}/w1280${currentMovie.backdrop_path})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <div className='absolute inset-0 sm:bg-gradient-to-t sm:from-black sm:to-transparent sm:bg-transparent bg-[rgba(0,0,0,0.75)]' />
      <motion.div
        className='w-full z-50 flex flex-row gap-2 justify-between items-end'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className='flex flex-col gap-2'>
          <motion.h1
            className='sm:text-5xl text-xl font-bold'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {currentMovie.title}
          </motion.h1>
          <motion.p
            className='sm:text-2xl text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {currentMovie.overview}
          </motion.p>
        </div>
        <motion.div
          className='flex sm:flex-row flex-col gap-2 justify-center items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <div className='w-[50px] h-[50px] flex justify-center items-center'>
            <button
              type='button'
              onClick={handleClickOnHeartButton}
            >
              <HeartIcon
                className={cn(
                  'text-3xl hover:text-accent hover:text-4xl transition-all duration-500',
                  {
                    'text-base-content': !isAlreadyInFavorites,
                    'text-accent': isAlreadyInFavorites,
                  }
                )}
              />
            </button>
          </div>
          <RadialProgress
            progressPercentage={Math.round(currentMovie.vote_average * 10)}
            className='bg-black'
            size='100px'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
