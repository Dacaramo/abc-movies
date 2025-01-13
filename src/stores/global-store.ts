import { createStore } from 'zustand/vanilla';
import { DetailedMovie, SuperficialMovie } from '@/model/Movie';

export const getInitialGlobalStoreState = (): GlobalStoreState => {
  return {
    favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
  };
};

type GlobalStoreState = {
  favorites: Array<SuperficialMovie | DetailedMovie>;
};

type GlobalStoreActions = {
  addFavorite: (movie: SuperficialMovie | DetailedMovie) => void;
  removeFavorite: (movieId: number) => void;
};

export type GlobalStore = GlobalStoreState & GlobalStoreActions;

export const createGlobalStore = (initialState: GlobalStoreState) => {
  return createStore<GlobalStore>()((set) => {
    return {
      ...initialState,
      addFavorite: (movie: SuperficialMovie | DetailedMovie) => {
        return set((state) => {
          const newFavorites = [...state.favorites, movie];
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
          return {
            favorites: newFavorites,
          };
        });
      },
      removeFavorite: (movieId: number) => {
        return set((state) => {
          const newFavorites = state.favorites.filter(({ id }) => {
            return id !== movieId;
          });
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
          return {
            favorites: newFavorites,
          };
        });
      },
    };
  });
};
