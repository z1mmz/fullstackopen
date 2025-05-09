require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const app = express()
var morgan = require('morgan')
morgan.token('body',function (req,){return JSON.stringify(req.body)})
const cors = require('cors')

app.use(cors())
app.use(morgan('tiny', ':body'))
app.use(express.static('dist'))
app.use(express.json())

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    var today = new Date()
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
        <p>${today}</p>`)
  }).catch(error => next(error))


})

app.get('/api/persons', (request, response,next) => {
  Person.find({}).then(persons => {
    response.json(persons)

  }).catch(error => next(error))
})

app.post('/api/persons', (request, response,next) => {

  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number:body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  const body = request.body

  Person.findById(id).then(person => {
    if(!person){
      return response.status(404).end()
    }
    person.number = body.number
    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  Person.findById(id).then(
    person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).send(`<p>Sorry we didnt find a person with the id ${id}</p>`)
      }
    }
  ).catch( error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  Person.findByIdAndDelete(id).then(
    () => {
      response.status(204).end()
    }
  ).catch( error => next(error)
  )

})


const errorHandler = (error, request, response, next) => {
  console.error(error.name,error.message )

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name ==='ValidationError') {
    return response.status(400).json({ error:error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})