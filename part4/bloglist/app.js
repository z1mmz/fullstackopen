const express = require('express')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
