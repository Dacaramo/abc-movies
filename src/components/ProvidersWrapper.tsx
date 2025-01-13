'use client';

import { FC, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/reactQuery';
import { MotionConfig } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalStoreProvider } from './GlobalStoreProvider';

interface Props {
  children: ReactNode;
}

const ProvidersWrapper: FC<Props> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStoreProvider>
        <MotionConfig transition={{ duration: 0.5 }}>{children}</MotionConfig>
      </GlobalStoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ProvidersWrapper;
