const express = require('express')
const bodyParser = require('body-parser')
const autoMiddleware = require('./middleware/auth')

const server = express()

server.use(bodyParser.json()) // Allows me to have JSON to parse
server.use(autoMiddleware.initialize) // Kick passport off

server.use([
  require('./routes/products'),
  require('./routes/auth')
])

server.listen(7000, (error) => {
  if (error) {
    console.log('Error starting', error)
  } else {
    console.log('Started at http://localhost:7000')
  }
})