import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((a) => (a.id !== id ? a : action.payload));
    },
  },
});
export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  console.log("blog to create", blog);
  return async (dispatch) => {
    try {
      const resp = await blogService.createBlog(blog);
      console.log("created blog", resp);
      dispatch(appendBlog(resp));
      dispatch(
        setNotification(
          `A new blog ${resp.title} by ${resp.author} added`,
          "success",
          5
        )
      );
    } catch (error) {
      dispatch(setNotification(`Error creating blog: ${error}`, "error", 5));
      console.error("Error creating blog: ", error);
    }
  };
};

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.commentBlog(blog.id, comment);
      const updatedBlog = { ...blog, comments: resp.comments };
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotification(`Comment posted to ${blog.title}`, "success", 5)
      );
    } catch (error) {
      dispatch(setNotification(`Could not post comment: ${error}`, "error", 5));
    }
  };
};
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.removeBlog(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(
        setNotification(`${blog.title} deleted successfully`, "success", 5)
      );
    } catch (error) {
      console.error(`Failed to delete ${blog.title}: `, error);
      dispatch(setNotification(`Failed to delete ${blog.title}`, "error", 5));
    }
  };
};
export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const resp = await blogService.updateBlog(updatedBlog.id, updatedBlog);
      console.log("like response", resp);
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotification(
          `Blog ${blog.title} by ${blog.author} liked`,
          "success",
          5
        )
      );
    } catch (error) {
      console.error(`Failed to like ${blog.title}: `, error);
      dispatch(setNotification(`Failed to like ${blog.title}`, "error", 5));
    }
  };
};

export default blogSlice.reducer;
