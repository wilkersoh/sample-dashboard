import { User } from "@/stores/user/types";

export const createUser = async (newUser: User) => {
  const response = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    return {
      status: false,
    };
  }
  return {
    status: response.ok,
    id,
  };
};
