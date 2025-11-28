const assert = require('node:assert')
const { test, after, beforeEach,describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const  helper =require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})
    await Promise.all(helper.test_users.map(user => api.post('/api/users').send(user)))

    // Log in both users
    const loginA = await api.post('/api/login').send(helper.test_users[0])
    userAToken = loginA.body.token

    const loginB = await api.post('/api/login').send(helper.test_users[1])
    userBToken = loginB.body.token

    // create blogs under user A
    await Promise.all(
      helper.init_blogs.map(blog =>
        api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${userAToken}`)
      )
    )
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
        console.log(helper.test_users[0])
        const blog_payload = {
            title: 'add one',
            author: 'adder',
            url: 'www.testplus1.com',
            likes: 101,
          }

        const response = await api.post('/api/blogs').send(blog_payload).set('Authorization', `Bearer ${userAToken}`)
        assert.strictEqual(response.status,201)
        const blogsAfter = await api.get('/api/blogs')
        assert.strictEqual(blogsBefore.body.length+1,blogsAfter.body.length)
    })
    test('blog creation fails with 401 if not logged in', async () => {
      const blog_payload = {
        title: 'unauthorized',
        author: 'nobody',
        url: 'www.shouldfail.com',
        likes: 10,
      }
    
      const response = await api.post('/api/blogs').send(blog_payload)
      assert.strictEqual(response.status, 401)
    })
    test('only creator can delete their blog', async () => {
      // Login as user A

    
      const blog_payload = {
        title: 'User A Blog',
        author: 'User A',
        url: 'www.userablog.com',
        likes: 5,
      }
    
      // Create blog as User A
      const blogRes = await api
        .post('/api/blogs')
        .send(blog_payload)
        .set('Authorization', `Bearer ${userAToken}`)
    
      const blogId = blogRes.body.id
    

      // Try deleting User A's blog as User B
      const deleteAttempt = await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${userBToken}`)
    
      assert.strictEqual(deleteAttempt.status, 401)
    
      // Delete as User A
      const deleteActual = await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${userAToken}`)
    
      assert.strictEqual(deleteActual.status, 204)
    
      // Confirm it's deleted
      const blogsAfter = await api.get('/api/blogs')
      const blogIds = blogsAfter.body.map(b => b.id)
      assert(!blogIds.includes(blogId))
    })

    test('Likes default to 0', async () =>{
        const blog_payload = {
            title: 'add one',
            author: 'adder',
            url: 'www.testplus1.com',
          }
        const response = await api.post('/api/blogs').send(blog_payload).set('Authorization', `Bearer ${userAToken}`)
        assert.strictEqual(response.body.likes,0)
 
    })
    test('400 if missing title' , async () =>{
        const blog_payload = {
            author: 'adder',
            url: 'www.testplus1.com',
          }
        const response = await api.post('/api/blogs').send(blog_payload).set('Authorization', `Bearer ${userAToken}`)
        assert.strictEqual(response.status,400)
    })
    test('400 if missing url' , async () =>{
        const blog_payload = {
            title: 'add one',
            author: 'adder',
          }
        const response = await api.post('/api/blogs').send(blog_payload).set('Authorization', `Bearer ${userAToken}`)
        assert.strictEqual(response.status,400)
    })
    test('Blog is deleted' , async () =>{
        const blogsBefore = await api.get('/api/blogs')
        const to_delete_id = blogsBefore.body[0].id
        const response = await api.delete(`/api/blogs/${to_delete_id}`).set('Authorization', `Bearer ${userAToken}`)
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
        const put_result = await api.put(`/api/blogs/${original_blog.id}`).send({author:"changed"}).set('Authorization', `Bearer ${userAToken}`)
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