export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  age?: number | undefined;
  salary?: number | undefined;
}

export interface UserList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export type UserState = {
  users: User[];
  selectedUser?: User;
  pageInfo: Partial<Omit<UserList, "data">>;
  currentActiveTab: string;
};

export type UserActions = {
  setUsers: (users: UserList) => void;
  setSelectedUser: (user: User) => void;
  updateUser: (user: User) => void;
  updateUserState: (user: User) => void;
  deleteUserState: (id: number) => void;
  setCurrentActiveTab: (tab: string) => void;
};
