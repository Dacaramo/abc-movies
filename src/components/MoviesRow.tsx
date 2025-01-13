'use client';

import { useMoviesByCategory } from '@/hooks/useMoviesByCategory';
import { FC, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { useGlobalStore } from './GlobalStoreProvider';
import { SuperficialMovie } from '@/model/Movie';
import { AnimatePresence } from 'framer-motion';

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

  // const reachForNextPageElementRef = useRef<HTMLLIElement | null>(null);

  const moviesToShow = categoryId !== 'favorites' ? movies : favorites;
  const mustShowLoadingSkeleton =
    categoryId !== 'favorites'
      ? isFetching && moviesToShow === undefined
      : false;
  const mustShowMovies =
    categoryId !== 'favorites'
      ? isFetched && moviesToShow !== undefined && moviesToShow.length > 0
      : moviesToShow !== undefined && moviesToShow.length > 0;

  // useEffect(() => {
  //   if (categoryId === 'favorites') return;

  //   const reachForNextPageElement = reachForNextPageElementRef.current;

  //   if (!reachForNextPageElement) return;

  //   const observer = new IntersectionObserver((entries) => {
  //     console.log('INSIDE INTERSECTION OBSERVER');

  //     const reachForNextPageElementEntry = entries[0];
  //     if (reachForNextPageElementEntry.isIntersecting && !isFetchingNextPage) {
  //       console.log('INTERSECTING');
  //       if (hasNextPage) {
  //         console.log('BRINGING NEXT PAGE');
  //         fetchNextPage();
  //       }
  //     }
  //   });

  //   observer.observe(reachForNextPageElement);

  //   return () => {
  //     observer.unobserve(reachForNextPageElement);
  //   };
  // }, [
  //   isFetchingNextPage,
  //   hasNextPage,
  //   fetchNextPage,
  //   categoryId,
  //   mustShowLoadingSkeleton,
  //   mustShowMovies,
  //   moviesToShow,
  // ]);

  // console.log('@@@@@reachForNextPageElementRef', reachForNextPageElementRef);

  return (
    <div className='flex flex-col gap-4'>
      <h2
        id={categoryId}
        className='text-3xl font-bold'
      >
        {categoryName}
      </h2>
      {mustShowMovies === true || mustShowLoadingSkeleton === true ? (
        <div className='relative'>
          <div className='absolute top-0 left-0 sm:w-10 w-3 h-full bg-gradient-to-r from-base-100 to-transparent z-10'></div>
          <div className='absolute top-0 right-0 sm:w-10 w-3 h-full bg-gradient-to-l from-base-100 to-transparent z-10'></div>
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
              {/* {hasNextPage && categoryId !== 'favorites' && (
                <li
                  ref={reachForNextPageElementRef}
                  key={'reach-for-next-page-element'}
                  className='skeleton h-[452px] min-w-[250px]'
                />
              )} */}
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
          </ul>
        </div>
      ) : (
        <span>There are no movies in this category yet</span>
      )}
    </div>
  );
};

export default MoviesRow;
