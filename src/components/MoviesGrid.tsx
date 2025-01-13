'use client';

import { getMovies } from '@/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import MovieCard from './MovieCard';

const MoviesGrid = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const searchParams = useSearchParams();

  const { query } = Object.fromEntries(searchParams.entries()) as {
    query?: string;
  };

  const {
    data: paginatedResponse,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['getMovies', query, page],
    enabled: query !== undefined,
    queryFn: async () => {
      return await getMovies({ page: page + 1 }, query!);
    },
    staleTime: Infinity,
    gcTime: 1800000,
  });

  const handleClickOnPage = (e: { selected: number }) => {
    document.documentElement.scrollTop = 0;
    setPage(e.selected);
  };

  const mustShowLoadingSkeleton =
    isFetching && paginatedResponse?.results === undefined;
  const mustShowMovies =
    isFetched &&
    paginatedResponse?.results !== undefined &&
    paginatedResponse?.results.length > 0;

  console.log('@@@@@paginatedResponse', paginatedResponse);

  useEffect(() => {
    if (paginatedResponse) {
      setTotalPages(paginatedResponse.total_pages);
    }
  }, [paginatedResponse]);

  return (
    <div className='flex flex-col gap-8'>
      <h2
        id='title'
        className='text-3xl sm:text-start text-center font-bold'
      >
        {paginatedResponse
          ? `Showing ${paginatedResponse.total_results} results matching "${query}"`
          : `Showing results matching ${query}`}
      </h2>
      <ul className='h-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8'>
        <AnimatePresence mode='popLayout'>
          {mustShowMovies &&
            paginatedResponse.results.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              );
            })}
        </AnimatePresence>
        {mustShowLoadingSkeleton &&
          [...new Array(25)].map((_, i) => {
            return (
              <li
                key={i}
                className='skeleton h-[452px] min-w-[250px]'
              />
            );
          })}
      </ul>
      {totalPages && totalPages > 0 && (
        <ReactPaginate
          className='flex flex-row gap-1 justify-center mt-[25px] mb-[50px]'
          previousLinkClassName={'btn btn-sm btn-ghost p-1 font-normal'}
          pageLinkClassName={'btn btn-sm min-w-[20px] p-1'}
          nextLinkClassName={'btn btn-sm btn-ghost p-1 font-normal'}
          activeLinkClassName={'btn btn-sm btn-primary '}
          breakClassName='font-nunito text-lg'
          previousLabel={'Prev'}
          breakLabel='...'
          nextLabel={'Next'}
          onPageChange={handleClickOnPage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          forcePage={page}
          pageCount={totalPages}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default MoviesGrid;
