import React, { useState } from "react";
import FormWrapper from "../FormWrapper/formWrapper";
import Input from "../Input/input";
import { useUserStore } from "@/providers/user/user-store-provider";
import {
  getSelectedUserAction,
  setCurrentActiveTabAction,
  updateUserAction,
} from "@/stores/user/user-store";
import { User } from "@/stores/user/types";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "@/services/user";

export const EditUserForm = () => {
  const queryClient = useQueryClient();
  const user = useUserStore(getSelectedUserAction) as User;
  const [editFormUser, setEditFormUser] = useState<User>(user);
  const setUpdateUser = useUserStore(updateUserAction);
  const setCurrentActiveTab = useUserStore(setCurrentActiveTabAction);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (state: any) => ({
        ...state,
        data: state.data.map((u: User) => (u.id === data.id ? data : u)),
      }));
      setCurrentActiveTab("View");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormUser({
      ...editFormUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserMutation.mutate(editFormUser);
    setUpdateUser(editFormUser);
    setCurrentActiveTab("View");
  };

  if (!editFormUser) return <div>loading...</div>;

  const renderEditForm = () => {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
        <FormWrapper className="w-1/2 mt-2 px-2" label="First Name">
          <Input
            name="first_name"
            placeholder="First Name"
            className="text-black"
            value={editFormUser.first_name}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Last Name">
          <Input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="text-black"
            value={editFormUser.last_name}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Salary">
          <Input
            type="number"
            name="salary"
            min={0}
            placeholder="Salary"
            className="text-black"
            value={editFormUser.salary}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Age">
          <Input
            name="age"
            placeholder="Age"
            className="text-black"
            value={editFormUser.age}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <button
          type="submit"
          className="block bg-blue-500 text-white font-bold py-2 px-8 rounded-lg mt-8 ml-auto"
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <div>
      <h3 className="underline">Edit User</h3>
      {renderEditForm()}
    </div>
  );
};
