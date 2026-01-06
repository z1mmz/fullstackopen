import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisbile] = useState(false);
  const { createBlog } = useBlogs();
  const handleSubmit = async (e) => {
    e.preventDefault();
    createBlog({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default BlogForm;
