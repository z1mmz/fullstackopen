const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog(request.body)
  blog.user = user.id
  const result = await blog.save()
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(id).populate('user')
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }
  if ( blog.user.id === user.id ){
    await Blog.findByIdAndDelete(id);
    response.status(204).end()
  }else{
    response.status(401).json({
      error:"unauthorized"
    })
  }

})
module.exports = blogsRouter