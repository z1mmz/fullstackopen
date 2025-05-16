const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true},
  author: { type: String},
  url: { type: String, required: true},
  likes: { type: Number, default: 0 },
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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)