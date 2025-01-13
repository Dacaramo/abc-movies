import { useGlobalStore } from '@/components/GlobalStoreProvider';
import { useMemo } from 'react';

const useIsAlreadyInFavorites = (movieId: number) => {
  const { favorites } = useGlobalStore((state) => {
    return state;
  });

  const isAlreadyInFavorites = useMemo(() => {
    return favorites.some(({ id }) => {
      return movieId === id;
    });
  }, [favorites, movieId]);

  return isAlreadyInFavorites;
};

export default useIsAlreadyInFavorites;
