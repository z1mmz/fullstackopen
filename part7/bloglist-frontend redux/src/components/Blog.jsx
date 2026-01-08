import { useState, useEffect } from "react";
import blogs from "../services/blogs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteBlog,
  likeBlog,
  initializeBlogs,
  commentOnBlog,
} from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
const Blog = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user = useSelector(({ user }) => user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const navigate = useNavigate();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleBlogDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      navigate("/");
    }
  };

  const handlePostComment = () => {
    dispatch(commentOnBlog(blog, { body: comment }));
    setComment("");
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const commentsList = (
    <div>
      {blog.comments.map((comment) => (
        <li key={comment._id}>{comment.body}</li>
      ))}
    </div>
  );

  const commentForm = (
    <div>
      <label>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </label>
      <button onClick={() => handlePostComment()}>Add Comment</button>
    </div>
  );

  return (
    <div data-testid={"blog"} style={blogStyle}>
      <h2>
        {blog.title} {blog.author}{" "}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}{" "}
          {user ? (
            <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          ) : (
            ""
          )}
        </div>
        <div>Added by {blog.user.name}</div>
        {user && user.id == blog.user.id ? (
          <button onClick={() => handleBlogDelete()}>remove</button>
        ) : (
          ""
        )}
      </div>
      <h2>Comments</h2>
      {commentForm}
      {commentsList}
    </div>
  );
};
export default Blog;
