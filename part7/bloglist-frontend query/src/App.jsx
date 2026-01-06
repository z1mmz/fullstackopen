import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import login from "./services/login";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/togglable";
import NotificationContext from "./notificationContext";

let timer;
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { notificationDispatch } = useContext(NotificationContext);
  const getAllBlogs = async () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogsLoggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const statusMessage = (message, type) => {
    console.log("statusMessage", message, type);
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
      const user = await login.login({ username, password });
      window.localStorage.setItem("blogsLoggedInUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (exception) {
      statusMessage("Wrong username or password", "error");
      console.error(exception);
    }
  };
  const handleLogout = async () => {
    window.localStorage.removeItem("blogsLoggedInUser");
    setUser(null);
  };
  const handleBlogSubmit = async (e) => {
    blogService
      .createBlog(e)
      .then(() =>
        statusMessage(`A new blog ${e.title} by ${e.author} added`, "success")
      )
      .then(() => getAllBlogs())
      .catch((error) => statusMessage(`Error: ${error}`, "error"));
  };
  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .removeBlog(blog.id)
        .then(() =>
          statusMessage(
            `Blog ${blog.title} by ${blog.author} deleted`,
            "success"
          )
        )
        .then(() => {
          getAllBlogs();
        })
        .catch((error) => statusMessage(`Error: ${error}`, "error"));
    }
  };

  const handleBlogLike = async (blog) => {
    console.log("like", blog);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    console.log("like", updatedBlog);

    try {
      const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog);
      console.log(returnedBlog);
      setBlogs((blogs) =>
        blogs
          .map((b) => (b.id === blog.id ? updatedBlog : b))
          .sort((a, b) => b.likes - a.likes)
      );
      statusMessage(`Voted for ${blog.title} by ${blog.author}`, "success");
    } catch (error) {
      statusMessage(`Error: ${error}`, "error");
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
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          handleBlogDelete={handleBlogDelete}
          handleBlogLike={handleBlogLike}
        />
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
          <BlogForm handleBlogSubmit={handleBlogSubmit} />
        </Togglable>
      ) : null}
      {blogList}
    </div>
  );
};

export default App;
