import axios from 'axios';
import { PaginatedResponse, QueryStringParams } from './model/Other';
import { SuperficialMovie } from './model/Movie';
import { Actor } from './model/Actor';
import { Video } from './model/Video';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN!}`,
  },
});

export const getMovies = async (
  qsp: QueryStringParams,
  search: string
): Promise<PaginatedResponse<SuperficialMovie>> => {
  const { data } = await axiosClient.get<PaginatedResponse<SuperficialMovie>>(
    `/search/movie`,
    {
      params: {
        ...qsp,
        query: search,
      },
    }
  );
  return data;
};

export const getPopularMovies = async (qsp: QueryStringParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<SuperficialMovie>>(
    `/movie/popular`,
    {
      params: qsp,
    }
  );
  return data;
};

export const getNowPlayingMovies = async (qsp: QueryStringParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<SuperficialMovie>>(
    `/movie/now_playing`,
    {
      params: qsp,
    }
  );
  return data;
};

export const getUpcomingMovies = async (qsp: QueryStringParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<SuperficialMovie>>(
    `/movie/upcoming`,
    {
      params: qsp,
    }
  );
  return data;
};

export const getTopRatedMovies = async (qsp: QueryStringParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<SuperficialMovie>>(
    `/movie/top_rated`,
    {
      params: qsp,
    }
  );
  return data;
};

export const getCastByMovie = async (movieId: number) => {
  const {
    data: { cast },
  } = await axiosClient.get<{
    id: number;
    cast: Array<Actor>;
    crew: Array<unknown>;
  }>(`/movie/${movieId}/credits`);
  return cast;
};

export const getGenresByMovie = async (movieId: number) => {
  const {
    data: { cast },
  } = await axiosClient.get<{
    id: number;
    cast: Array<Actor>;
    crew: Array<unknown>;
  }>(`/movie/${movieId}/credits`);
  return cast;
};

export const getTrailerByMovie = async (movieId: number) => {
  const {
    data: { results },
  } = await axiosClient.get<{
    id: number;
    results: Array<Video>;
  }>(`/movie/${movieId}/videos`);

  const trailerVideo = results.find((video) => {
    return video.type === 'Trailer' && video.site === 'YouTube';
  });

  return trailerVideo ?? null;
};
