const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
blogsRouter.get('/:id', async(request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
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