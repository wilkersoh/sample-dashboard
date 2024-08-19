import React, { useState } from "react";
import { createUser } from "@/services/user";
import { User } from "@/stores/user/types";
import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "@/providers/user/user-store-provider";
import {
  setCurrentActiveTabAction,
  updateUserStateAction,
} from "@/stores/user/user-store";
import FormWrapper from "../FormWrapper/formWrapper";
import Input from "../Input/input";

export const UserCreationForm = () => {
  const ONLY_DIGIT_REGEX = /^\d*$/;
  const [newFormUser, setNewformUser] = useState<User>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const queryClient = useQueryClient();
  const setUpdateUserState = useUserStore(updateUserStateAction);
  const setCurrentActiveTab = useUserStore(setCurrentActiveTabAction);

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (state: any) => {
        if (state.data) return [...state.data, data];
      });
      setUpdateUserState(data);
      setCurrentActiveTab("View");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewformUser({
      ...newFormUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (ONLY_DIGIT_REGEX.test(value)) {
      const removeLeadingZeros = +value.replace(/^0+/, "");
      setNewformUser({
        ...newFormUser,
        [event.target.name]: removeLeadingZeros,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const randomId = Math.floor(Math.random() * 1000);
    addUserMutation.mutate({
      ...newFormUser,
      id: randomId,
    });
  };

  const renderCreationForm = () => {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
        <FormWrapper className="w-1/2 mt-2 px-2" label="First Name">
          <Input
            name="first_name"
            placeholder="First Name"
            className="text-black"
            value={newFormUser.first_name}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Last Name">
          <Input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="text-black"
            value={newFormUser.last_name}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Salary">
          <Input
            type="text"
            name="salary"
            min={0}
            placeholder="Salary"
            className="text-black"
            value={newFormUser.salary}
            onChange={(event) => handleInputSalaryChange(event)}
          />
        </FormWrapper>
        <FormWrapper className="w-1/2 mt-2 px-2" label="Age">
          <Input
            name="age"
            placeholder="Age"
            className="text-black"
            value={newFormUser.age}
            onChange={(event) => handleInputChange(event)}
          />
        </FormWrapper>
        <button
          type="submit"
          className="block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-8 ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={addUserMutation.isLoading}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <div>
      <h3 className="underline">Create User</h3>
      {renderCreationForm()}
    </div>
  );
};

export default UserCreationForm;
