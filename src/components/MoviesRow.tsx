'use client';

import { useMoviesByCategory } from '@/hooks/useMoviesByCategory';
import { FC, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { useGlobalStore } from './GlobalStoreProvider';
import { SuperficialMovie } from '@/model/Movie';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';

export type MovieCategory =
  | 'popular'
  | 'now-playing'
  | 'upcoming'
  | 'top-rated'
  | 'favorites';

interface Props {
  categoryId: MovieCategory;
  categoryName: string;
}

const MoviesRow: FC<Props> = ({ categoryId, categoryName }) => {
  const {
    movies,
    isFetching,
    isFetched,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMoviesByCategory(categoryId);
  const { favorites } = useGlobalStore((state) => state);

  const reachForNextPageElementRef = useRef<HTMLLIElement | null>(null);

  /**
   * For some reason the TMDB API can return the same movie in different pages of the same category (that's definitively a bug from TMDB)
   */
  const moviesWithoutAPIbug = movies
    ? Array.from(
        new Map(
          movies.map((movie) => {
            return [movie.id, movie];
          })
        ).values()
      )
    : undefined;

  const moviesToShow =
    categoryId !== 'favorites' ? moviesWithoutAPIbug : favorites;
  const mustShowLoadingSkeleton =
    categoryId !== 'favorites'
      ? isFetching && moviesToShow === undefined
      : false;
  const mustShowMovies =
    categoryId !== 'favorites'
      ? isFetched && moviesToShow !== undefined && moviesToShow.length > 0
      : moviesToShow !== undefined && moviesToShow.length > 0;

  useEffect(() => {
    if (categoryId === 'favorites') return;

    const reachForNextPageElement = reachForNextPageElementRef.current;

    if (!reachForNextPageElement) return;

    const observer = new IntersectionObserver((entries) => {
      const reachForNextPageElementEntry = entries[0];
      if (reachForNextPageElementEntry.isIntersecting && !isFetchingNextPage) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });

    observer.observe(reachForNextPageElement);

    return () => {
      observer.unobserve(reachForNextPageElement);
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, categoryId]);

  return (
    <div className='flex flex-col gap-4'>
      <h2
        id={categoryId}
        className='text-3xl font-bold'
      >
        {categoryName}
      </h2>
      <div className='relative'>
        {(mustShowMovies === true || mustShowLoadingSkeleton === true) && (
          <>
            <div className='absolute top-0 left-0 sm:w-10 w-3 h-full bg-gradient-to-r from-base-100 to-transparent z-100' />
            <div className='absolute top-0 right-0 sm:w-10 w-3 h-full bg-gradient-to-l from-base-100 to-transparent z-100' />
          </>
        )}
        <ul className='flex flex-row flex-nowrap gap-8 justify-start items-stretch overflow-x-scroll'>
          <AnimatePresence mode='popLayout'>
            {mustShowMovies &&
              moviesToShow!.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie as SuperficialMovie}
                  />
                );
              })}
          </AnimatePresence>
          {mustShowLoadingSkeleton &&
            [...new Array(10)].map((_, i) => {
              return (
                <li
                  key={i}
                  className='skeleton h-[452px] min-w-[250px]'
                />
              );
            })}
          {mustShowMovies === false && mustShowLoadingSkeleton === false && (
            <span className='w-full text-start'>
              There are no movies in this category yet
            </span>
          )}
          <li
            ref={reachForNextPageElementRef}
            key={'reach-for-next-page-element'}
            className={cn('skeleton h-[452px] min-w-[250px]', {
              hidden: !hasNextPage,
            })}
          />
        </ul>
      </div>
    </div>
  );
};

export default MoviesRow;
