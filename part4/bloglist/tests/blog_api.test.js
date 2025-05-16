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