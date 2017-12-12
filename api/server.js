const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const autoMiddleware = require('./middleware/auth')

const server = express()

// Middleware plugins
server.use(bodyParser.json()) // Allows me to have JSON to parse
server.use(cors()) // Allows access from other origins, i.e. our react front-end
server.use(autoMiddleware.initialize) // Kick passport off

// Routes
server.use([
  require('./routes/products'),
  require('./routes/auth'),
  require('./routes/wishlist'),
  require('./routes/categories')
])

// Error handler
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

server.listen(7000, (error) => {
  if (error) {
    console.log('Error starting', error)
  } else {
    console.log('Started at http://localhost:7000')
  }
})