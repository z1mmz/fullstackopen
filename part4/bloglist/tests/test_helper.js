const Blog = require('../models/blog')
const User = require('../models/user')

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
const test_users = [
    {
        username: "test1",
        name: "test1",
        password:"test1"
    },
    {
        username: "test2",
        name: "test2",
        password:"test2"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getTokens = async () => {


}
module.exports = {
    init_blogs,test_users,blogsInDb,usersInDb
}