import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import login from "./services/login";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/togglable";

import { useBlogs } from "./hooks/useBlogs";
import { useLogin } from "./hooks/useLogin";

import UserContext from "./userContext";
import NotificationContext from "./notificationContext";

let timer;
const App = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { blogs, createBlog } = useBlogs();
  const { login, logout } = useLogin();

  const { notificationDispatch } = useContext(NotificationContext);

  const statusMessage = (message, type) => {
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: { message, type },
    });
    timer = setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login({ username, password });
      setUsername("");
      setPassword("");
    } catch (exception) {
      statusMessage("Wrong username or password", "error");
      console.error(exception);
    }
  };

  //console.log('delete', blog)

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
          <button onClick={() => logout()}>logout</button>
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
