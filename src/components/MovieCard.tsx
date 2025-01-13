'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEvent } from 'react';
import RadialProgress from './RadialProgress';
import HeartIcon from './HeartIcon';
import getFormattedDate from '@/utils/getFormattedDate';
import { SuperficialMovie } from '@/model/Movie';
import { useGlobalStore } from './GlobalStoreProvider';
import cn from 'classnames';
import useIsAlreadyInFavorites from '@/hooks/useIsAlreadyInFavorites';
import { motion } from 'framer-motion';

interface Props {
  movie: SuperficialMovie;
}

const MovieCard: FC<Props> = ({ movie }) => {
  const { addFavorite, removeFavorite } = useGlobalStore((state) => {
    return state;
  });

  const isAlreadyInFavorites = useIsAlreadyInFavorites(movie.id);

  const handleClickOnHeartButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isAlreadyInFavorites) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.li
      layout
      className='min-w-[250px] bg-base-200 rounded-lg'
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/movies/${movie.id}#title`}
        className='flex flex-col justify-center items-center text-center'
      >
        <div className='w-full bg-black rounded-t-lg flex justify-center items-center'>
          <Image
            width={300}
            height={300}
            className='rounded-t-lg aspect-square object-contain bg-black flex justify-center items-center'
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/w300${movie.poster_path}`}
            alt={`${movie.title}🎞️`}
          />
        </div>
        <div className='w-full flex flex-col gap-2 p-4'>
          <span className='font-bold'>{movie.title}</span>
          <span className='opacity-50'>
            {getFormattedDate(movie.release_date, 'en-US')}
          </span>
          <div className='w-full flex flex-row justify-evenly items-stretch'>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <span>Rating</span>
              <RadialProgress
                progressPercentage={Math.round(movie.vote_average * 10)}
                className='bg-neutral-content'
                size='50px'
              />
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <span>Favorites</span>
              <div className='flex-1 w-full flex justify-center items-center'>
                <button
                  type='button'
                  onClick={handleClickOnHeartButton}
                >
                  <HeartIcon
                    className={cn(
                      'text-3xl hover:text-4xl transition-all duration-300',
                      {
                        'text-neutral-content': !isAlreadyInFavorites,
                        'text-accent': isAlreadyInFavorites,
                      }
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

export default MovieCard;
