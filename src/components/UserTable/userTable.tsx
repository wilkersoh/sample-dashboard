import React from "react";
import { useUserStore } from "@/providers/user/user-store-provider";
import {
  deleteUserStateAction,
  getUsersAction,
  setCurrentActiveTabAction,
  setSelectedUserAction,
  setUsersAction,
} from "@/stores/user/user-store";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User, UserList } from "@/stores/user/types";
import { StringHelper } from "@/utils/string-helper";
import { deleteUser } from "@/services/user";

const FAKE_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
  "https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
  "https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
  "https://plus.unsplash.com/premium_photo-1682095643806-79da986ccf8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
];

export const UserTable = () => {
  const queryClient = useQueryClient();

  const setUsers = useUserStore(setUsersAction);
  const setSelectedUser = useUserStore(setSelectedUserAction);
  const setCurrentActiveTab = useUserStore(setCurrentActiveTabAction);
  const setDeleteUserState = useUserStore(deleteUserStateAction);

  const users = useUserStore(getUsersAction);

  const { isLoading } = useQuery<UserList>({
    queryKey: ["users"],
    onSuccess(data) {
      setUsers(data);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (state: any) => {
        return {
          ...state,
          data: state.data.filter((user: User) => user.id !== data.id),
        };
      });
    },
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setCurrentActiveTab("Edit");
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
    setDeleteUserState(id);
  };

  const renderTable = () => {
    return (
      <table className="min-w-full leading-normal mt-5">
        <thead>
          <tr className="text-left">
            <th className="px-4 pr-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="pr-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Salary
            </th>
            <th className="pr-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Age
            </th>
            <th className="pr-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const { id, last_name, first_name, salary, age, avatar } = user;
            return (
              <tr key={id}>
                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={avatar || FAKE_AVATARS[index]}
                        alt=""
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <span className="text-gray-900 whitespace-no-wrap">
                        {StringHelper.truncate(
                          last_name + " " + first_name,
                          25
                        )}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                  {salary}
                </td>
                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                  {age}
                </td>
                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="hover:text-blue-800 visited:text-purple-600"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="hover:text-blue-800 visited:text-purple-600"
                    >
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      <h3 className="underline">User List</h3>
      {renderTable()}
    </div>
  );
};
