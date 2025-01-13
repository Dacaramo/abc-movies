import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/axiosClient';
import { MovieCategory } from '@/components/MoviesRow';
import { SuperficialMovie } from '@/model/Movie';
import { PaginatedResponse } from '@/model/Other';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMoviesByCategory = (categoryId: MovieCategory) => {
  const queryResult = useInfiniteQuery({
    enabled: categoryId !== 'favorites',
    queryKey: ['getMoviesByCategory', categoryId],
    queryFn: async ({ pageParam }) => {
      switch (categoryId) {
        case 'popular':
          return await getPopularMovies({ page: pageParam });
        case 'now-playing':
          return await getNowPlayingMovies({ page: pageParam });
        case 'upcoming':
          return await getUpcomingMovies({ page: pageParam });
        case 'top-rated':
          return await getTopRatedMovies({ page: pageParam });
        default:
          throw Error(
            `Invalid category: The ${categoryId} does not exist, please use one of the following categories (popular, now-playing, upcoming, top-rated)`
          );
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log('INSIDE GET NEXT PAGE PARAM');
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 1800000,
    gcTime: 3600000,
  });

  const movies = queryResult.data?.pages.reduce(
    (
      acc: Array<SuperficialMovie>,
      current: PaginatedResponse<SuperficialMovie>
    ) => {
      return [...acc, ...current.results] as Array<SuperficialMovie>;
    },
    []
  );

  return {
    movies,
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    error: queryResult.error,
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    isFetched: queryResult.isFetched,
    fetchNextPage: queryResult.fetchNextPage,
  };
};
