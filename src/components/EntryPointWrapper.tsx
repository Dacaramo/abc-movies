'use client';

import { FC, ReactNode, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/reactQuery';
import { MotionConfig } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalStore } from './GlobalStoreProvider';

interface Props {
  children: ReactNode;
}

const EntryPointWrapper: FC<Props> = ({ children }) => {
  const queryClient = getQueryClient();

  const { favorites, setFavorites } = useGlobalStore((state) => state);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFavorites(
        JSON.parse(window.localStorage.getItem('favorites') ?? '[]')
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig transition={{ duration: 0.5 }}>{children}</MotionConfig>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default EntryPointWrapper;
