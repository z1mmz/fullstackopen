import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useEffect } from "react";

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
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added Blogs</h3>
      <ul>{blogList}</ul>
    </div>
  );
};

export default UserView;
