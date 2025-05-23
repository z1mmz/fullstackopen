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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    init_blogs, blogsInDb,usersInDb
}