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

describe("blog posting and removal tests", () => {
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
    test('Likes default to 0', async () =>{
        const blog_payload = {
            title: 'add one',
            author: 'adder',
            url: 'www.testplus1.com',
          }
        const response = await api.post('/api/blogs').send(blog_payload)
        assert.strictEqual(response.body.likes,0)
 
    })
    test('400 if missing title' , async () =>{
        const blog_payload = {
            author: 'adder',
            url: 'www.testplus1.com',
          }
        const response = await api.post('/api/blogs').send(blog_payload)
        assert.strictEqual(response.status,400)
    })
    test('400 if missing url' , async () =>{
        const blog_payload = {
            title: 'add one',
            author: 'adder',
          }
        const response = await api.post('/api/blogs').send(blog_payload)
        assert.strictEqual(response.status,400)
    })
    test('Blog is deleted' , async () =>{
        const blogsBefore = await api.get('/api/blogs')
        const to_delete_id = blogsBefore.body[0].id
        const response = await api.delete(`/api/blogs/${to_delete_id}`)
        assert.strictEqual(response.status,204)
        const blogsAfter = await api.get('/api/blogs')
        assert.strictEqual(blogsAfter.body.length,blogsBefore.body.length - 1)
        blogsAfter.body.forEach(blog => {
            assert.notStrictEqual(blog.id,to_delete_id);
          });
    })
    test('Blog is updated', async () => {
        const blogsBefore = await api.get('/api/blogs')
        const original_blog = blogsBefore.body[0]
        const put_result = await api.put(`/api/blogs/${original_blog.id}`).send({author:"changed"})
        const result = await api.get(`/api/blogs/${original_blog.id}`)
        assert.strictEqual(result.body.author,"changed",)

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