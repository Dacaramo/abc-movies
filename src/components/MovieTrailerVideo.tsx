'use client';

import { getTrailerByMovie } from '@/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  movieId: number;
}

const MovieTrailerButton: FC<Props> = ({ movieId }) => {
  const {
    data: video,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['getTrailerByMovie', movieId],
    queryFn: async () => {
      return await getTrailerByMovie(movieId);
    },
    staleTime: 1800000,
    gcTime: 3600000,
  });
  const router = useRouter();

  const handleClickOnButton = () => {
    if (!video) return;

    router.push(`https://www.youtube.com/embed/${video.key}`);
  };

  const mustShowLoadingSkeleton = isFetching && video === undefined;
  const mustShowVideo = isFetched && video !== undefined && video !== null;
  const mustShowUnavailableSign = isFetched && video === null;

  return (
    <button
      type='button'
      className='btn btn-md btn-primary bg-primary'
      onClick={handleClickOnButton}
      disabled={mustShowLoadingSkeleton || mustShowUnavailableSign}
    >
      {mustShowVideo && <span>See trailer on YouTube</span>}
      {mustShowLoadingSkeleton && <span>Loading</span>}
      {mustShowUnavailableSign && <span>Trailer unavailable</span>}
    </button>
  );
};

export default MovieTrailerButton;
