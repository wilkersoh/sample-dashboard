import { createUserStore } from "@/stores/user/user-store";
import { type ReactNode } from "react";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export interface UserStoreProviderProps {
  children: ReactNode;
}
