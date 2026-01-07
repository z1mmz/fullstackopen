import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/togglable";
import UserList from "./components/userList";
import UserView from "./components/UserView";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import {
  loginUser,
  initializeUserFromStorage,
  logout,
} from "./reducers/userReducer";

import { useSelector } from "react-redux";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes;
    });
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUserFromStorage());
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };
  const handleLogout = async () => {
    dispatch(logout());
  };

  const loginForm = (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogList = (
    <div>
      {" "}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const match = useMatch("/users/:id");

  const selectedUserId = match ? match.params.id : null;

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user ? (
        <div>
          <b>Logged in user: {user.username}</b>{" "}
          <button onClick={() => handleLogout()}>logout</button>
        </div>
      ) : (
        loginForm
      )}
      {user ? (
        <Togglable buttonLabel="Create Blog">
          <BlogForm />
        </Togglable>
      ) : null}

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView id={selectedUserId} />} />
        <Route path="/" element={<div>{blogList}</div>} />
      </Routes>
    </div>
  );
};

export default App;
