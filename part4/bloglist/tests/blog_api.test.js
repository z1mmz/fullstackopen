const assert = require('node:assert')
const { test, after, beforeEach,describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const  helper =require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.init_blogs.map(blog =>Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe("blog fetching", ()=>{
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })
})

describe("blog posting test", () => {
    test('test blog is created', async () =>{
        const blogsBefore = await api.get('/api/blogs')

        const blog_payload = {
            title: 'add one',
            author: 'adder',
            url: 'www.testplus1.com',
            likes: 101,
          }
        const response = await api.post('/api/blogs').send(blog_payload)
        assert.strictEqual(response.status,201)
        const blogsAfter = await api.get('/api/blogs')
        assert.strictEqual(blogsBefore.body.length+1,blogsAfter.body.length)
    })


})

describe("blog field test", () => {
   test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert(blog.id);
      });
  })
})

after(async () => {
  await mongoose.connection.close()
})