import { useState } from "react";
import blogs from "../services/blogs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleBlogDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const showWhenVisible = { display: detailsVisible ? "" : "none" };
  return (
    <div data-testid={"blog"} style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => toggleVisibility()}>
          {!detailsVisible ? "view" : "close"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          {user ? (
            <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          ) : (
            ""
          )}
        </div>
        <div>{blog.user.name}</div>
        {user && user.id == blog.user.id ? (
          <button onClick={() => handleBlogDelete()}>remove</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Blog;
