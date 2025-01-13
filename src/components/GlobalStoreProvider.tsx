'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  createGlobalStore,
  getInitialGlobalStoreState,
  GlobalStore,
} from '@/stores/global-store';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined
);

export type GlobalStoreProviderProps = {
  children: ReactNode;
};

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createGlobalStore(getInitialGlobalStoreState());
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(
      `useGlobalStore must be used within the GlobalStoreProvider`
    );
  }

  return useStore(globalStoreContext, selector);
};
