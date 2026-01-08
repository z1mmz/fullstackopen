import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/togglable";
import UserList from "./components/userList";
import UserView from "./components/UserView";
import BlogList from "./components/blogList";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import {
  loginUser,
  initializeUserFromStorage,
  logout,
} from "./reducers/userReducer";

import { useSelector } from "react-redux";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      {user ? (
        <span style={padding}>
          <b>Logged in user: {user.username}</b>{" "}
          <button onClick={() => dispatch(logout())}>logout</button>
        </span>
      ) : null}
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

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

  const userMatch = useMatch("/users/:id");
  const selectedUserId = userMatch ? userMatch.params.id : null;

  const blogMatch = useMatch("/blogs/:id");
  const selectedBlogId = blogMatch ? blogMatch.params.id : null;

  return (
    <div>
      <Menu />
      <Notification />
      <h2>blogs</h2>
      {!user ? loginForm : null}
      {user ? (
        <Togglable buttonLabel="Create Blog">
          <BlogForm />
        </Togglable>
      ) : null}

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView id={selectedUserId} />} />
        <Route path="/blogs/:id" element={<Blog id={selectedBlogId} />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
