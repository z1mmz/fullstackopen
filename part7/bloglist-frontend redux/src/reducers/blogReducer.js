import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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
    const resp = await blogService.createBlog(blog);
    console.log("created blog", resp);
    dispatch(appendBlog(resp));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const resp = await blogService.removeBlog(id);
    dispatch(removeBlog(id));
  };
};
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const resp = await blogService.updateBlog(updatedBlog.id, updatedBlog);
    console.log("like response", resp);
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogSlice.reducer;
