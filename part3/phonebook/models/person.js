const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url).then(
    result => {
        console.log("connected to mongo db")
    }
).catch(
    error => {
        console.log('error connecting to MongoDB:', error.message)
    }
)
const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v){
                return v.replace(/[^0-9]/g,'').length >=8 & /\d{2,3}\-[\d\-]*/g.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
          },
          required: [true, 'User phone number required']

        }
    })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)