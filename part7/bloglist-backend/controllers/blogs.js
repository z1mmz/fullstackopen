const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});
blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  response.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  }
  console.log("creating blog for user", user);
  const blog = new Blog(request.body);
  blog.user = user.id;
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  const createdBlog = await Blog.findById(result._id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(createdBlog);
});

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id).populate("user");
  const user = request.user;

  const { title, author, url, likes } = request.body;
  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  }
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  if (blog.user.id === user.id) {
    const result = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, author, url, likes } },
      { new: true }
    );
    response.status(200).json(result);
  } else {
    response.status(401).json({
      error: "unauthorized",
    });
  }
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const blog = await Blog.findById(id).populate("user");
    const user = request.user;
    if (!user) {
      return response
        .status(400)
        .json({ error: "UserId missing or not valid" });
    }
    if (blog.user.id === user.id) {
      await Blog.findByIdAndDelete(id);
      response.status(204).end();
    } else {
      response.status(401).json({
        error: "unauthorized",
      });
    }
  }
);
module.exports = blogsRouter;
