const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const phoneNumber = process.argv[4]

const url = `mongodb+srv://wolfzimmermann1:${password}@cluster0.tbuvjwc.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
})
const Person = mongoose.model('Person', personSchema)

const savePerson = (name,phoneNumber) => {
  const person = new Person({
    name: name,
    phone_number: phoneNumber,
  })
  person.save().then(result => {
    console.log(result)
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })

}
if(name & phoneNumber){
  savePerson(name,phoneNumber)
}else{
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.phone_number}`)
    })
    mongoose.connection.close()
  })
}