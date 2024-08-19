"use client";

import { UserStore, createUserStore } from "@/stores/user/user-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { UserStoreApi, UserStoreProviderProps } from "./types";

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within CounterStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
