'use client';

import { DetailedMovie } from '@/model/Movie';
import { FC } from 'react';
import RadialProgress from './RadialProgress';
import getFormattedDate from '@/utils/getFormattedDate';
import { useGlobalStore } from './GlobalStoreProvider';
import useIsAlreadyInFavorites from '@/hooks/useIsAlreadyInFavorites';
import HeartIcon from './HeartIcon';
import cn from 'classnames';

interface Props {
  movie: DetailedMovie;
}

const MovieDetailsCard: FC<Props> = ({ movie }) => {
  const { addFavorite, removeFavorite } = useGlobalStore((state) => {
    return state;
  });
  const isAlreadyInFavorites = useIsAlreadyInFavorites(movie.id);

  const handleClickOnHeartButton = () => {
    if (isAlreadyInFavorites) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className='w-full flex flex-col justify-between gap-2 rounded-lg bg-base-200'>
      <div className='flex flex-col gap-2 p-4'>
        <span>
          <span className='font-bold'>Original language:</span>{' '}
          {movie.original_language.toUpperCase()}
        </span>
        <span>
          <span className='font-bold'>Original title:</span>{' '}
          {movie.original_title}
        </span>
        <span>
          <span className='font-bold'>Release date:</span>{' '}
          {getFormattedDate(movie.release_date, 'en-US')}
        </span>
        <span>
          <span className='font-bold'>Number of reviews:</span>{' '}
          {movie.vote_count}
        </span>
        <span>
          <span className='font-bold'>Genres:</span>{' '}
          {movie.genres.map(({ name }) => name).join(', ')}
        </span>
      </div>
      <div className='w-full flex flex-row justify-evenly items-stretch bg-base-300 p-4 rounded-b-lg'>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <span className='font-bold'>Rating</span>
          <RadialProgress
            progressPercentage={Math.round(movie.vote_average * 10)}
            className='bg-[rgba(0,0,0,0.25)]'
            size='50px'
          />
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <span className='font-bold'>Favorites</span>
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
  );
};

export default MovieDetailsCard;
