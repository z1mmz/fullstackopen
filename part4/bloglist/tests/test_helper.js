const Blog = require('../models/blog')

const init_blogs = [
    {
        title: 'test',
        author: 'test',
        url: 'www.test.com',
        likes: 100,
      },
      {
        title: 'test2',
        author: 'testo',
        url: 'www.theremustbeabetterwaytodothis.com',
        likes: 1,
      }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    init_blogs, blogsInDb
  }