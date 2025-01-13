import MovieCastCard from '@/components/MovieCastCard';
import MovieDetailsCard from '@/components/MovieDetailsCard';
import MovieTrailerButton from '@/components/MovieTrailerVideo';
import { DetailedMovie } from '@/model/Movie';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { FC } from 'react';
interface Props {
  params: Promise<{
    movieId: number;
  }>;
}

const getSingleMovie = async (movieId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/movie/${movieId},`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env
          .NEXT_PUBLIC_API_READ_ACCESS_TOKEN!}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const movie: DetailedMovie = await response.json();

  return movie;
};

export const generateMetadata = async (
  { params }: Props,
  parentMetadataPromise: ResolvingMetadata
): Promise<Metadata> => {
  const metadata = (await parentMetadataPromise) as Metadata;
  const { movieId } = await params;
  const movie = await getSingleMovie(movieId);

  return {
    ...metadata,
    title: movie.title,
    description: movie.overview,
    keywords: [
      ...movie.genres.map(({ name }) => {
        return `${name} movies`;
      }),
      movie.title,
      movie.original_title,
    ],
    openGraph: {
      title: `ABCmovies | ${movie.title}`,
      description: movie.overview ?? 'Missing movie description',
      url: '',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_IMAGES_URL!}/w300${
            movie.poster_path
          }`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_IMAGES_URL!}/w300${
            movie.poster_path
          }`,
        },
      ],
    },
  };
};

const MoviePage: FC<Props> = async ({ params }) => {
  const { movieId } = await params;
  const movie = await getSingleMovie(movieId);

  return (
    <>
      <h2
        id='title'
        className='sm:text-5xl text-xl font-bold'
      >
        {movie.title}
      </h2>
      <p className='sm:text-2xl text-sm'>{movie.overview}</p>
      <div className='w-full flex flex-row flex-wrap gap-8 '>
        <Image
          width={500}
          height={500}
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/w500${movie.poster_path}`}
          alt={`${movie.title}🎞️`}
          className='h-fit rounded-lg sm:w-[250px] min-w-[250px] w-full bg-black flex justify-center items-center'
        />
        <div className='sm:w-[300px] w-full flex flex-col gap-8'>
          <MovieDetailsCard movie={movie} />
          <MovieTrailerButton movieId={movieId} />
        </div>
        <MovieCastCard movieId={movieId} />
      </div>
    </>
  );
};

export default MoviePage;
