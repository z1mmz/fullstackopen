import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector(({ users }) => {
    return [...users].sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    });
  });
  useState(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  console.log("users", users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
