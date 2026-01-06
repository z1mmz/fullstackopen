import { createSlice } from "@reduxjs/toolkit";
import login from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUserFromStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("blogsLoggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const jwtPayload = JSON.parse(window.atob(user.token.split(".")[1]));
      if (jwtPayload.exp > Date.now() / 1000) {
        dispatch(setUser(user));
        blogService.setToken(user.token);
      }
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await login.login({ username, password });
    dispatch(setUser(user));
    window.localStorage.setItem("blogsLoggedInUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("blogsLoggedInUser");
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
