import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <Stack gap={3}>
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <Card.Body>
            <Card.Title>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </Card.Title>
            <Card.Text>By {blog.author}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default BlogList;
