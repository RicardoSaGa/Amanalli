// userService.js
import { apiClient } from "./apiClient";

export const getUsers = () => apiClient("/users");

export const getUserById = (id) => apiClient(`/users/${id}`);

/*export const createUser = (data) =>
  apiClient(
    "/users",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    true
  ); */ // <-- true activa el uso del JWT

export const createUser = (data) =>
  apiClient("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
