'use client';

import { getCastByMovie } from '@/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import Image from 'next/image';

interface Props {
  movieId: number;
}

const MovieCastCard: FC<Props> = ({ movieId }) => {
  const {
    data: castList,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['getCastByMovie', movieId],
    queryFn: async () => {
      return await getCastByMovie(movieId);
    },
    staleTime: 1800000,
    gcTime: 3600000,
  });

  const shortenedCastList = castList?.slice(0, 10);

  const mustShowLoadingSkeleton = isFetching && shortenedCastList === undefined;
  const mustShowCastList =
    isFetched &&
    shortenedCastList !== undefined &&
    shortenedCastList.length > 0;

  return (
    <div className='flex-1 flex flex-col justify-evenly gap-4 rounded-lg bg-base-200 p-4'>
      <h3 className='text-center font-bold text-xl'>Cast</h3>
      {mustShowCastList && (
        <ul className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
          {mustShowCastList &&
            shortenedCastList.map((actor) => {
              return (
                <li
                  key={actor.id}
                  className='flex flex-row gap-2 justify-center items-center'
                >
                  <span>
                    <span className='italic'>{actor.name}</span> as{' '}
                    <span className='font-bold'>{actor.character}</span>
                  </span>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12'>
                      <Image
                        width={50}
                        height={50}
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/w300${actor.profile_path}`}
                        alt={actor.name}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {mustShowLoadingSkeleton && (
        <div className='skeleton h-[452px] min-w-[250px]' />
      )}
    </div>
  );
};

export default MovieCastCard;
