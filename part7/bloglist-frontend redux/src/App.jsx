import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
} from "./reducers/blogReducer";

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
  const blogs = useSelector((state) => {
    console.log("state blog", state);
    const sortedBlogs = state.blogs.slice().sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUserFromStorage());
  }, []);

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
        <Blog key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  );

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
      {blogList}
    </div>
  );
};

export default App;
