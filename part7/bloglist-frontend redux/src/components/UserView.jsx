import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Col } from "react-bootstrap";

const UserView = ({ id }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers());
    }
  }, [dispatch, users.length]);

  if (!user) {
    return null;
  }
  const blogList = (
    <div>
      {user.blogs.map((blog) => (
        <div>
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <Col xs={5}></Col>
      <h2>Username: {user.username}</h2>
      <h3>Added Blogs</h3>
      <ul>{blogList}</ul>
    </div>
  );
};

export default UserView;
