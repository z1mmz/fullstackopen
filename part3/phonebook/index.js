require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const app = express()
var morgan = require('morgan')
morgan.token("body",function (req, res){return JSON.stringify(req.body)})

app.use(morgan("tiny", ":body"))
app.use(express.static('dist'))
app.use(express.json())

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  return String(Math.floor(Math.random() * 99999999999999999))
}

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
      var today = new Date();
      response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${today}</p>`)
    }).catch(error =>{
      response.status(400).send(`<p>Error: ${error}</p>`)
    })
    
 
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
      
    })
  })

  app.post('/api/persons', (request, response) => {

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

    // Person.find({name:body.name}).then(
    //   person =>{
    //     if(person.length > 0){
    //       return response.status(400).json({ 
    //         error: `${body.name} is already in phonebook. Name must be unique`
    //       })
    //     }
    //   }
    // ).catch(
    //   error =>{
    //     console.log(error)
    //   }
    // )

    const person = new Person({
      name: body.name,
      number:body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = Person.findById(id).then(
      person =>{
        response.json(person)
      }
    ).catch( error => {
      response.status(404).send(`<p>Sorry we didnt find a person with the id ${id}</p>`)
    }
    )
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id != id)
    response.status(204).end()
  })
  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })