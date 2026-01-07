import { createContext, useReducer } from "react";
import blogService from "./services/blogs";
let notificationTimer;

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "CLEAR_USER":
      return "";
    default:
      return state;
  }
};

const UserContext = createContext();

const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem("blogsLoggedInUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return user;
  }
  return null;
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, "", initUser);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
