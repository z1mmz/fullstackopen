import { useState } from "react";
import blogs from "../services/blogs";
import { useBlogs } from "../hooks/useBlogs";

const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const { deleteBlog, likeBlog } = useBlogs();
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
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
          {user ? <button onClick={() => likeBlog(blog)}>like</button> : ""}
        </div>
        <div>{blog.user.name}</div>
        {user && user.id == blog.user.id ? (
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Blog;
