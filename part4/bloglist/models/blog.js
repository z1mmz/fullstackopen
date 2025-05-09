const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})


mongoose.connect(config.MONGODB_URI).then(
    () => {
        console.log('connected to mongo db')
    }
    ).catch(
    error => {
        console.log('error connecting to MongoDB:', error.message)
    }
    )

module.exports = mongoose.model('Blog', blogSchema)