import { useState } from "react";
import blogs from "../services/blogs";

import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h1>Create new</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel lassName="mb-3" label="Title:">
            <Form.Control
              type="textarea"
              placeholder=""
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel lassName="mb-3" label="Author:">
            <Form.Control
              type="text"
              placeholder=""
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel lassName="mb-3" label="URL:">
            <Form.Control
              type="text"
              placeholder=""
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit">Post</Button>
      </Form>
    </div>
  );
};

export default BlogForm;
