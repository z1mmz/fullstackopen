const bcrypt = require('bcrypt')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('testpassword', 10)
        const user = new User({ username: 'testerman', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testing',
            name: 'test testerson',
            password: 'password123',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})
describe('password tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })
    
    test('password less than 3 characters long not accepted', async () =>{
        const newUser = {
            username:'only2chars',
            name:'shortpasswordson',
            password:'xx'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const result = await User.find({username:"only2chars"}).exec();
        assert.strictEqual(result.length,0)
    })

    test('password  3 characters long accepted', async () =>{
        const newUser = {
            username:'3chars',
            name:'perfect',
            password:'xyz'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        const result = await User.find({username:"3chars"}).exec();
        assert.strictEqual(result.length,1)
    })

    test('password more than 3 characters long accepted', async () =>{
        const newUser = {
            username:'wow',
            name:'longpassi',
            password:'abdcefghiasl;dkfjlk;asdfjlk;asdjlk;asdfljkafsdjlk;asfdkjblbkjdvbdkljhdsflghljsdfgh'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        const result = await User.find({username:"wow"}).exec();
        assert.strictEqual(result.length,1)
    })
})

after(async () => {
    await mongoose.connection.close()
})