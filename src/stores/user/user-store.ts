import { createStore } from "zustand";
import { UserActions, UserState } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserStore = UserState & UserActions;

const defaultInitState: UserState = {
  users: [],
  selectedUser: undefined,
  pageInfo: {},
  currentActiveTab: "view",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUsers: (userList) => {
          const { data: users, ...otherInfo } = userList;
          set(() => ({ users }));
          set({ pageInfo: otherInfo });
        },
        setSelectedUser: (selectedUser) => set({ selectedUser }),
        updateUser: (updatedUser) => {
          set((state) => ({
            users: state.users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            ),
          }));
        },
        updateUserState: (user) =>
          set((state) => ({ users: [...state.users, user] })),
        deleteUserState: (id) => {
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
          set((state) => {
            return {
              selectedUser:
                state?.selectedUser?.id === id ? undefined : state.selectedUser,
            };
          });
        },
        setCurrentActiveTab: (currentActiveTab) => set({ currentActiveTab }),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

// set Actions
export const setUsersAction = (state: UserStore) => state.setUsers;
export const setSelectedUserAction = (state: UserStore) =>
  state.setSelectedUser;
export const updateUserAction = (state: UserStore) => state.updateUser;
export const setCurrentActiveTabAction = (state: UserStore) =>
  state.setCurrentActiveTab;
// apply in fake endpoint for state update
export const updateUserStateAction = (state: UserStore) =>
  state.updateUserState;
export const deleteUserStateAction = (state: UserStore) =>
  state.deleteUserState;

// get Actions
export const getUsersAction = (state: UserStore) => state.users;
export const getSelectedUserAction = (state: UserStore) => state.selectedUser;
export const getCurrentActiveTabAction = (state: UserStore) =>
  state.currentActiveTab;
