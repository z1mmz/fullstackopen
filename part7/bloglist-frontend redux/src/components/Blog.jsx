import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteBlog,
  likeBlog,
  initializeBlogs,
  commentOnBlog,
} from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
const Blog = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user = useSelector(({ user }) => user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const navigate = useNavigate();

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
    <Stack gap={3}>
      {blog.comments.map((comment) => (
        <div key={comment._id}>{comment.body}</div>
      ))}
    </Stack>
  );

  const commentForm = (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button
        onClick={() => handlePostComment()}
        class="btn btn-outline-secondary btn-sm"
        as="input"
        type="submit"
        value="Submit"
      />
    </InputGroup>
  );

  return (
    <div data-testid={"blog"}>
      <Row>
        <h2>
          {blog.title} {blog.author}{" "}
        </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}{" "}
            {user ? (
              <Button onClick={() => dispatch(likeBlog(blog))}>like</Button>
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
      </Row>
      <Row>
        <h2>Comments</h2>
        <Col xs={10}>{commentForm}</Col>
        {commentsList}
      </Row>
    </div>
  );
};
export default Blog;
