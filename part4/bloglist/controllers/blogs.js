const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})
blogsRouter.get('/:id', async(request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findOne()
  blog.user = user.id

  const result = await blog.save()
  console.log(result)
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.put('/:id', async(request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: request.body },
    { new: true }
  )
  response.status(200).json(result)
})

blogsRouter.delete('/:id', async(request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})
module.exports = blogsRouter