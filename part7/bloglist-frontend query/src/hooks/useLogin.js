import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import loginService from "../services/login";
import blogService from "../services/blogs";
import UserContext from "../userContext";
import { useContext } from "react";

export const useLogin = () => {
  const { userDispatch } = useContext(UserContext);
  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      return loginService.login(credentials);
    },
    onSuccess: (loggedInUser) => {
      console.log("login onSuccess", loggedInUser);
      window.localStorage.setItem(
        "blogsLoggedInUser",
        JSON.stringify(loggedInUser)
      );
      userDispatch({ type: "SET_USER", payload: loggedInUser });
      blogService.setToken(loggedInUser.token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      window.localStorage.removeItem("blogsLoggedInUser");
      userDispatch({ type: "CLEAR_USER" });
    },
  });
  return {
    login: (credentials) => loginMutation.mutate(credentials),
    logout: logoutMutation.mutate,
  };
};
